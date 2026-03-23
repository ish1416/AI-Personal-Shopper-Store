'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, LayoutDashboard, MessageSquare, ShoppingBag, Package, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/ai-stylist', label: 'AI Stylist', icon: MessageSquare },
  { href: '/dashboard/cart', label: 'Cart', icon: ShoppingBag },
  { href: '/dashboard/orders', label: 'Orders', icon: Package },
  { href: '/dashboard/profile', label: 'Style Profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { fetchCart, itemCount } = useCartStore();

  useEffect(() => {
    if (!user) { router.push('/auth/login'); return; }
    fetchCart();
  }, [user, router, fetchCart]);

  if (!user) return null;

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-ink-soft border-r border-ink-muted fixed h-full z-40">
        <div className="p-6 border-b border-ink-muted">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-ink" />
            </div>
            <span className="font-bold text-xl text-cream">ARIA</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-acid text-ink' : 'text-cream/60 hover:text-cream hover:bg-ink-muted'}`}>
                <item.icon size={18} />
                {item.label}
                {item.href === '/dashboard/cart' && itemCount() > 0 && (
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-ink/20 text-ink' : 'bg-acid text-ink'}`}>
                    {itemCount()}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ink-muted">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-violet rounded-full flex items-center justify-center text-sm font-bold text-cream">
              {user.fullName[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-cream truncate">{user.fullName}</p>
              <p className="text-xs text-cream/40 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-cream/40 hover:text-coral hover:bg-ink-muted w-full transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 bg-ink-soft border-b border-ink-muted sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-acid rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-ink" />
            </div>
            <span className="font-bold text-lg text-cream">ARIA</span>
          </Link>
          <div className="flex gap-1">
            {navItems.slice(1, 4).map((item) => (
              <Link key={item.href} href={item.href}
                className={`p-2 rounded-lg ${pathname.startsWith(item.href) ? 'text-acid' : 'text-cream/50'}`}>
                <item.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
