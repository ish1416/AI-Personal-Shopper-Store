'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import api from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [form, setForm] = useState({ street: '', city: '', state: '', country: '', zipCode: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const total = cart?.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/orders/checkout', { shippingAddress: form });
      await clearCart();
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/orders'), 2500);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
        <CheckCircle size={64} className="text-acid mx-auto mb-6" />
      </motion.div>
      <h2 className="text-3xl font-bold text-cream mb-2">Order Placed!</h2>
      <p className="text-cream/50">Redirecting to your orders...</p>
    </div>
  );

  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-cream mb-8">Checkout</h1>

      {error && <div className="bg-coral/10 border border-coral/30 text-coral text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-semibold text-cream">Shipping Address</h2>
        {[
          { key: 'street', label: 'Street Address', placeholder: '123 Main St' },
          { key: 'city', label: 'City', placeholder: 'New York' },
          { key: 'state', label: 'State', placeholder: 'NY' },
          { key: 'country', label: 'Country', placeholder: 'United States' },
          { key: 'zipCode', label: 'ZIP Code', placeholder: '10001' },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm text-cream/60 mb-1.5 block">{field.label}</label>
            <input className="input" placeholder={field.placeholder} required
              value={form[field.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
          </div>
        ))}

        <div className="card p-5 mt-6">
          <div className="flex justify-between font-bold text-cream text-lg">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? 'Placing Order...' : <><span>Place Order</span><ArrowRight size={16} /></>}
        </button>
      </form>
    </div>
  );
}
