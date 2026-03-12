import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import TRACKS, { TAGS } from '../data/tracks';
import MODULES from '../data/modules';
import CICD_MODULES from '../data/cicdModules';

const MODULE_MAP = { git: MODULES, cicd: CICD_MODULES };

export default function Home() {
  const { stats, getTrackStats } = useProgress();

  // Collect all unique tags across tracks
  const allTags = [...new Set(TRACKS.flatMap((t) => t.tags))];

  return (
    <div className="animate-fade-in">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="text-center pt-10 pb-12 relative">
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-accent-green/[0.03] blur-3xl" />
          <div className="w-[400px] h-[400px] rounded-full bg-accent-blue/[0.03] blur-3xl -ml-40 mt-20" />
        </div>

        <div className="relative">
          <div className="text-5xl mb-5">🚀</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-4 text-balance">
            <span className="text-text-primary">Devenez </span>
            <span className="gradient-text">DevOps</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Plateforme interactive d'apprentissage. Exercices pratiques, scénarios métier
            et projets concrets pour maîtriser le développement et le déploiement.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {allTags.map((tagId) => {
              const tag = TAGS[tagId];
              if (!tag) return null;
              return (
                <span key={tagId} className="text-xs px-3 py-1 rounded-full font-mono font-bold border"
                  style={{ color: tag.color, borderColor: tag.color + '33', background: tag.color + '08' }}>
                  {tag.icon} {tag.label}
                </span>
              );
            })}
            {/* Future tags shown grayed out */}
            {['mlops', 'llmops', 'ia', 'fullstack'].filter((t) => !allTags.includes(t)).map((tagId) => {
              const tag = TAGS[tagId];
              if (!tag) return null;
              return (
                <span key={tagId} className="text-xs px-3 py-1 rounded-full font-mono border border-surface-3 text-text-muted/40 bg-surface-2/50">
                  {tag.icon} {tag.label} <span className="text-[9px] ml-1">bientôt</span>
                </span>
              );
            })}
          </div>

          {/* Global progress */}
          {stats.totalCompleted > 0 && (
            <div className="inline-block">
              <div className="card px-5 py-3 flex items-center gap-4">
                <span className="text-sm text-text-muted">
                  ✅ {stats.totalCompleted}/{stats.totalExercises} exercices
                </span>
                <div className="w-28 h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-700"
                    style={{ width: `${stats.percentage}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Track Cards ───────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {TRACKS.map((track, idx) => {
          const ts = getTrackStats(track.id);
          const modules = MODULE_MAP[track.id] || [];

          return (
            <Link key={track.id} to={track.slug}
              className={`card-interactive p-6 bg-gradient-to-br ${track.gradient} border ${track.borderColor} group animate-slide-up`}
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}>

              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{track.icon}</div>
                <div className="flex items-center gap-2">
                  {track.tags.map((tagId) => {
                    const tag = TAGS[tagId];
                    return (
                      <span key={tagId} className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                        style={{ color: tag.color, borderColor: tag.color + '33' }}>
                        {tag.icon}
                      </span>
                    );
                  })}
                </div>
              </div>

              <h2 className="font-display font-extrabold text-2xl text-text-primary mb-1 tracking-tight">
                {track.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: track.color }}>
                {track.subtitle}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-4">{track.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {track.features.map((f) => (
                  <span key={f} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-text-muted border border-surface-3">
                    {f}
                  </span>
                ))}
              </div>

              {/* Per-track progress */}
              {ts.totalCompleted > 0 && (
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${ts.percentage}%`, background: track.color }} />
                  </div>
                  <span className="text-xs font-mono text-text-muted">{ts.percentage}%</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  {modules.length} modules · {ts.totalExercises} exercices · 1 projet
                </span>
                <span className="text-sm font-display font-bold group-hover:translate-x-1 transition-transform" style={{ color: track.color }}>
                  {ts.totalCompleted > 0 ? 'Continuer →' : 'Commencer →'}
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── What you'll learn ─────────────────────── */}
      <section className="mb-14">
        <h2 className="font-display font-extrabold text-2xl text-text-primary mb-6 tracking-tight text-center">
          Ce que vous allez apprendre
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '💻', label: 'Git CLI', sub: 'init → workflow pro' },
            { icon: '🌿', label: 'Branches', sub: 'merge, rebase, stash' },
            { icon: '🐙', label: 'GitHub Actions', sub: 'workflows YAML' },
            { icon: '🦊', label: 'GitLab CI/CD', sub: 'stages & artifacts' },
            { icon: '🏗️', label: 'Jenkins', sub: 'pipelines Groovy' },
            { icon: '🐳', label: 'Docker builds', sub: 'images & registres' },
            { icon: '🧪', label: 'Tests auto', sub: 'lint, unit, E2E' },
            { icon: '🚀', label: 'Déploiement', sub: 'staging → prod' },
          ].map((item, i) => (
            <div key={item.label} className="card p-4 text-center animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'backwards' }}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-display font-bold text-text-primary text-sm">{item.label}</p>
              <p className="text-[11px] text-text-muted mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── All modules ───────────────────────────── */}
      <section>
        <h2 className="font-display font-extrabold text-xl text-text-primary mb-4 tracking-tight">
          📍 Tous les parcours
        </h2>
        <div className="space-y-6">
          {TRACKS.map((track) => {
            const modules = MODULE_MAP[track.id] || [];
            return (
              <div key={track.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{track.icon}</span>
                  <h3 className="font-display font-bold text-text-primary">{track.title}</h3>
                  <Link to={track.slug} className="ml-auto text-xs font-medium hover:underline" style={{ color: track.color }}>
                    Voir la roadmap →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modules.map((mod) => (
                    <Link key={mod.id} to={`${track.slug}/module/${mod.id}`}
                      className="card-interactive flex items-center gap-3 p-3">
                      <span className="text-xl">{mod.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-display font-semibold text-text-primary truncate">{mod.title}</p>
                        <p className="text-[11px] text-text-muted truncate">{mod.desc}</p>
                      </div>
                      <span className="text-xs text-text-muted shrink-0" style={{ color: mod.colorHex }}>
                        {mod.level}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
