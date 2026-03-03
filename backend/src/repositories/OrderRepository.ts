import { BaseRepository } from './BaseRepository';
import { Order, OrderDocument } from '../models/Order';

export class OrderRepository extends BaseRepository<OrderDocument> {
  constructor() {
    super(Order);
  }

  async findByUserId(userId: string): Promise<OrderDocument[]> {
    return this.model
      .find({ userId })
      .populate('items.productId', 'name images price')
      .sort({ orderedAt: -1 })
      .exec();
  }

  async findByStatus(status: string): Promise<OrderDocument[]> {
    return this.model.find({ status }).populate('userId', 'fullName email').exec();
  }

  async updateStatus(orderId: string, status: string): Promise<OrderDocument | null> {
    return this.model.findByIdAndUpdate(orderId, { status }, { new: true }).exec();
  }
}
