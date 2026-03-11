import { Response, NextFunction, Request } from 'express';
import { OrderService } from '../services/OrderService';
import { AuthRequest } from '../middleware/auth';

export class OrderController {
  private orderService = new OrderService();

  checkout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { shippingAddress } = req.body;
      if (!shippingAddress) throw new Error('Shipping address is required');
      const order = await this.orderService.checkout(req.user!.userId, shippingAddress);
      res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
    } catch (err) {
      next(err);
    }
  };

  getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this.orderService.getUserOrders(req.user!.userId);
      res.json({ success: true, message: 'Orders fetched', data: orders });
    } catch (err) {
      next(err);
    }
  };

  getOrderById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await this.orderService.getOrderById(req.params.id, req.user!.userId);
      res.json({ success: true, message: 'Order fetched', data: order });
    } catch (err) {
      next(err);
    }
  };

  getAllOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json({ success: true, message: 'All orders fetched', data: orders });
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status } = req.body;
      const order = await this.orderService.updateOrderStatus(req.params.id, status);
      res.json({ success: true, message: 'Order status updated', data: order });
    } catch (err) {
      next(err);
    }
  };
}
