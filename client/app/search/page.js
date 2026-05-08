'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Pill, Leaf } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import { DrugCard, SupplementCard } from '../../components/DrugCard';
import { EmptyState, LoadingGrid } from '../../components/WarningAlert';
import { api } from '../../lib/api';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const doSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.search(query);
      setResults(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (q) doSearch(q);
  }, [q, doSearch]);

  const handleSearch = (newQ) => {
    router.push(`/search?q=${encodeURIComponent(newQ)}`);
  };

  const drugs = results?.drugs || [];
  const supplements = results?.supplements || [];

  const tabs = [
    { id: 'all', label: `All (${drugs.length + supplements.length})` },
    { id: 'drugs', label: `Drugs (${drugs.length})`, icon: Pill },
    { id: 'supplements', label: `Supplements (${supplements.length})`, icon: Leaf },
  ];

  const displayDrugs = activeTab !== 'supplements';
  const displaySupplements = activeTab !== 'drugs';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          {q ? `Results for "${q}"` : 'Search Drugs & Supplements'}
        </h1>
        <SearchBar initialValue={q} onSearch={handleSearch} autoFocus={!q} />
      </div>

      {/* Tabs */}
      {results && !loading && (
        <div className="flex items-center gap-1 mb-5 border-b border-[var(--border)]">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 -mb-px
                ${activeTab === tab.id
                  ? 'border-[var(--accent)] text-[var(--accent)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingGrid count={6} />}

      {/* Error */}
      {error && (
        <div className="card p-6 text-center text-[var(--severe)]">
          <p className="font-medium">{error}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Please try again or check your connection.</p>
        </div>
      )}

      {/* No results */}
      {!loading && results && drugs.length === 0 && supplements.length === 0 && (
        <EmptyState
          icon={Search}
          title="No results found"
          description={`We couldn't find anything matching "${q}". Try a different search term.`}
        />
      )}

      {/* Results */}
      {!loading && results && (
        <div className="space-y-6">
          {/* Drugs */}
          {displayDrugs && drugs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Pill size={16} className="text-[var(--accent)]" />
                <h2 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Medications ({drugs.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {drugs.map(drug => <DrugCard key={drug.id} drug={drug} />)}
              </div>
            </div>
          )}

          {/* Supplements */}
          {displaySupplements && supplements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Leaf size={16} className="text-green-600" />
                <h2 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Supplements ({supplements.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplements.map(s => <SupplementCard key={s.id} supplement={s} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial state */}
      {!loading && !results && !error && (
        <EmptyState
          icon={Search}
          title="Search for medications"
          description="Type a drug name, category, or condition in the search bar above."
        />
      )}
    </div>
  );
}
