'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Sparkles, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); router.push('/'); };

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/dashboard/ai-stylist', label: 'AI Stylist' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-md border-b border-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Sparkles size={16} className="text-ink" />
          </div>
          <span className="font-bold text-xl tracking-tight text-cream">ARIA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname.startsWith(link.href) ? 'bg-acid text-ink' : 'text-cream/70 hover:text-cream hover:bg-ink-soft'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard/cart" className="relative p-2 rounded-full hover:bg-ink-soft transition-colors">
                <ShoppingBag size={20} className="text-cream/80" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-acid text-ink text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link href="/dashboard/profile" className="p-2 rounded-full hover:bg-ink-soft transition-colors">
                <User size={20} className="text-cream/80" />
              </Link>
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-ink-soft transition-colors">
                <LogOut size={20} className="text-cream/50 hover:text-coral" />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost text-sm hidden md:block">Sign in</Link>
              <Link href="/auth/register" className="btn-primary text-sm">Get Started</Link>
            </>
          )}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-ink-soft border-t border-ink-muted px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-cream/80 hover:text-cream hover:bg-ink-muted transition-colors">
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-cream/80 hover:text-cream hover:bg-ink-muted transition-colors">
                Sign in
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
