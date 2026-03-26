'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingBag, Leaf, X } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [page, setPage] = useState(1);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchProducts(); }, [filters, page]);

  const fetchCategories = async () => {
    const { data } = await api.get('/products/categories');
    setCategories(data.data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '12' });
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    const { data } = await api.get(`/products?${params}`);
    setProducts(data.data.products);
    setTotal(data.data.total);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return fetchProducts();
    setLoading(true);
    const { data } = await api.get(`/products/search?q=${encodeURIComponent(search)}`);
    setProducts(data.data);
    setTotal(data.data.length);
    setLoading(false);
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) { router.push('/auth/login'); return; }
    await addItem(productId);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1500);
  };

  const clearFilters = () => { setFilters({ category: '', minPrice: '', maxPrice: '' }); setSearch(''); setPage(1); };

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cream mb-2">Shop</h1>
          <p className="text-cream/50">{total} products available</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..." className="input pl-11" />
            </div>
            <button type="submit" className="btn-primary px-5">Search</button>
          </form>

          <div className="flex gap-2 flex-wrap">
            <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="input w-auto text-sm">
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Min $" value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="input w-24 text-sm" />
            <input type="number" placeholder="Max $" value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="input w-24 text-sm" />
            {(filters.category || filters.minPrice || filters.maxPrice || search) && (
              <button onClick={clearFilters} className="btn-ghost flex items-center gap-1 text-sm">
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card aspect-[3/4] shimmer" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cream/40 text-lg">No products found</p>
            <button onClick={clearFilters} className="btn-outline mt-4">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="card group cursor-pointer">
                <Link href={`/shop/${product._id}`}>
                  <div className="aspect-[3/4] bg-ink-muted relative overflow-hidden">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={32} className="text-cream/20" />
                      </div>
                    )}
                    {/* Sustainability badge */}
                    {product.sustainabilityScore >= 7 && (
                      <div className="absolute top-2 left-2 bg-ink/80 backdrop-blur-sm text-acid text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Leaf size={10} /> Eco
                      </div>
                    )}
                    <div className="absolute top-2 right-2 tag">{product.category}</div>
                  </div>
                </Link>
                <div className="p-4">
                  <p className="font-medium text-cream text-sm truncate">{product.name}</p>
                  <p className="text-cream/40 text-xs mt-0.5">{product.brand}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-acid">${product.price}</span>
                    <button onClick={() => handleAddToCart(product._id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${addedId === product._id ? 'bg-acid text-ink scale-110' : 'bg-ink-muted text-cream/60 hover:bg-acid hover:text-ink'}`}>
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div className="flex justify-center gap-2 mt-10">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-outline text-sm disabled:opacity-30">Prev</button>
            <span className="flex items-center px-4 text-cream/50 text-sm">Page {page} of {Math.ceil(total / 12)}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 12)} className="btn-outline text-sm disabled:opacity-30">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
