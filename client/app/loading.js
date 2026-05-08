export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="animate-pulse space-y-6">
        {/* Page title skeleton */}
        <div className="h-8 bg-[var(--border)] rounded-xl w-64" />
        <div className="h-12 bg-[var(--border)] rounded-xl w-full max-w-xl" />

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--border)]" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-[var(--border)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--border)] rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-[var(--border)] rounded" />
                <div className="h-3 bg-[var(--border)] rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
