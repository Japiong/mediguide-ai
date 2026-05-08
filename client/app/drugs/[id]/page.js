'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Pill, AlertTriangle, Zap, Info, Activity, CheckCircle,
  ChevronRight, Loader2, FlaskConical
} from 'lucide-react';
import WarningAlert, { DisclaimerBanner } from '../../../components/WarningAlert';
import { api } from '../../../lib/api';

function Section({ icon: Icon, title, children, variant = 'default' }) {
  const borders = {
    default: 'border-[var(--border)]',
    warning: 'border-[var(--severe)]/30 bg-[var(--severe-light)]',
    info: 'border-[var(--accent)]/20',
  };
  return (
    <div className={`rounded-xl border p-5 ${borders[variant]}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${variant === 'warning' ? 'bg-[var(--severe)]/10' : 'bg-[var(--accent-light)]'}`}>
          <Icon size={14} className={variant === 'warning' ? 'text-[var(--severe)]' : 'text-[var(--accent)]'} />
        </div>
        <h3 className={`font-semibold text-sm uppercase tracking-wide ${variant === 'warning' ? 'text-[var(--severe)]' : 'text-[var(--text-primary)]'}`}
            style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{children}</div>
    </div>
  );
}

export default function DrugDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getDrug(id)
      .then(setDrug)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 flex justify-center">
        <Loader2 size={32} className="animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  if (error || !drug) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-[var(--severe)] font-medium">{error || 'Drug not found'}</p>
        <Link href="/" className="btn-secondary mt-4">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back */}
      <button onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Drug Header */}
      <div className="card p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
            <Pill size={26} className="text-[var(--accent)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {drug.name}
            </h1>
            {drug.category && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20">
                {drug.category}
              </span>
            )}
            {drug.description && (
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{drug.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Warning banner */}
      {drug.warnings && (
        <WarningAlert type="severe" title="Important Warning">
          {drug.warnings}
        </WarningAlert>
      )}

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {drug.uses && (
          <Section icon={CheckCircle} title="Uses & Indications">
            {drug.uses}
          </Section>
        )}
        {drug.dosage && (
          <Section icon={Activity} title="Dosage">
            {drug.dosage}
          </Section>
        )}
        {drug.side_effects && (
          <Section icon={AlertTriangle} title="Side Effects">
            <ul className="space-y-1.5">
              {drug.side_effects.split(',').map((effect, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--moderate)] flex-shrink-0" />
                  {effect.trim()}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {drug.ingredients && (
          <Section icon={FlaskConical} title="Active Ingredients">
            {drug.ingredients}
          </Section>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-5">
        <Link href={`/interactions?preload=${drug.id}&name=${encodeURIComponent(drug.name)}`}
          className="btn-primary"
        >
          <Zap size={15} />
          Check Interactions
        </Link>
        <Link href="/chat" className="btn-secondary">
          Ask AI about this drug →
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-5">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
