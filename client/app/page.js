'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Zap, MessageCircle, Pill, Shield, BookOpen, ChevronRight, Activity } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoriesGrid from '../components/CategoriesGrid';
import { DisclaimerBanner } from '../components/WarningAlert';

const categories = [
  { name: 'Antibiotics', icon: '💊', query: 'antibiotic' },
  { name: 'Pain Relief', icon: '🩹', query: 'analgesic' },
  { name: 'Heart & BP', icon: '❤️', query: 'ACE' },
  { name: 'Antidiabetics', icon: '🩺', query: 'antidiabetic' },
  { name: 'Mental Health', icon: '🧠', query: 'antidepressant' },
  { name: 'Cholesterol', icon: '🫀', query: 'statin' },
];

const features = [
  {
    icon: Search,
    title: 'Drug Database',
    description: 'Search 50+ medications with detailed information on uses, dosage, and side effects.',
    href: '/search',
    color: 'text-[var(--accent)] bg-[var(--accent-light)]',
  },
  {
    icon: Zap,
    title: 'Interaction Checker',
    description: 'Check for drug-drug interactions with severity ratings from mild to severe.',
    href: '/interactions',
    color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950',
  },
  {
    icon: MessageCircle,
    title: 'AI Health Assistant',
    description: 'Ask health questions and get structured, evidence-based information from our AI.',
    href: '/chat',
    color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950',
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-light)] via-[var(--bg-primary)] to-[var(--bg-primary)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/4" />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-light)] border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold mb-6 animate-fade-in">
            <Activity size={13} />
            AI-Powered Health Information
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-4 leading-tight animate-slide-up"
              style={{ fontFamily: 'var(--font-display)' }}>
            Your Smart<br />
            <span className="text-[var(--accent)]">Medical Reference</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8 animate-slide-up">
            Look up drugs, check interactions, and get AI-powered health information — all in one place.
          </p>

          <div className="max-w-xl mx-auto mb-6 animate-slide-up">
            <SearchBar large />
          </div>

          {/* Quick categories */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/search?q=${cat.query}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}>
          Everything you need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <Link key={f.title} href={f.href}
              className="card p-6 group hover:border-[var(--accent)] hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{f.description}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] group-hover:gap-2 transition-all">
                Explore <ChevronRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <CategoriesGrid />
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '50+', label: 'Medications', icon: Pill },
            { value: '10+', label: 'Interactions', icon: Zap },
            { value: '7', label: 'Supplements', icon: BookOpen },
            { value: '24/7', label: 'AI Support', icon: MessageCircle },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
                <Icon size={18} className="text-[var(--accent)]" />
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)]"
                   style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
              <div className="text-xs text-[var(--text-muted)]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <DisclaimerBanner />
      </section>
    </div>
  );
}
