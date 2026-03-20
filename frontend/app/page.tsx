'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Leaf, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

const features = [
  { icon: MessageSquare, title: 'AI Stylist Chat', desc: 'Describe any occasion and ARIA curates the perfect look for you instantly.', color: 'text-acid' },
  { icon: Zap, title: 'Smart Discovery', desc: 'Beyond keywords — AI understands context, trends, and aesthetic compatibility.', color: 'text-violet-light' },
  { icon: Leaf, title: 'Sustainability Score', desc: 'Every product rated for its environmental impact so you shop consciously.', color: 'text-acid' },
  { icon: ShieldCheck, title: 'Style Profile', desc: 'Set your measurements, budget, and aesthetic once. ARIA remembers forever.', color: 'text-violet-light' },
];

const marqueeItems = ['Linen Blazer', 'Silk Slip Dress', 'Wide Leg Trousers', 'Cashmere Scarf', 'Leather Crossbody', 'Floral Midi Skirt', 'Denim Jacket', 'Wrap Maxi Dress'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#C8F135 1px, transparent 1px), linear-gradient(90deg, #C8F135 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-acid/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center gap-6">
            {/* Badge */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 bg-ink-soft border border-acid/30 text-acid text-sm font-medium px-4 py-2 rounded-full">
              <Sparkles size={14} />
              Powered by GPT-4o
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-bold tracking-tight leading-none">
              <span className="text-cream">Your personal</span>
              <br />
              <span className="text-acid">AI stylist</span>
              <br />
              <span className="text-cream/50">is here.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-lg text-cream/60 max-w-xl leading-relaxed">
              Stop scrolling. Start describing. Tell ARIA what you need and get a curated wardrobe in seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/auth/register" className="btn-primary flex items-center gap-2 text-base">
                Start Shopping Free <ArrowRight size={16} />
              </Link>
              <Link href="/shop" className="btn-outline text-base">
                Browse Collection
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 mt-6 text-sm text-cream/40">
              <div className="text-center"><div className="text-2xl font-bold text-cream">500+</div>Products</div>
              <div className="w-px h-8 bg-ink-muted" />
              <div className="text-center"><div className="text-2xl font-bold text-cream">AI</div>Powered</div>
              <div className="w-px h-8 bg-ink-muted" />
              <div className="text-center"><div className="text-2xl font-bold text-cream">100%</div>Personalized</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-cream/20 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-acid rounded-full" />
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="border-y border-ink-muted bg-ink-soft py-4 overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-sm font-medium text-cream/40 flex items-center gap-3">
              <span className="text-acid">✦</span> {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cream mb-4">Not just a store.<br /><span className="text-acid">A shopping experience.</span></h2>
          <p className="text-cream/50 max-w-md mx-auto">ARIA combines AI intelligence with curated fashion to give you a truly personal shopping journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card p-6 hover:border-acid/30 transition-colors duration-300 group">
              <div className={`w-10 h-10 rounded-xl bg-ink-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-semibold text-cream mb-2">{f.title}</h3>
              <p className="text-cream/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Chat Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="card p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-acid/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-acid text-sm font-medium mb-4">
                <Sparkles size={14} /> AI Stylist
              </div>
              <h2 className="text-3xl font-bold text-cream mb-4">Just describe what you need.</h2>
              <p className="text-cream/50 mb-6">Try: <em className="text-cream/70">"I need a semi-formal outfit for a summer wedding in Tuscany"</em></p>
              <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2">
                Chat with ARIA <ArrowRight size={16} />
              </Link>
            </div>
            {/* Mock chat bubble */}
            <div className="flex-1 space-y-3 w-full max-w-sm">
              {[
                { role: 'user', msg: 'I need something elegant for a rooftop dinner' },
                { role: 'ai', msg: 'Perfect! I\'d suggest our Silk Slip Dress ($245) paired with the Leather Crossbody ($320). Very chic for a rooftop setting ✨' },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-acid text-ink font-medium' : 'bg-ink-muted text-cream/80'}`}>
                    {m.msg}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-bold text-cream mb-6">Ready to meet<br /><span className="text-acid">your stylist?</span></h2>
          <p className="text-cream/50 mb-8">Join thousands of shoppers who've ditched the scroll.</p>
          <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            Create Free Account <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-muted py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-cream/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-acid rounded flex items-center justify-center">
              <Sparkles size={12} className="text-ink" />
            </div>
            <span className="font-semibold text-cream/50">ARIA</span>
          </div>
          <p>© 2025 ARIA Personal Shopper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
