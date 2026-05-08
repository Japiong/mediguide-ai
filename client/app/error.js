'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[var(--severe-light)] border border-[var(--severe)]/20 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-[var(--severe)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Something went wrong
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="btn-primary">
            <RefreshCw size={15} /> Try again
          </button>
          <Link href="/" className="btn-secondary">
            <Home size={15} /> Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
