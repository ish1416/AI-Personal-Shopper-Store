'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ShoppingBag, Package, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const quickActions = [
  { href: '/dashboard/ai-stylist', icon: MessageSquare, label: 'Chat with ARIA', desc: 'Get personalized style advice', color: 'bg-acid', textColor: 'text-ink' },
  { href: '/shop', icon: ShoppingBag, label: 'Browse Shop', desc: 'Explore the full collection', color: 'bg-ink-muted', textColor: 'text-cream' },
  { href: '/dashboard/orders', icon: Package, label: 'My Orders', desc: 'Track your purchases', color: 'bg-ink-muted', textColor: 'text-cream' },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { cart } = useCartStore();
  const cartTotal = cart?.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) ?? 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-cream/40 text-sm mb-1">{greeting} 👋</p>
        <h1 className="text-3xl font-bold text-cream">{user?.fullName?.split(' ')[0]}</h1>
        <p className="text-cream/50 mt-1">What are we shopping for today?</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Cart Items', value: cart?.items.length ?? 0 },
          { label: 'Cart Value', value: `$${cartTotal.toFixed(0)}` },
          { label: 'Role', value: user?.role === 'admin' ? 'Admin' : 'Shopper' },
        ].map((stat, i) => (
          <div key={i} className="card p-5">
            <p className="text-2xl font-bold text-cream">{stat.value}</p>
            <p className="text-cream/40 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold text-cream mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href}
              className={`${action.color} rounded-2xl p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200 group`}>
              <action.icon size={24} className={action.textColor} />
              <div>
                <p className={`font-semibold ${action.textColor}`}>{action.label}</p>
                <p className={`text-sm mt-0.5 ${action.textColor === 'text-ink' ? 'text-ink/60' : 'text-cream/50'}`}>{action.desc}</p>
              </div>
              <ArrowRight size={16} className={`${action.textColor} opacity-60 group-hover:translate-x-1 transition-transform`} />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* AI Promo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-8 card p-6 flex items-center gap-4 border-acid/20">
        <div className="w-12 h-12 bg-acid/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles size={24} className="text-acid" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-cream">Try ARIA AI Stylist</p>
          <p className="text-cream/50 text-sm">Describe your occasion and get a curated outfit instantly.</p>
        </div>
        <Link href="/dashboard/ai-stylist" className="btn-primary text-sm flex-shrink-0">
          Chat now
        </Link>
      </motion.div>
    </div>
  );
}
