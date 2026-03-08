import { OrderRepository } from '../repositories/OrderRepository';
import { CartRepository } from '../repositories/CartRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { IAddress } from '../types';
import { Types } from 'mongoose';

export class OrderService {
  private orderRepo = new OrderRepository();
  private cartRepo = new CartRepository();
  private productRepo = new ProductRepository();

  async checkout(userId: string, shippingAddress: IAddress) {
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    // Validate stock for all items
    for (const item of cart.items) {
      const product = await this.productRepo.findById(item.productId.toString());
      if (!product) throw new Error(`Product not found`);
      if (product.stockQuantity < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
    }

    const totalAmount = cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    const order = await this.orderRepo.create({
      userId: new Types.ObjectId(userId),
      items: cart.items,
      totalAmount,
      status: 'pending',
      shippingAddress,
      orderedAt: new Date(),
    });

    // Deduct stock
    for (const item of cart.items) {
      await this.productRepo.updateStock(item.productId.toString(), item.quantity);
    }

    await this.cartRepo.clearCart(userId);
    return order;
  }

  async getUserOrders(userId: string) {
    return this.orderRepo.findByUserId(userId);
  }

  async getOrderById(orderId: string, userId: string) {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.userId.toString() !== userId) throw new Error('Unauthorized');
    return order;
  }

  async getAllOrders() {
    return this.orderRepo.findAll();
  }

  async updateOrderStatus(orderId: string, status: string) {
    const order = await this.orderRepo.updateStatus(orderId, status);
    if (!order) throw new Error('Order not found');
    return order;
  }
}
