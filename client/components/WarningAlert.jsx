import { AlertTriangle, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const configs = {
  severe: {
    icon: AlertTriangle,
    className: 'bg-[var(--severe-light)] text-[var(--severe)] border-[var(--severe)]/30',
    label: 'SEVERE',
  },
  moderate: {
    icon: AlertCircle,
    className: 'bg-[var(--moderate-light)] text-[var(--moderate)] border-[var(--moderate)]/30',
    label: 'MODERATE',
  },
  mild: {
    icon: Info,
    className: 'bg-[var(--mild-light)] text-[var(--mild)] border-[var(--mild)]/30',
    label: 'MILD',
  },
  safe: {
    icon: CheckCircle,
    className: 'bg-[var(--safe-light)] text-[var(--safe)] border-[var(--safe)]/30',
    label: 'SAFE',
  },
  info: {
    icon: Info,
    className: 'bg-[var(--accent-light)] text-[var(--accent)] border-[var(--accent)]/30',
    label: 'INFO',
  },
};

export default function WarningAlert({ type = 'info', title, children, onDismiss }) {
  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-4 flex gap-3 animate-fade-in ${config.className}`}>
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-sm mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-xs opacity-70 mr-1.5">[{config.label}]</span>
            {title}
          </p>
        )}
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export function DisclaimerBanner() {
  return (
    <div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-light)] p-4 flex items-start gap-3 text-sm">
      <Info size={16} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
      <p className="text-[var(--accent)] dark:text-[var(--accent-dark)] leading-relaxed">
        <strong>Disclaimer:</strong> This app provides general information only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider before making any health decisions.
      </p>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-4">
          <Icon size={28} className="text-[var(--text-muted)]" />
        </div>
      )}
      <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

export function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--border)]" />
            <div className="flex-1">
              <div className="h-4 bg-[var(--border)] rounded w-3/4 mb-1.5" />
              <div className="h-3 bg-[var(--border)] rounded w-1/3" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-[var(--border)] rounded" />
            <div className="h-3 bg-[var(--border)] rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
