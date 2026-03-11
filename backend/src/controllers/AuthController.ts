import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) throw new Error('All fields are required');
      if (password.length < 6) throw new Error('Password must be at least 6 characters');

      const result = await this.authService.register(fullName, email, password);
      res.status(201).json({ success: true, message: 'Account created successfully', data: result });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error('Email and password are required');

      const result = await this.authService.login(email, password);
      res.json({ success: true, message: 'Login successful', data: result });
    } catch (err) {
      next(err);
    }
  };
}
