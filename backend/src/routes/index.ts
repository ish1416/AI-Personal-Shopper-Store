import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { ProductController } from '../controllers/ProductController';
import { CartController } from '../controllers/CartController';
import { OrderController } from '../controllers/OrderController';
import { AIStylistController } from '../controllers/AIStylistController';
import { StyleProfileController } from '../controllers/StyleProfileController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const auth = new AuthController();
const product = new ProductController();
const cart = new CartController();
const order = new OrderController();
const ai = new AIStylistController();
const profile = new StyleProfileController();

// Auth
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);

// Products (public)
router.get('/products', product.getAll);
router.get('/products/search', product.search);
router.get('/products/categories', product.getCategories);
router.get('/products/:id', product.getById);

// Products (admin)
router.post('/products', authenticate, requireAdmin, product.create);
router.put('/products/:id', authenticate, requireAdmin, product.update);
router.delete('/products/:id', authenticate, requireAdmin, product.delete);

// Cart (protected)
router.get('/cart', authenticate, cart.getCart);
router.post('/cart/items', authenticate, cart.addItem);
router.put('/cart/items/:productId', authenticate, cart.updateQuantity);
router.delete('/cart/items/:productId', authenticate, cart.removeItem);
router.delete('/cart', authenticate, cart.clearCart);

// Orders (protected)
router.post('/orders/checkout', authenticate, order.checkout);
router.get('/orders', authenticate, order.getUserOrders);
router.get('/orders/:id', authenticate, order.getOrderById);

// Orders (admin)
router.get('/admin/orders', authenticate, requireAdmin, order.getAllOrders);
router.put('/admin/orders/:id/status', authenticate, requireAdmin, order.updateStatus);

// AI Stylist (protected)
router.post('/ai/sessions', authenticate, ai.createSession);
router.get('/ai/sessions', authenticate, ai.getSessions);
router.get('/ai/sessions/:sessionId/messages', authenticate, ai.getMessages);
router.post('/ai/sessions/:sessionId/chat', authenticate, ai.chat);
router.delete('/ai/sessions/:sessionId', authenticate, ai.deleteSession);

// Style Profile (protected)
router.get('/profile/style', authenticate, profile.getProfile);
router.put('/profile/style', authenticate, profile.upsertProfile);

export default router;
