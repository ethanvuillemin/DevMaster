/**
 * Barre de progression animée.
 */
export default function ProgressBar({ value, max, colorFrom = 'from-accent-green', colorTo = 'to-accent-blue', className = '' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorFrom} ${colorTo} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-text-muted shrink-0">{pct}%</span>
    </div>
  );
}
