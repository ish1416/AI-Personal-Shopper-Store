import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { AuthPayload } from '../types';

export class AuthService {
  private userRepo = new UserRepository();

  async register(fullName: string, email: string, password: string) {
    const exists = await this.userRepo.emailExists(email);
    if (exists) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.userRepo.create({ fullName, email, passwordHash, role: 'customer' });

    const token = this.generateToken({ userId: user._id.toString(), email: user.email, role: user.role });
    return { user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = this.generateToken({ userId: user._id.toString(), email: user.email, role: user.role });
    return { user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }, token };
  }

  private generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions);
  }

  verifyToken(token: string): AuthPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
  }
}
