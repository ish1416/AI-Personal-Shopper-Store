'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(form.fullName, form.email, form.password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-ink-soft items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#C8F135 1px, transparent 1px), linear-gradient(90deg, #C8F135 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-violet/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 bg-acid rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={28} className="text-ink" />
          </div>
          <h2 className="text-4xl font-bold text-cream mb-4">Meet ARIA.</h2>
          <p className="text-cream/50 text-lg">Your AI-powered personal stylist, available 24/7.</p>
          <div className="mt-8 space-y-3 text-left">
            {['Personalized recommendations', 'AI chat stylist', 'Sustainability scores', 'Virtual wardrobe'].map((f) => (
              <div key={f} className="flex items-center gap-3 text-cream/60 text-sm">
                <div className="w-5 h-5 bg-acid/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-acid rounded-full" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-ink" />
            </div>
            <span className="font-bold text-xl text-cream">ARIA</span>
          </div>

          <h1 className="text-3xl font-bold text-cream mb-2">Create account</h1>
          <p className="text-cream/50 mb-8">Already have one? <Link href="/auth/login" className="text-acid hover:underline">Sign in</Link></p>

          {error && (
            <div className="bg-coral/10 border border-coral/30 text-coral text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-cream/60 mb-1.5 block">Full Name</label>
              <input type="text" className="input" placeholder="Alex Johnson"
                value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm text-cream/60 mb-1.5 block">Email</label>
              <input type="email" className="input" placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm text-cream/60 mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className="input pr-12" placeholder="Min. 6 characters"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/70">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Creating account...' : <><span>Create Account</span><ArrowRight size={16} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
