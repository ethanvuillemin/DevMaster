import { useState, useMemo } from 'react';
import GIT_CHEATSHEET_SECTIONS from '../data/cheatsheet';
import DOCKER_CHEATSHEET_SECTIONS from '../data/dockerCheatsheet';
import ML_METRICS_CHEATSHEET from '../data/mlMetricsCheatsheet';

// Configuration des cheatsheets disponibles
const CHEATSHEETS = [
  {
    id: 'git',
    title: 'Git Commands',
    icon: '🌿',
    description: 'Toutes les commandes Git essentielles',
    downloadUrl: 'https://education.github.com/git-cheat-sheet-education.pdf',
    downloadLabel: 'PDF officiel GitHub'
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: '🐳',
    description: 'Commandes Docker, Compose et Dockerfile essentiels',
    downloadUrl: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf',
    downloadLabel: 'PDF officiel Docker'
  },
  {
    id: 'ml-metrics',
    title: 'ML Metrics',
    icon: '🤖',
    description: 'Métriques essentielles pour le Machine Learning',
    downloadUrl: null,
    downloadLabel: null
  }
];

// ═══════════════════════════════════════════════════════════════
// Composant Git Cheatsheet
// ═══════════════════════════════════════════════════════════════
function GitCheatsheet({ search }) {
  const filtered = useMemo(() => {
    if (!search.trim()) return GIT_CHEATSHEET_SECTIONS;
    const q = search.toLowerCase();
    return GIT_CHEATSHEET_SECTIONS.map((section) => ({
      ...section,
      commands: section.commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q)
      ),
    })).filter((s) => s.commands.length > 0);
  }, [search]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-lg">
          Aucune commande ne correspond à « {search} »
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((section) => (
          <div key={section.title} className="card p-5 animate-slide-up">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2" style={{ color: section.colorHex }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: section.colorHex }} />
              {section.title}
            </h3>
            <div className="space-y-0">
              {section.commands.map((c) => (
                <div key={c.cmd} className="flex items-baseline justify-between gap-3 py-2 border-b border-surface-3/30 last:border-0">
                  <code className="text-[13px] text-text-primary font-mono shrink-0 whitespace-nowrap">
                    {c.cmd}
                  </code>
                  <span className="text-xs text-text-muted text-right">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Extra links */}
      <div className="mt-10 card p-6">
        <h3 className="font-display font-bold text-text-primary mb-3">📚 Aller plus loin</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Pro Git Book (gratuit)', url: 'https://git-scm.com/book/fr/v2' },
            { label: 'Learn Git Branching (interactif)', url: 'https://learngitbranching.js.org/?locale=fr_FR' },
            { label: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/fr/git/tutorials' },
            { label: 'GitHub Skills', url: 'https://skills.github.com/' },
          ].map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
              <span>↗</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// Composant ML Metrics Cheatsheet
// ═══════════════════════════════════════════════════════════════
function MLMetricsCheatsheet({ search }) {
  const [expandedMetric, setExpandedMetric] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => [
    { id: 'all', label: 'Toutes', icon: '📊' },
    ...ML_METRICS_CHEATSHEET.sections.map(s => ({
      id: s.category,
      label: s.title.replace(/^[^\s]+\s/, ''),
      icon: s.title.split(' ')[0]
    }))
  ], []);

  const filteredSections = useMemo(() => {
    let sections = ML_METRICS_CHEATSHEET.sections;
    
    if (selectedCategory !== 'all') {
      sections = sections.filter(s => s.category === selectedCategory);
    }
    
    if (!search.trim()) return sections;
    
    const q = search.toLowerCase();
    return sections.map(section => ({
      ...section,
      metrics: section.metrics.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.interpretation.toLowerCase().includes(q) ||
        m.useCases.some(u => u.toLowerCase().includes(q))
      )
    })).filter(s => s.metrics.length > 0);
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-accent-blue text-white'
                : 'bg-surface-2 text-text-muted hover:text-text-primary hover:bg-surface-3'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Confusion Matrix Reminder */}
      {selectedCategory === 'all' && !search && (
        <div className="card p-5 bg-gradient-to-br from-surface-1 to-surface-2 border-accent-purple/20">
          <h3 className="font-display font-bold text-text-primary mb-4 flex items-center gap-2">
            📋 Rappel : Matrice de Confusion
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-md text-sm">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2 text-accent-green font-medium">Prédit +</th>
                  <th className="p-2 text-accent-red font-medium">Prédit −</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-medium text-accent-green">Réel +</td>
                  <td className="p-2 bg-accent-green/10 rounded text-center">
                    <span className="font-bold text-accent-green">TP</span>
                    <span className="text-text-muted text-xs block">Vrai Positif</span>
                  </td>
                  <td className="p-2 bg-accent-red/10 rounded text-center">
                    <span className="font-bold text-accent-orange">FN</span>
                    <span className="text-text-muted text-xs block">Faux Négatif</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium text-accent-red">Réel −</td>
                  <td className="p-2 bg-accent-orange/10 rounded text-center">
                    <span className="font-bold text-accent-orange">FP</span>
                    <span className="text-text-muted text-xs block">Faux Positif</span>
                  </td>
                  <td className="p-2 bg-accent-green/10 rounded text-center">
                    <span className="font-bold text-accent-green">TN</span>
                    <span className="text-text-muted text-xs block">Vrai Négatif</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-accent-green font-bold">TP:</span> <span className="text-text-muted">Bien prédit positif</span></div>
            <div><span className="text-accent-green font-bold">TN:</span> <span className="text-text-muted">Bien prédit négatif</span></div>
            <div><span className="text-accent-orange font-bold">FP:</span> <span className="text-text-muted">Fausse alerte (Type I)</span></div>
            <div><span className="text-accent-orange font-bold">FN:</span> <span className="text-text-muted">Cas manqué (Type II)</span></div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      {filteredSections.map(section => (
        <div key={section.category} className="space-y-4">
          <h2 className="font-display font-bold text-xl flex items-center gap-2" style={{ color: section.colorHex }}>
            <div className="w-3 h-3 rounded-full" style={{ background: section.colorHex }} />
            {section.title}
            <span className="text-sm font-normal text-text-muted">— {section.description}</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {section.metrics.map(metric => {
              const isExpanded = expandedMetric === `${section.category}-${metric.name}`;
              const metricKey = `${section.category}-${metric.name}`;

              return (
                <div
                  key={metric.name}
                  className={`card p-5 cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'lg:col-span-2 ring-2 ring-accent-blue/30' : 'hover:border-surface-3'
                  }`}
                  onClick={() => setExpandedMetric(isExpanded ? null : metricKey)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-text-primary flex items-center gap-2">
                        {metric.name}
                        <svg
                          className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">{metric.interpretation}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-text-muted mb-1">Plage</div>
                      <code className="text-xs bg-surface-2 px-2 py-0.5 rounded text-accent-blue">
                        {metric.range.split('—')[0].trim()}
                      </code>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="mt-4 p-3 bg-surface-2 rounded-lg font-mono text-sm text-text-primary overflow-x-auto">
                    {metric.formula}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-5 space-y-5 animate-fade-in" onClick={e => e.stopPropagation()}>
                      {/* Use Cases */}
                      <div>
                        <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                          <span className="text-accent-green">✦</span> Cas d'utilisation
                        </h4>
                        <ul className="space-y-1">
                          {metric.useCases.map((useCase, i) => (
                            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                              <span className="text-accent-blue mt-1">•</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-accent-green/5 rounded-lg border border-accent-green/20">
                          <h4 className="text-sm font-bold text-accent-green mb-2">✓ Avantages</h4>
                          <ul className="space-y-1">
                            {metric.pros.map((pro, i) => (
                              <li key={i} className="text-xs text-text-secondary">{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 bg-accent-red/5 rounded-lg border border-accent-red/20">
                          <h4 className="text-sm font-bold text-accent-red mb-2">✗ Inconvénients</h4>
                          <ul className="space-y-1">
                            {metric.cons.map((con, i) => (
                              <li key={i} className="text-xs text-text-secondary">{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Example */}
                      <div className="p-4 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5 rounded-lg border border-accent-blue/20">
                        <h4 className="text-sm font-bold text-accent-blue mb-2">💡 Exemple concret</h4>
                        <p className="text-sm text-text-secondary">{metric.example}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredSections.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">Aucune métrique ne correspond à « {search} »</p>
        </div>
      )}

      {/* Selection Guide */}
      {selectedCategory === 'all' && !search && (
        <div className="card p-6 bg-gradient-to-br from-surface-1 to-surface-2">
          <h3 className="font-display font-bold text-text-primary mb-4">
            🧭 Guide rapide de sélection
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {ML_METRICS_CHEATSHEET.selectionGuide.scenarios.map((scenario, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-surface-1 rounded-lg">
                <span className="text-accent-purple font-bold">?</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">{scenario.question}</div>
                  <div className="text-xs text-accent-blue mt-0.5">→ {scenario.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Page principale Cheatsheets
// ═══════════════════════════════════════════════════════════════
export default function Cheatsheets() {
  const [activeSheet, setActiveSheet] = useState('git');
  const [search, setSearch] = useState('');

  const currentSheet = CHEATSHEETS.find(s => s.id === activeSheet);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display font-extrabold text-3xl text-text-primary tracking-tight mb-2">
          📋 Cheatsheets
        </h1>
        <p className="text-text-secondary">
          Références rapides et complètes pour booster ta productivité.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CHEATSHEETS.map(sheet => (
          <button
            key={sheet.id}
            onClick={() => { setActiveSheet(sheet.id); setSearch(''); }}
            className={`group relative px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
              activeSheet === sheet.id
                ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/20'
                : 'bg-surface-2 text-text-muted hover:text-text-primary hover:bg-surface-3'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{sheet.icon}</span>
              <span>{sheet.title}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Active Sheet Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-text-primary flex items-center gap-2">
            {currentSheet?.icon} {currentSheet?.title}
          </h2>
          <p className="text-sm text-text-muted">{currentSheet?.description}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-48 sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-surface-1 border border-surface-3
                         text-text-primary text-sm font-mono placeholder:text-text-muted/50
                         focus:outline-none focus:border-accent-green/40 transition-colors"
              spellCheck={false}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                ✕
              </button>
            )}
          </div>

          {/* Download */}
          {currentSheet?.downloadUrl && (
            <a
              href={currentSheet.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 text-sm text-text-secondary
                         hover:text-text-primary hover:bg-surface-3 transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {currentSheet.downloadLabel}
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      {activeSheet === 'git' && <GitCheatsheet search={search} />}
      {activeSheet === 'ml-metrics' && <MLMetricsCheatsheet search={search} />}
    </div>
  );
}
