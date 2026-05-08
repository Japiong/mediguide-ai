'use client';
import { useState, useEffect } from 'react';
import { Leaf, Search, AlertTriangle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { DisclaimerBanner } from '../../components/WarningAlert';
import { api } from '../../lib/api';

function SupplementDetail({ supplement }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card overflow-hidden animate-fade-in">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--bg-primary)] transition-colors"
      >
        <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
          <Leaf size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {supplement.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">
            {supplement.benefits?.split('.')[0]}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {supplement.warnings && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-[var(--mild)] bg-[var(--mild-light)] px-2 py-1 rounded-full border border-[var(--mild)]/20">
              <AlertTriangle size={10} />
              Has warnings
            </span>
          )}
          {expanded
            ? <ChevronUp size={16} className="text-[var(--text-muted)]" />
            : <ChevronDown size={16} className="text-[var(--text-muted)]" />
          }
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[var(--border)] px-5 pb-5 pt-4 space-y-4 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supplement.benefits && (
              <div>
                <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-2">
                  Benefits
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{supplement.benefits}</p>
              </div>
            )}
            {supplement.dosage && (
              <div>
                <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-2">
                  Typical Dosage
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{supplement.dosage}</p>
              </div>
            )}
            {supplement.ingredients && (
              <div>
                <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-2">
                  Active Ingredients
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{supplement.ingredients}</p>
              </div>
            )}
            {supplement.warnings && (
              <div>
                <h4 className="text-xs font-semibold text-[var(--mild)] uppercase tracking-wide mb-2 flex items-center gap-1">
                  <AlertTriangle size={11} /> Warnings
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{supplement.warnings}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.getSupplements()
      .then(data => setSupplements(data.supplements))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = supplements.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.benefits?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center">
          <Leaf size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Supplements
          </h1>
          <p className="text-sm text-[var(--text-muted)]">Common supplements, their benefits and warnings</p>
        </div>
      </div>

      {/* Filter */}
      <div className="relative my-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter supplements..."
          className="input pl-9 text-sm"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-[var(--accent)]" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card p-6 text-center text-[var(--severe)]">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Supplements */}
      {!loading && !error && (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-10 text-[var(--text-muted)]">No supplements found.</p>
          ) : (
            filtered.map(s => <SupplementDetail key={s.id} supplement={s} />)
          )}
        </div>
      )}

      <div className="mt-6">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
