import Link from 'next/link';
import { AlertTriangle, ChevronRight, Pill, Leaf } from 'lucide-react';

const categoryColors = {
  'Antibiotic': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'NSAID Anti-inflammatory': 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  'Analgesic/Antipyretic': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  'Statin': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  'default': 'bg-[var(--accent-light)] text-[var(--accent)]'
};

function getCategoryColor(category) {
  return categoryColors[category] || categoryColors['default'];
}

export function DrugCard({ drug }) {
  const hasWarning = drug.warnings && drug.warnings.length > 10;

  return (
    <Link href={`/drugs/${drug.id}`}
      className="card p-5 flex flex-col gap-3 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 group animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
            <Pill size={16} className="text-[var(--accent)]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}>
              {drug.name}
            </h3>
            {drug.category && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(drug.category)}`}>
                {drug.category}
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] flex-shrink-0 transition-colors mt-1" />
      </div>

      {drug.description && (
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {drug.description}
        </p>
      )}

      {hasWarning && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--severe)] bg-[var(--severe-light)] rounded-lg px-2.5 py-1.5 border border-[var(--severe)]/20">
          <AlertTriangle size={12} />
          <span className="truncate">{drug.warnings?.split('.')[0]}</span>
        </div>
      )}
    </Link>
  );
}

export function SupplementCard({ supplement }) {
  return (
    <div className="card p-5 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
          <Leaf size={16} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {supplement.name}
          </h3>
          <span className="text-xs text-[var(--text-muted)]">Supplement</span>
        </div>
      </div>
      {supplement.benefits && (
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{supplement.benefits}</p>
      )}
      {supplement.warnings && (
        <div className="flex items-center gap-1.5 text-xs text-[var(--mild)] bg-[var(--mild-light)] rounded-lg px-2.5 py-1.5 border border-[var(--mild)]/20">
          <AlertTriangle size={12} />
          <span className="line-clamp-1">{supplement.warnings}</span>
        </div>
      )}
    </div>
  );
}
