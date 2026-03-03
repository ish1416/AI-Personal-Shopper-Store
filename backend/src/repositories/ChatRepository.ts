import { BaseRepository } from './BaseRepository';
import { ChatSession, ChatSessionDocument, ChatMessage, ChatMessageDocument } from '../models/Chat';

export class ChatSessionRepository extends BaseRepository<ChatSessionDocument> {
  constructor() {
    super(ChatSession);
  }

  async findByUserId(userId: string): Promise<ChatSessionDocument[]> {
    return this.model.find({ userId }).sort({ startedAt: -1 }).exec();
  }
}

export class ChatMessageRepository extends BaseRepository<ChatMessageDocument> {
  constructor() {
    super(ChatMessage);
  }

  async findBySessionId(sessionId: string): Promise<ChatMessageDocument[]> {
    return this.model.find({ sessionId }).sort({ sentAt: 1 }).exec();
  }

  async getRecentMessages(sessionId: string, limit = 10): Promise<ChatMessageDocument[]> {
    return this.model.find({ sessionId }).sort({ sentAt: -1 }).limit(limit).exec();
  }
}
