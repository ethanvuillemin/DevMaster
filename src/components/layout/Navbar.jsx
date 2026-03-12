import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import ResetModal from '../ui/ResetModal';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/cheatsheet', label: 'Cheatsheet' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { stats, resetProgress } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = useCallback(() => {
    resetProgress();
    setResetOpen(false);
  }, [resetProgress]);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-surface-3/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
            🌿
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            <span className="text-text-primary">Git</span>
            <span className="text-accent-green">Master</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-surface-3 text-text-primary'
                    : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://git-scm.com/doc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Docs ↗
          </a>

          {/* Mini progress + reset */}
          {stats.totalCompleted > 0 && (
            <div className="ml-3 flex items-center gap-2 bg-surface-2 px-3 py-1 rounded-full border border-surface-3">
              <span className="text-xs text-text-muted font-mono">
                {stats.totalCompleted}/{stats.totalExercises}
              </span>
              <div className="w-12 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-700"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <button
                onClick={() => setResetOpen(true)}
                className="ml-1 text-text-muted/50 hover:text-accent-red transition-colors"
                title="Réinitialiser la progression"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2v5h5" />
                  <path d="M3 8.5a6 6 0 1 1 1-3.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-surface-3/30 bg-surface-1/95 backdrop-blur-xl animate-slide-up">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-surface-3 text-text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {stats.totalCompleted > 0 && (
              <button
                onClick={() => { setMobileOpen(false); setResetOpen(true); }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-accent-red/70 hover:text-accent-red text-left transition-colors"
              >
                ↺ Réinitialiser ({stats.totalCompleted}/{stats.totalExercises})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      <ResetModal
        open={resetOpen}
        onConfirm={handleReset}
        onCancel={() => setResetOpen(false)}
      />
    </nav>
  );
}
