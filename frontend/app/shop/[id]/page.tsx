'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Leaf, ArrowLeft, Tag } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => { setProduct(data.data); setLoading(false); });
  }, [id]);

  const handleAdd = async () => {
    if (!user) { router.push('/auth/login'); return; }
    await addItem(product!._id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-ink-soft rounded-2xl shimmer" />
        <div className="space-y-4">
          <div className="h-8 bg-ink-soft rounded-xl shimmer w-3/4" />
          <div className="h-6 bg-ink-soft rounded-xl shimmer w-1/4" />
          <div className="h-24 bg-ink-soft rounded-xl shimmer" />
        </div>
      </div>
    </div>
  );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <Link href="/shop" className="inline-flex items-center gap-2 text-cream/50 hover:text-cream text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-ink-soft rounded-2xl overflow-hidden relative">
            {product.images[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={64} className="text-cream/10" />
              </div>
            )}
            {product.sustainabilityScore >= 7 && (
              <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm text-acid text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Leaf size={14} /> Eco-Friendly
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
            <div>
              <p className="text-cream/40 text-sm mb-1">{product.brand} · {product.category}</p>
              <h1 className="text-3xl font-bold text-cream">{product.name}</h1>
              <p className="text-4xl font-bold text-acid mt-3">${product.price}</p>
            </div>

            <p className="text-cream/60 leading-relaxed">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="tag flex items-center gap-1">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>

            {/* Sustainability */}
            <div className="card p-4 flex items-center gap-3">
              <Leaf size={18} className="text-acid" />
              <div>
                <p className="text-sm font-medium text-cream">Sustainability Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-ink-muted rounded-full overflow-hidden">
                    <div className="h-full bg-acid rounded-full" style={{ width: `${product.sustainabilityScore * 10}%` }} />
                  </div>
                  <span className="text-xs text-acid font-bold">{product.sustainabilityScore}/10</span>
                </div>
              </div>
            </div>

            {/* Stock */}
            <p className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-acid' : 'text-coral'}`}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </p>

            {/* Qty + Add */}
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-ink-muted rounded-xl px-4 py-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-cream/60 hover:text-cream">−</button>
                <span className="w-6 text-center font-medium text-cream">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))} className="text-cream/60 hover:text-cream">+</button>
              </div>
              <button onClick={handleAdd} disabled={product.stockQuantity === 0}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ${added ? 'bg-green-400 text-ink' : 'btn-primary'} disabled:opacity-40`}>
                <ShoppingBag size={18} />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
