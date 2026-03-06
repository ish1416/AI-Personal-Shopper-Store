import { CartRepository } from '../repositories/CartRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { CartDocument } from '../models/Cart';
import { Types } from 'mongoose';

type CartItems = CartDocument['items'];

export class CartService {
  private cartRepo = new CartRepository();
  private productRepo = new ProductRepository();

  async getCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartRepo.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepo.create({ userId: new Types.ObjectId(userId), items: [] });
    }
    return cart;
  }

  async addItem(userId: string, productId: string, quantity: number): Promise<CartDocument> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Product not found');
    if (product.stockQuantity < quantity) throw new Error('Insufficient stock');

    const cart = await this.cartRepo.findByUserId(userId);
    const items: CartItems = cart ? [...cart.items] : [];

    const existingIdx = items.findIndex((i) => i.productId.toString() === productId);
    if (existingIdx >= 0) {
      items[existingIdx].quantity += quantity;
    } else {
      items.push({ productId: new Types.ObjectId(productId) as unknown as Types.ObjectId, quantity, unitPrice: product.price });
    }

    return this.cartRepo.upsertCart(userId, items);
  }

  async removeItem(userId: string, productId: string): Promise<CartDocument> {
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    const items = cart.items.filter((i) => i.productId.toString() !== productId);
    return this.cartRepo.upsertCart(userId, items);
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<CartDocument> {
    if (quantity <= 0) return this.removeItem(userId, productId);
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) throw new Error('Cart not found');
    const items = cart.items.map((i) =>
      i.productId.toString() === productId ? { productId: i.productId, unitPrice: i.unitPrice, quantity } : i
    ) as CartItems;
    return this.cartRepo.upsertCart(userId, items);
  }

  async clearCart(userId: string): Promise<void> {
    return this.cartRepo.clearCart(userId);
  }

  calculateTotal(items: { unitPrice: number; quantity: number }[]): number {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }
}
