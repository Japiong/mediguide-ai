import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-8xl font-bold text-[var(--border)] mb-4"
             style={{ fontFamily: 'var(--font-display)' }}>404</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}>
          Page not found
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/search" className="btn-primary">
            <Search size={15} /> Search drugs
          </Link>
          <Link href="/" className="btn-secondary">
            <Home size={15} /> Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
