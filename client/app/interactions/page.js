'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Zap, Plus, X, Search, Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import WarningAlert, { DisclaimerBanner } from '../../components/WarningAlert';
import { api } from '../../lib/api';

function SeverityBadge({ severity }) {
  const configs = {
    severe: 'severity-severe',
    moderate: 'severity-moderate',
    mild: 'severity-mild',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide ${configs[severity] || ''}`}>
      {severity === 'severe' && <AlertTriangle size={10} />}
      {severity === 'moderate' && <Info size={10} />}
      {severity}
    </span>
  );
}

export default function InteractionsPage() {
  const searchParams = useSearchParams();
  const preloadId = searchParams.get('preload');
  const preloadName = searchParams.get('name');

  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Preload from drug detail page
  useEffect(() => {
    if (preloadId && preloadName) {
      setSelectedDrugs([{ id: Number(preloadId), name: preloadName }]);
    }
  }, [preloadId, preloadName]);

  const searchDrugs = useCallback(async (q) => {
    if (!q.trim() || q.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const data = await api.search(q);
      const filtered = data.drugs.filter(d => !selectedDrugs.find(s => s.id === d.id));
      setSearchResults(filtered.slice(0, 6));
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  }, [selectedDrugs]);

  useEffect(() => {
    const t = setTimeout(() => searchDrugs(searchQ), 300);
    return () => clearTimeout(t);
  }, [searchQ, searchDrugs]);

  const addDrug = (drug) => {
    if (selectedDrugs.find(d => d.id === drug.id)) return;
    if (selectedDrugs.length >= 10) return;
    setSelectedDrugs(prev => [...prev, { id: drug.id, name: drug.name }]);
    setSearchQ('');
    setSearchResults([]);
    setResult(null);
  };

  const removeDrug = (id) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== id));
    setResult(null);
  };

  const checkInteractions = async () => {
    if (selectedDrugs.length < 2) return;
    setChecking(true);
    setError(null);
    try {
      const data = await api.checkInteractions(selectedDrugs.map(d => d.id));
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
            <Zap size={18} className="text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Interaction Checker
          </h1>
        </div>
        <p className="text-sm text-[var(--text-muted)]">Select 2 or more medications to check for interactions.</p>
      </div>

      {/* Drug selector */}
      <div className="card p-5 mb-5">
        <h2 className="font-semibold text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-3">
          Selected Medications ({selectedDrugs.length}/10)
        </h2>

        {/* Selected drugs */}
        {selectedDrugs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedDrugs.map(drug => (
              <div key={drug.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] text-sm font-medium border border-[var(--accent)]/20"
              >
                {drug.name}
                <button onClick={() => removeDrug(drug.id)}
                  className="ml-1 hover:text-[var(--severe)] transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search to add */}
        {selectedDrugs.length < 10 && (
          <div className="relative">
            <div className="relative flex items-center">
              {searching
                ? <Loader2 size={15} className="absolute left-3 animate-spin text-[var(--text-muted)]" />
                : <Search size={15} className="absolute left-3 text-[var(--text-muted)]" />
              }
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Type drug name to add..."
                className="input pl-9 text-sm"
              />
            </div>

            {/* Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 card shadow-lg z-10 overflow-hidden">
                {searchResults.map(drug => (
                  <button key={drug.id} onClick={() => addDrug(drug)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-[var(--bg-primary)] transition-colors border-b border-[var(--border)] last:border-0"
                  >
                    <Plus size={14} className="text-[var(--accent)] flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[var(--text-primary)]">{drug.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{drug.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Check button */}
      <button
        onClick={checkInteractions}
        disabled={selectedDrugs.length < 2 || checking}
        className="btn-primary w-full justify-center mb-5 py-3"
      >
        {checking
          ? <><Loader2 size={16} className="animate-spin" /> Checking...</>
          : <><Zap size={16} /> Check {selectedDrugs.length} Drug{selectedDrugs.length !== 1 ? 's' : ''} for Interactions</>
        }
      </button>

      {/* Error */}
      {error && <WarningAlert type="severe" title="Error">{error}</WarningAlert>}

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Summary */}
          {result.interactions.length === 0 ? (
            <WarningAlert type="safe" title="No interactions found">
              {result.summary}
            </WarningAlert>
          ) : (
            <WarningAlert type={result.hasSevere ? 'severe' : result.hasModerate ? 'moderate' : 'mild'} title="Interactions Detected">
              {result.summary}
            </WarningAlert>
          )}

          {/* Interaction cards */}
          {result.interactions.map((interaction) => (
            <div key={interaction.id} className={`card p-4 border ${
              interaction.severity === 'severe' ? 'border-[var(--severe)]/40 bg-[var(--severe-light)]' :
              interaction.severity === 'moderate' ? 'border-[var(--moderate)]/40 bg-[var(--moderate-light)]' :
              'border-[var(--mild)]/40 bg-[var(--mild-light)]'
            }`}>
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className={`mt-0.5 flex-shrink-0 ${
                  interaction.severity === 'severe' ? 'text-[var(--severe)]' :
                  interaction.severity === 'moderate' ? 'text-[var(--moderate)]' :
                  'text-[var(--mild)]'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                      {interaction.drug1_name} + {interaction.drug2_name}
                    </span>
                    <SeverityBadge severity={interaction.severity} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{interaction.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
