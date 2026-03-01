import { BaseRepository } from './BaseRepository';
import { User, UserDocument } from '../models/User';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.model.findOne({ email: email.toLowerCase() }).exec();
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await this.model.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }
}
