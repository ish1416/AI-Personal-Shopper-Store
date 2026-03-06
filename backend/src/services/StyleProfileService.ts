import { StyleProfileRepository } from '../repositories/StyleProfileRepository';

export class StyleProfileService {
  private profileRepo = new StyleProfileRepository();

  async getProfile(userId: string) {
    return this.profileRepo.findByUserId(userId);
  }

  async upsertProfile(userId: string, data: {
    preferences?: string[];
    sizeDetails?: string;
    aestheticType?: string;
    favoriteColors?: string[];
    budget?: { min: number; max: number };
  }) {
    return this.profileRepo.upsertProfile(userId, data);
  }
}
