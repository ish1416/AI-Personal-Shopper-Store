'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Sparkles } from 'lucide-react';
import { StyleProfile } from '@/types';
import api from '@/lib/api';

const aesthetics = ['Minimalist', 'Bohemian', 'Classic', 'Streetwear', 'Romantic', 'Edgy', 'Preppy', 'Casual'];
const preferenceOptions = ['Sustainable', 'Luxury', 'Vintage', 'Contemporary', 'Athleisure', 'Formal', 'Casual', 'Colorful'];
const colorOptions = ['Black', 'White', 'Beige', 'Navy', 'Olive', 'Burgundy', 'Camel', 'Grey', 'Pastels', 'Bold Colors'];

export default function ProfilePage() {
  const [profile, setProfile] = useState<StyleProfile>({
    preferences: [], sizeDetails: '', aestheticType: '', favoriteColors: [], budget: { min: 0, max: 500 },
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/profile/style').then(({ data }) => { if (data.data) setProfile(data.data); });
  }, []);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const handleSave = async () => {
    setSaving(true);
    await api.put('/profile/style', profile);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-acid/10 rounded-xl flex items-center justify-center">
          <Sparkles size={20} className="text-acid" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-cream">Style Profile</h1>
          <p className="text-cream/50 text-sm">Help ARIA understand your taste</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Aesthetic */}
        <div>
          <label className="text-sm font-medium text-cream mb-3 block">Your Aesthetic</label>
          <div className="flex flex-wrap gap-2">
            {aesthetics.map((a) => (
              <button key={a} onClick={() => setProfile({ ...profile, aestheticType: a })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${profile.aestheticType === a ? 'bg-acid text-ink' : 'bg-ink-muted text-cream/60 hover:text-cream'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="text-sm font-medium text-cream mb-3 block">Shopping Preferences</label>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((p) => (
              <button key={p} onClick={() => setProfile({ ...profile, preferences: toggle(profile.preferences, p) })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${profile.preferences.includes(p) ? 'bg-violet text-cream' : 'bg-ink-muted text-cream/60 hover:text-cream'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="text-sm font-medium text-cream mb-3 block">Favorite Colors</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              <button key={c} onClick={() => setProfile({ ...profile, favoriteColors: toggle(profile.favoriteColors, c) })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${profile.favoriteColors.includes(c) ? 'bg-acid text-ink' : 'bg-ink-muted text-cream/60 hover:text-cream'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="text-sm font-medium text-cream mb-1.5 block">Size Details</label>
          <input className="input" placeholder="e.g. Top: M, Bottom: 28, Shoes: 9" value={profile.sizeDetails}
            onChange={(e) => setProfile({ ...profile, sizeDetails: e.target.value })} />
        </div>

        {/* Budget */}
        <div>
          <label className="text-sm font-medium text-cream mb-3 block">
            Budget Range: <span className="text-acid">${profile.budget.min} – ${profile.budget.max}</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-cream/40 mb-1 block">Min</label>
              <input type="number" className="input" value={profile.budget.min}
                onChange={(e) => setProfile({ ...profile, budget: { ...profile.budget, min: Number(e.target.value) } })} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-cream/40 mb-1 block">Max</label>
              <input type="number" className="input" value={profile.budget.max}
                onChange={(e) => setProfile({ ...profile, budget: { ...profile.budget, max: Number(e.target.value) } })} />
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className={`btn-primary flex items-center gap-2 ${saved ? 'bg-green-400' : ''}`}>
          <Save size={16} />
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
