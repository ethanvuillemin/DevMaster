import { Link } from 'react-router-dom';

const DOC_LINKS = [
  { label: '📖 Pro Git Book', url: 'https://git-scm.com/book/fr/v2' },
  { label: '🐙 GitHub Actions Docs', url: 'https://docs.github.com/fr/actions' },
  { label: '🦊 GitLab CI/CD Docs', url: 'https://docs.gitlab.com/ee/ci/' },
  { label: '🏗️ Jenkins Docs', url: 'https://www.jenkins.io/doc/book/pipeline/' },
  { label: '🌿 Learn Git Branching', url: 'https://learngitbranching.js.org/?locale=fr_FR' },
  { label: '🔷 Atlassian Tutorials', url: 'https://www.atlassian.com/fr/git/tutorials' },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-3/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row: nav + docs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🚀</span>
              <span className="font-display font-extrabold text-base tracking-tight">
                <span className="text-text-primary">Dev</span>
                <span className="gradient-text">Master</span>
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Plateforme open-source d'apprentissage interactif pour le développement et le DevOps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-display font-bold text-text-secondary mb-3 uppercase tracking-wider">
              Parcours
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/git" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                🌿 Maîtriser Git
              </Link>
              <Link to="/cicd" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                🔄 Maîtriser le CI/CD
              </Link>
              <Link to="/cheatsheet" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                📋 Cheatsheet Git
              </Link>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <p className="text-xs font-display font-bold text-text-secondary mb-3 uppercase tracking-wider">
              Documentation
            </p>
            <div className="flex flex-col gap-1.5">
              {DOC_LINKS.slice(0, 4).map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-surface-3/20 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Credits */}
            <div className="text-center sm:text-left">
              <p className="text-xs text-text-muted/80">
                Créé par{' '}
                <a href="https://github.com/ethanvuillemin" target="_blank" rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-green transition-colors font-semibold">
                  Ethan Vuillemin
                </a>
              </p>
              <p className="text-[11px] text-text-muted/50 mt-1">
                Projet open-source à usage éducatif — Contributions bienvenues
              </p>
            </div>

            {/* Repo link */}
            <a
              href="https://github.com/ethanvuillemin/DevMaster"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-3
                         text-sm text-text-muted hover:text-text-primary hover:border-surface-4
                         transition-all group"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>Voir sur GitHub</span>
              <span className="text-text-muted/40">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
