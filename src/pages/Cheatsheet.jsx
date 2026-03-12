import { useState, useMemo } from 'react';
import CHEATSHEET_SECTIONS from '../data/cheatsheet';

export default function Cheatsheet() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return CHEATSHEET_SECTIONS;
    const q = search.toLowerCase();
    return CHEATSHEET_SECTIONS.map((section) => ({
      ...section,
      commands: section.commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q)
      ),
    })).filter((s) => s.commands.length > 0);
  }, [search]);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-text-primary tracking-tight mb-2">
          📋 Cheatsheet Git
        </h1>
        <p className="text-text-secondary mb-6">
          Toutes les commandes essentielles en un coup d'œil.{' '}
          <a
            href="https://education.github.com/git-cheat-sheet-education.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue underline underline-offset-2"
          >
            Télécharger le PDF officiel ↗
          </a>
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une commande..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-1 border border-surface-3
                       text-text-primary text-sm font-mono placeholder:text-text-muted/50
                       focus:outline-none focus:border-accent-green/40 transition-colors"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((section) => (
          <div
            key={section.title}
            className="card p-5 animate-slide-up"
          >
            <h3 className="font-display font-bold mb-3 flex items-center gap-2" style={{ color: section.colorHex }}>
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: section.colorHex }}
              />
              {section.title}
            </h3>

            <div className="space-y-0">
              {section.commands.map((c) => (
                <div
                  key={c.cmd}
                  className="flex items-baseline justify-between gap-3 py-2 border-b border-surface-3/30 last:border-0"
                >
                  <code className="text-[13px] text-text-primary font-mono shrink-0 whitespace-nowrap">
                    {c.cmd}
                  </code>
                  <span className="text-xs text-text-muted text-right">
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">
            Aucune commande ne correspond à « {search} »
          </p>
          <button
            onClick={() => setSearch('')}
            className="mt-3 text-sm text-accent-blue hover:underline"
          >
            Effacer la recherche
          </button>
        </div>
      )}

      {/* Extra links */}
      <div className="mt-10 card p-6">
        <h3 className="font-display font-bold text-text-primary mb-3">
          📚 Aller plus loin
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Pro Git Book (gratuit)', url: 'https://git-scm.com/book/fr/v2' },
            { label: 'Learn Git Branching (interactif)', url: 'https://learngitbranching.js.org/?locale=fr_FR' },
            { label: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/fr/git/tutorials' },
            { label: 'GitHub Skills', url: 'https://skills.github.com/' },
            { label: 'gitignore.io', url: 'https://www.toptal.com/developers/gitignore' },
            { label: 'Conventional Commits', url: 'https://www.conventionalcommits.org/fr/' },
          ].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              <span>↗</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
