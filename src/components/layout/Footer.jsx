import { Link } from 'react-router-dom';
import TrackIcon from '../ui/TrackIcon';
import TRACKS from '../../data/tracks';

/* ── Icons ── */
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="var(--brand)" fillOpacity="0.15"/>
    <path d="M16 5 L27 11.5 V24.5 L16 31 L5 24.5 V11.5 Z"
      stroke="var(--brand)" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <path d="M16 12 L21 15 V21 L16 24 L11 21 V15 Z" fill="var(--brand)" fillOpacity="0.6"/>
    <circle cx="16" cy="16" r="2" fill="var(--brand)"/>
  </svg>
);

const DOC_LINKS = [
  { label: 'Pro Git Book',          url: 'https://git-scm.com/book/fr/v2' },
  { label: 'GitHub Actions Docs',   url: 'https://docs.github.com/fr/actions' },
  { label: 'Docker — Get Started',  url: 'https://docs.docker.com/get-started/' },
  { label: 'scikit-learn Guide',    url: 'https://scikit-learn.org/stable/user_guide.html' },
  { label: 'LangGraph Docs',        url: 'https://langchain-ai.github.io/langgraph/' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t" style={{ borderColor: 'var(--surface-3)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <LogoIcon/>
              <span className="font-display font-bold text-base">
                <span style={{ color: 'var(--text-primary)' }}>Dev</span>
                <span className="gradient-text">Master</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4 max-w-[180px]"
              style={{ color: 'var(--text-muted)' }}>
              Plateforme open-source d'apprentissage interactif pour le DevOps, le ML et l'IA.
            </p>
            <a href="https://github.com/ethanvuillemin/DevMaster"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer group"
              style={{
                background: 'var(--surface-2)',
                borderColor: 'var(--surface-3)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
              <GithubIcon/>
              Voir sur GitHub
              <span className="opacity-0 group-hover:opacity-50 transition-opacity"><ExternalIcon/></span>
            </a>
          </div>

          {/* Parcours */}
          <div>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-secondary)' }}>
              Parcours
            </p>
            <div className="flex flex-col gap-2.5">
              {TRACKS.map(track => (
                <Link key={track.id} to={track.slug}
                  className="flex items-center gap-2 text-sm transition-colors cursor-pointer group"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <span className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <TrackIcon trackId={track.id} size={14} color={track.color}/>
                  </span>
                  <span className="truncate">{track.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Ressources */}
          <div>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-secondary)' }}>
              Ressources
            </p>
            <div className="flex flex-col gap-2.5">
              <Link to="/cheatsheets"
                className="text-sm transition-colors cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                Cheatsheets
              </Link>
              {DOC_LINKS.slice(0, 3).map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer group"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <span>{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-40 transition-opacity"><ExternalIcon/></span>
                </a>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-secondary)' }}>
              Documentation
            </p>
            <div className="flex flex-col gap-2.5">
              {DOC_LINKS.slice(3).map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer group"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <span>{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-40 transition-opacity"><ExternalIcon/></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--surface-3)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Créé par{' '}
            <a href="https://github.com/ethanvuillemin" target="_blank" rel="noopener noreferrer"
              className="font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-bright)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Ethan Vuillemin
            </a>
            {' '}· Projet open-source à usage éducatif
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-soft"/>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
              En ligne
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
