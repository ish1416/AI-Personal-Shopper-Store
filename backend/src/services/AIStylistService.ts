import OpenAI from 'openai';
import { ChatSessionRepository, ChatMessageRepository } from '../repositories/ChatRepository';
import { StyleProfileRepository } from '../repositories/StyleProfileRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { Types } from 'mongoose';

export class AIStylistService {
  private openai: OpenAI;
  private sessionRepo = new ChatSessionRepository();
  private messageRepo = new ChatMessageRepository();
  private profileRepo = new StyleProfileRepository();
  private productRepo = new ProductRepository();

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async createSession(userId: string, title = 'New Chat') {
    return this.sessionRepo.create({ userId: new Types.ObjectId(userId), title, startedAt: new Date() });
  }

  async getUserSessions(userId: string) {
    return this.sessionRepo.findByUserId(userId);
  }

  async getSessionMessages(sessionId: string) {
    return this.messageRepo.findBySessionId(sessionId);
  }

  async chat(userId: string, sessionId: string, userMessage: string) {
    // Save user message
    await this.messageRepo.create({
      sessionId: new Types.ObjectId(sessionId),
      senderType: 'user',
      messageContent: userMessage,
      sentAt: new Date(),
    });

    // Get user style profile for context
    const profile = await this.profileRepo.findByUserId(userId);
    const profileContext = profile
      ? `User style profile: aesthetic=${profile.aestheticType}, preferences=${profile.preferences.join(', ')}, budget=$${profile.budget.min}-$${profile.budget.max}, size=${profile.sizeDetails}`
      : 'No style profile set up yet.';

    // Get recent conversation history
    const history = await this.messageRepo.getRecentMessages(sessionId, 8);
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = history
      .reverse()
      .map((m) => ({ role: m.senderType === 'user' ? 'user' : 'assistant', content: m.messageContent }));

    // Search relevant products
    const products = await this.productRepo.searchProducts(userMessage).catch(() => []);
    const productContext = products.slice(0, 5).map((p) => `- ${p.name} ($${p.price}) [${p.category}]: ${p.description.slice(0, 80)}`).join('\n');

    const systemPrompt = `You are ARIA, an expert AI personal stylist for a premium fashion store. You help customers find perfect outfits and products.

${profileContext}

Available products matching their query:
${productContext || 'No specific products found, suggest general style advice.'}

Be warm, stylish, and concise. Recommend specific products when relevant. Always mention product names and prices.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini', // fallback to gpt-3.5-turbo if quota exceeded
      messages: [{ role: 'system', content: systemPrompt }, ...messages, { role: 'user', content: userMessage }],
      max_tokens: 500,
      temperature: 0.8,
    });

    const aiReply = response.choices[0].message.content || 'I apologize, I could not generate a response.';

    // Save AI response
    await this.messageRepo.create({
      sessionId: new Types.ObjectId(sessionId),
      senderType: 'ai',
      messageContent: aiReply,
      sentAt: new Date(),
    });

    return { reply: aiReply, products: products.slice(0, 4) };
  }

  async deleteSession(sessionId: string, userId: string) {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new Error('Session not found');
    if (session.userId.toString() !== userId) throw new Error('Unauthorized');
    await this.sessionRepo.delete(sessionId);
  }
}
