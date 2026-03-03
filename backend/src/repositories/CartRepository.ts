import { BaseRepository } from './BaseRepository';
import { Cart, CartDocument } from '../models/Cart';

export class CartRepository extends BaseRepository<CartDocument> {
  constructor() {
    super(Cart);
  }

  async findByUserId(userId: string): Promise<CartDocument | null> {
    return this.model
      .findOne({ userId })
      .populate('items.productId', 'name images price stockQuantity')
      .exec();
  }

  async upsertCart(userId: string, items: CartDocument['items']): Promise<CartDocument> {
    return this.model
      .findOneAndUpdate({ userId }, { items }, { new: true, upsert: true })
      .exec() as Promise<CartDocument>;
  }

  async clearCart(userId: string): Promise<void> {
    await this.model.findOneAndUpdate({ userId }, { items: [] }).exec();
  }
}
