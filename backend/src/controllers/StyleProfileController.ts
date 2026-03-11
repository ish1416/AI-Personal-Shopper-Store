import { Response, NextFunction } from 'express';
import { StyleProfileService } from '../services/StyleProfileService';
import { AuthRequest } from '../middleware/auth';

export class StyleProfileController {
  private profileService = new StyleProfileService();

  getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profile = await this.profileService.getProfile(req.user!.userId);
      res.json({ success: true, message: 'Profile fetched', data: profile });
    } catch (err) {
      next(err);
    }
  };

  upsertProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profile = await this.profileService.upsertProfile(req.user!.userId, req.body);
      res.json({ success: true, message: 'Profile saved', data: profile });
    } catch (err) {
      next(err);
    }
  };
}
