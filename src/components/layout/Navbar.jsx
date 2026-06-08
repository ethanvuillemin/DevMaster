import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import ResetModal from '../ui/ResetModal';

const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="relative w-14 h-7 rounded-full border border-surface-3 bg-surface-2 flex items-center px-1 transition-all duration-300 hover:border-surface-4 focus:outline-none focus:ring-2 focus:ring-accent-green/40"
    >
      <span
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{ background: isDark ? 'rgba(89,205,144,0.08)' : 'rgba(63,167,214,0.12)' }}
      />
      <span
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-sm transition-all duration-300"
        style={{
          transform: isDark ? 'translateX(0)' : 'translateX(28px)',
          background: isDark ? '#59CD90' : '#3FA7D6',
          color: '#fff',
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}



export default function Navbar() {
  const { pathname } = useLocation();
  const { stats, resetProgress } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const handleReset = useCallback(() => {
    resetProgress();
    setResetOpen(false);
  }, [resetProgress]);

  const navLinks = [
    { to: '/', label: 'Accueil', active: pathname === '/' },
    { to: '/cheatsheets', label: '📋 Cheatsheets', active: pathname.startsWith('/cheatsheet') },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-surface-3/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🚀</span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            <span className="text-text-primary">Dev</span>
            <span className="gradient-text">Master</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                link.active ? 'bg-surface-3 text-text-primary' : 'text-text-muted hover:text-text-secondary hover:bg-surface-2'
              }`}>
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

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
            {/* Theme toggle mobile */}
            <div className="px-3 py-2.5 flex items-center justify-between">
              <span className="text-sm text-text-muted">Thème</span>
              <ThemeToggle />
            </div>
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
