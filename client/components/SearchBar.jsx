'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, X, Clock, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const POPULAR = ['Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Aspirin', 'Metformin', 'Omeprazole'];

export default function SearchBar({ initialValue = '', autoFocus = false, large = false, onSearch }) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useLocalStorage('mg_search_history', []);
  const router = useRouter();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addToHistory = useCallback((q) => {
    setHistory(prev => [q, ...prev.filter(h => h.toLowerCase() !== q.toLowerCase())].slice(0, 8));
  }, [setHistory]);

  const handleSubmit = useCallback(async (e, overrideValue) => {
    e?.preventDefault();
    const q = (overrideValue ?? value).trim();
    if (!q) return;
    addToHistory(q);
    setFocused(false);
    if (onSearch) {
      setLoading(true);
      try { await onSearch(q); } finally { setLoading(false); }
    } else {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }, [value, onSearch, router, addToHistory]);

  const pick = (q) => { setValue(q); handleSubmit(null, q); };
  const clear = () => { setValue(''); inputRef.current?.focus(); };

  const showDropdown = focused && !value.trim();

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center ${large ? 'h-14' : 'h-11'}`}>
          <Search
            size={large ? 20 : 17}
            className="absolute left-4 text-[var(--text-muted)] pointer-events-none z-10"
          />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search drugs, supplements, conditions..."
            autoFocus={autoFocus}
            autoComplete="off"
            className={`input pl-11 pr-28 h-full ${large ? 'text-base rounded-2xl' : 'text-sm rounded-xl'}`}
          />
          <div className="absolute right-2 flex items-center gap-1">
            {value && (
              <button type="button" onClick={clear}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-all"
              >
                <X size={14} />
              </button>
            )}
            <button type="submit" disabled={!value.trim() || loading} className="btn-primary py-1.5 px-3 text-xs">
              {loading ? <Loader2 size={13} className="animate-spin" /> : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 card shadow-xl z-50 overflow-hidden animate-fade-in">
          {history.length > 0 && (
            <div className="p-2">
              <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium px-2 py-1.5">
                <Clock size={11} /> Recent searches
              </p>
              {history.map(h => (
                <button key={h} onClick={() => pick(h)}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Clock size={12} className="text-[var(--text-muted)] flex-shrink-0" /> {h}
                </button>
              ))}
            </div>
          )}
          <div className={`p-2 ${history.length > 0 ? 'border-t border-[var(--border)]' : ''}`}>
            <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium px-2 py-1.5">
              <TrendingUp size={11} /> Popular searches
            </p>
            <div className="flex flex-wrap gap-1.5 px-2 pb-2">
              {POPULAR.map(p => (
                <button key={p} onClick={() => pick(p)}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
