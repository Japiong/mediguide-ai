'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Pill, Heart, Brain, Shield, FlaskConical,
  Droplets, Zap, Eye, Baby, Wind, Bone, Activity
} from 'lucide-react';

const CATEGORY_ICONS = {
  'Antibiotic': { icon: Shield, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950' },
  'NSAID Anti-inflammatory': { icon: Zap, color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950' },
  'Analgesic/Antipyretic': { icon: Pill, color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950' },
  'Analgesic/Antiplatelet': { icon: Heart, color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950' },
  'Statin': { icon: Heart, color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950' },
  'Statin/Cholesterol-lowering': { icon: Heart, color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950' },
  'Antidiabetic': { icon: Droplets, color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950' },
  'SSRI Antidepressant': { icon: Brain, color: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950' },
  'SNRI Antidepressant': { icon: Brain, color: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950' },
  'ACE Inhibitor': { icon: Heart, color: 'text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-950' },
  'Beta Blocker': { icon: Activity, color: 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950' },
  'Anticoagulant': { icon: Droplets, color: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950' },
  'Corticosteroid': { icon: FlaskConical, color: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950' },
  'Proton Pump Inhibitor': { icon: Pill, color: 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-teal-950' },
  'Anticonvulsant': { icon: Brain, color: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950' },
  'Bronchodilator': { icon: Wind, color: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950' },
  'default': { icon: Pill, color: 'text-[var(--accent)] bg-[var(--accent-light)]' },
};

function getCategoryConfig(name) {
  return CATEGORY_ICONS[name] || CATEGORY_ICONS.default;
}

export default function CategoriesGrid() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/drugs/categories')
      .then(r => r.json())
      .then(d => setCategories(d.categories || []))
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}>
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map(cat => {
          const { icon: Icon, color } = getCategoryConfig(cat);
          return (
            <Link key={cat} href={`/search?q=${encodeURIComponent(cat)}`}
              className="card p-4 flex items-center gap-3 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors line-clamp-2">
                {cat}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
