import { Response, NextFunction } from 'express';
import { AIStylistService } from '../services/AIStylistService';
import { AuthRequest } from '../middleware/auth';

export class AIStylistController {
  private aiService = new AIStylistService();

  createSession = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title } = req.body;
      const session = await this.aiService.createSession(req.user!.userId, title);
      res.status(201).json({ success: true, message: 'Chat session created', data: session });
    } catch (err) {
      next(err);
    }
  };

  getSessions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sessions = await this.aiService.getUserSessions(req.user!.userId);
      res.json({ success: true, message: 'Sessions fetched', data: sessions });
    } catch (err) {
      next(err);
    }
  };

  getMessages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await this.aiService.getSessionMessages(req.params.sessionId);
      res.json({ success: true, message: 'Messages fetched', data: messages });
    } catch (err) {
      next(err);
    }
  };

  chat = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { message } = req.body;
      if (!message) throw new Error('Message is required');
      const result = await this.aiService.chat(req.user!.userId, req.params.sessionId, message);
      res.json({ success: true, message: 'AI response generated', data: result });
    } catch (err) {
      next(err);
    }
  };

  deleteSession = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.aiService.deleteSession(req.params.sessionId, req.user!.userId);
      res.json({ success: true, message: 'Session deleted' });
    } catch (err) {
      next(err);
    }
  };
}
