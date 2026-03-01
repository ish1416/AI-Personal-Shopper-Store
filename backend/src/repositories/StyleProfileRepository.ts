import { BaseRepository } from './BaseRepository';
import { StyleProfile, StyleProfileDocument } from '../models/StyleProfile';

export class StyleProfileRepository extends BaseRepository<StyleProfileDocument> {
  constructor() {
    super(StyleProfile);
  }

  async findByUserId(userId: string): Promise<StyleProfileDocument | null> {
    return this.model.findOne({ userId }).exec();
  }

  async upsertProfile(userId: string, data: Partial<StyleProfileDocument>): Promise<StyleProfileDocument> {
    return this.model
      .findOneAndUpdate({ userId }, { ...data, userId }, { new: true, upsert: true })
      .exec() as Promise<StyleProfileDocument>;
  }
}
