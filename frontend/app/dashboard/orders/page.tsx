'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { Order } from '@/types';
import api from '@/lib/api';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  confirmed: 'text-acid bg-acid/10',
  shipped: 'text-violet-light bg-violet/10',
  delivered: 'text-green-400 bg-green-400/10',
  cancelled: 'text-coral bg-coral/10',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(({ data }) => { setOrders(data.data); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 card shimmer" />)}</div>;

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-cream mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="text-cream/20 mx-auto mb-4" />
          <p className="text-cream/50">No orders yet</p>
          <Link href="/shop" className="btn-primary mt-4 inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card p-5 flex items-center gap-4 hover:border-acid/20 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-ink-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={18} className="text-cream/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cream text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
                <p className="text-cream/40 text-xs mt-0.5">{new Date(order.orderedAt).toLocaleDateString()} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-cream">${order.totalAmount.toFixed(2)}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <ChevronRight size={16} className="text-cream/30" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
