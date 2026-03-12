import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import ResetModal from '../ui/ResetModal';

export default function Navbar() {
  const { pathname } = useLocation();
  const { stats, resetProgress } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = useCallback(() => {
    resetProgress();
    setResetOpen(false);
  }, [resetProgress]);

  const isGit = pathname.startsWith('/git') || pathname.startsWith('/module') || pathname.startsWith('/roadmap') || pathname === '/cheatsheet';
  const isCICD = pathname.startsWith('/cicd');

  const navLinks = [
    { to: '/', label: 'Accueil', active: pathname === '/' },
    { to: '/git', label: '🌿 Git', active: isGit },
    { to: '/cicd', label: '🔄 CI/CD', active: isCICD },
    { to: '/cheatsheet', label: '📋 Cheatsheet', active: pathname === '/cheatsheet' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-surface-3/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🚀</span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            <span className="text-text-primary">Dev</span>
            <span className="gradient-text">Master</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                link.active ? 'bg-surface-3 text-text-primary' : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
              }`}>
              {link.label}
            </Link>
          ))}

          {/* Progress pill */}
          {stats.totalCompleted > 0 && (
            <div className="ml-3 flex items-center gap-2 bg-surface-2 px-3 py-1 rounded-full border border-surface-3">
              <span className="text-xs text-text-muted font-mono">{stats.totalCompleted}/{stats.totalExercises}</span>
              <div className="w-12 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-700"
                  style={{ width: `${stats.percentage}%` }} />
              </div>
              <button onClick={() => setResetOpen(true)}
                className="ml-1 text-text-muted/50 hover:text-accent-red transition-colors"
                title="Réinitialiser">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2v5h5" /><path d="M3 8.5a6 6 0 1 1 1-3.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-text-muted hover:text-text-primary transition-colors" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-surface-3/30 bg-surface-1/95 backdrop-blur-xl animate-slide-up">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.active ? 'bg-surface-3 text-text-primary' : 'text-text-muted hover:text-text-secondary'
                }`}>
                {link.label}
              </Link>
            ))}
            {stats.totalCompleted > 0 && (
              <button onClick={() => { setMobileOpen(false); setResetOpen(true); }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-accent-red/70 hover:text-accent-red text-left transition-colors">
                ↺ Réinitialiser ({stats.totalCompleted}/{stats.totalExercises})
              </button>
            )}
          </div>
        </div>
      )}

      <ResetModal open={resetOpen} onConfirm={handleReset} onCancel={() => setResetOpen(false)} />
    </nav>
  );
}
