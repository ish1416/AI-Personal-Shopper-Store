import { create } from 'zustand';
import { Cart } from '@/types';
import api from '@/lib/api';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cart: null,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    const { data } = await api.get('/cart');
    set({ cart: data.data, isLoading: false });
  },

  addItem: async (productId, quantity = 1) => {
    const { data } = await api.post('/cart/items', { productId, quantity });
    set({ cart: data.data });
  },

  removeItem: async (productId) => {
    const { data } = await api.delete(`/cart/items/${productId}`);
    set({ cart: data.data });
  },

  updateQuantity: async (productId, quantity) => {
    const { data } = await api.put(`/cart/items/${productId}`, { quantity });
    set({ cart: data.data });
  },

  clearCart: async () => {
    await api.delete('/cart');
    set({ cart: null });
  },

  itemCount: () => get().cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
  total: () => get().cart?.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ?? 0,
}));
