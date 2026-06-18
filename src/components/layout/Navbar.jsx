import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import ResetModal from '../ui/ResetModal';

/* ── SVG Icons ── */
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="var(--brand)" fillOpacity="0.15"/>
    <path d="M16 5 L27 11.5 V24.5 L16 31 L5 24.5 V11.5 Z" stroke="var(--brand)" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <path d="M16 12 L21 15 V21 L16 24 L11 21 V15 Z" fill="var(--brand)" fillOpacity="0.6"/>
    <circle cx="16" cy="16" r="2" fill="var(--brand)"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const BookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
    <line x1="12" y1="2"  x2="12" y2="4"/>  <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/>   <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MenuIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {open
      ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
      : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
    }
  </svg>
);

const ResetIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer focus-ring transition-colors"
      style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const { stats, resetProgress } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetOpen, setResetOpen]   = useState(false);
  const handleReset = useCallback(() => { resetProgress(); setResetOpen(false); }, [resetProgress]);

  const links = [
    { to: '/',           label: 'Accueil',      icon: <HomeIcon />, active: pathname === '/' },
    { to: '/cheatsheets', label: 'Cheatsheets', icon: <BookIcon />, active: pathname.startsWith('/cheatsheet') },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 focus-ring rounded-lg group">
            <Logo />
            <span className="font-display font-bold text-[17px] tracking-tight">
              <span style={{ color: 'var(--text-primary)' }}>Dev</span>
              <span className="gradient-text">Master</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer focus-ring ${
                  l.active ? '' : 'btn-ghost'
                }`}
                style={l.active ? {
                  background: 'var(--surface-2)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--surface-3)',
                } : {}}>
                {l.icon}{l.label}
              </Link>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Progress pill */}
            {stats.totalCompleted > 0 && (
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--surface-3)' }}>
                <div className="w-20 progress-track">
                  <div className="progress-fill" style={{ width: `${stats.percentage}%` }}/>
                </div>
                <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
                  {stats.totalCompleted}/{stats.totalExercises}
                </span>
                <button onClick={() => setResetOpen(true)} title="Réinitialiser"
                  className="cursor-pointer transition-colors focus-ring rounded"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F87171'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <ResetIcon />
                </button>
              </div>
            )}
            <ThemeToggle />
          </div>

          {/* ── Mobile toggle ── */}
          <button onClick={() => setMobileOpen(v => !v)} aria-label="Menu"
            className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer focus-ring"
            style={{ color: 'var(--text-muted)', background: 'var(--surface-2)' }}>
            <MenuIcon open={mobileOpen}/>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="sm:hidden border-t animate-slide-up"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderColor: 'var(--surface-3)' }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    l.active ? '' : ''
                  }`}
                  style={l.active
                    ? { background: 'var(--surface-2)', color: 'var(--text-primary)' }
                    : { color: 'var(--text-muted)' }}>
                  {l.icon}{l.label}
                </Link>
              ))}
              <div className="h-px my-1" style={{ background: 'var(--surface-3)' }}/>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Thème</span>
                <ThemeToggle />
              </div>
              {stats.totalCompleted > 0 && (
                <button onClick={() => { setMobileOpen(false); setResetOpen(true); }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer text-left"
                  style={{ color: '#F87171' }}>
                  <ResetIcon />
                  Réinitialiser ({stats.totalCompleted}/{stats.totalExercises})
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <ResetModal open={resetOpen} onConfirm={handleReset} onCancel={() => setResetOpen(false)} />
    </>
  );
}
