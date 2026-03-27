'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import Link from 'next/link';

export default function CartPage() {
  const { cart, fetchCart, removeItem, updateQuantity, isLoading } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => { fetchCart(); }, []);

  const total = cart?.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) ?? 0;

  if (isLoading) return (
    <div className="p-8 space-y-4">
      {[1, 2, 3].map((i) => <div key={i} className="h-24 card shimmer" />)}
    </div>
  );

  if (!cart || cart.items.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-20 h-20 bg-ink-soft rounded-2xl flex items-center justify-center mb-6">
        <ShoppingBag size={36} className="text-cream/20" />
      </div>
      <h2 className="text-2xl font-bold text-cream mb-2">Your cart is empty</h2>
      <p className="text-cream/50 mb-6">Let ARIA help you find something you'll love.</p>
      <Link href="/shop" className="btn-primary">Browse Shop</Link>
    </div>
  );

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-cream mb-8">Your Cart</h1>

      <div className="space-y-3 mb-8">
        <AnimatePresence>
          {cart.items.map((item) => {
            const product = item.productId as unknown as Product;
            const name = typeof product === 'object' ? product.name : 'Product';
            const image = typeof product === 'object' ? product.images?.[0] : null;

            return (
              <motion.div key={String(item.productId)} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="card p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-ink-muted rounded-xl overflow-hidden flex-shrink-0">
                  {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> : <ShoppingBag size={24} className="text-cream/20 m-auto mt-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-cream truncate">{name}</p>
                  <p className="text-acid font-bold text-sm mt-0.5">${item.unitPrice}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(String(item.productId), item.quantity - 1)}
                    className="w-7 h-7 bg-ink-muted rounded-lg flex items-center justify-center hover:bg-acid hover:text-ink transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-cream">{item.quantity}</span>
                  <button onClick={() => updateQuantity(String(item.productId), item.quantity + 1)}
                    className="w-7 h-7 bg-ink-muted rounded-lg flex items-center justify-center hover:bg-acid hover:text-ink transition-colors">
                    <Plus size={12} />
                  </button>
                </div>
                <p className="font-bold text-cream w-16 text-right">${(item.unitPrice * item.quantity).toFixed(0)}</p>
                <button onClick={() => removeItem(String(item.productId))} className="text-cream/30 hover:text-coral transition-colors ml-2">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="card p-6">
        <div className="flex justify-between text-cream/60 text-sm mb-2">
          <span>Subtotal</span><span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-cream/60 text-sm mb-4">
          <span>Shipping</span><span className="text-acid">Free</span>
        </div>
        <div className="flex justify-between font-bold text-cream text-lg border-t border-ink-muted pt-4 mb-6">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
        <Link href="/dashboard/orders/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
          Proceed to Checkout <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
