import { Response, NextFunction } from 'express';
import { CartService } from '../services/CartService';
import { AuthRequest } from '../middleware/auth';

export class CartController {
  private cartService = new CartService();

  getCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cart = await this.cartService.getCart(req.user!.userId);
      res.json({ success: true, message: 'Cart fetched', data: cart });
    } catch (err) {
      next(err);
    }
  };

  addItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId, quantity = 1 } = req.body;
      if (!productId) throw new Error('Product ID is required');
      const cart = await this.cartService.addItem(req.user!.userId, productId, Number(quantity));
      res.json({ success: true, message: 'Item added to cart', data: cart });
    } catch (err) {
      next(err);
    }
  };

  removeItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cart = await this.cartService.removeItem(req.user!.userId, req.params.productId);
      res.json({ success: true, message: 'Item removed', data: cart });
    } catch (err) {
      next(err);
    }
  };

  updateQuantity = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { quantity } = req.body;
      const cart = await this.cartService.updateQuantity(req.user!.userId, req.params.productId, Number(quantity));
      res.json({ success: true, message: 'Cart updated', data: cart });
    } catch (err) {
      next(err);
    }
  };

  clearCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.cartService.clearCart(req.user!.userId);
      res.json({ success: true, message: 'Cart cleared' });
    } catch (err) {
      next(err);
    }
  };
}
