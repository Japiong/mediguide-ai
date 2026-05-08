'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Activity, Search, Zap, MessageCircle, Leaf, Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Activity },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/supplements', label: 'Supplements', icon: Leaf },
  { href: '/interactions', label: 'Interactions', icon: Zap },
  { href: '/chat', label: 'AI Chat', icon: MessageCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    setDark(d => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-[var(--accent)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)' }}>MediGuide</span>
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20">AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                  }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button onClick={toggleDark}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          
          {/* Mobile menu */}
          <button onClick={() => setOpen(o => !o)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-primary)] transition-all"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${active ? 'bg-[var(--accent-light)] text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
