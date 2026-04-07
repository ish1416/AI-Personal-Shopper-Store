'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-8xl font-bold text-acid mb-4">404</p>
        <h1 className="text-2xl font-bold text-cream mb-2">Page not found</h1>
        <p className="text-cream/50 mb-8">Looks like this page got lost in the wardrobe.</p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Sparkles size={16} /> Back to ARIA
        </Link>
      </motion.div>
    </div>
  );
}
