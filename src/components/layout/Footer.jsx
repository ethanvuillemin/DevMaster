const FOOTER_LINKS = [
  { label: '📖 Pro Git Book', url: 'https://git-scm.com/book/fr/v2' },
  { label: '🌿 Learn Git Branching', url: 'https://learngitbranching.js.org/?locale=fr_FR' },
  { label: '🐙 GitHub Actions Docs', url: 'https://docs.github.com/fr/actions' },
  { label: '🦊 GitLab CI/CD Docs', url: 'https://docs.gitlab.com/ee/ci/' },
  { label: '🏗️ Jenkins Docs', url: 'https://www.jenkins.io/doc/book/pipeline/' },
  { label: '🔷 Atlassian Tutorials', url: 'https://www.atlassian.com/fr/git/tutorials' },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-3/30 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-text-muted/60">
          DevMaster — Plateforme d'apprentissage Git & CI/CD interactive
        </p>
      </div>
    </footer>
  );
}
