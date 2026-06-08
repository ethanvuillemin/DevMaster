import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import TRACKS, { TAGS } from '../data/tracks';
import MODULE_REGISTRY from '../data/registry';

const LEVEL_ORDER = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

function MiniRoadmap({ track, modules, isModuleComplete }) {

  const groups = LEVEL_ORDER.reduce((acc, lvl) => {
    const mods = modules.filter((m) => m.level === lvl);
    if (mods.length) acc.push({ level: lvl, count: mods.length, done: mods.filter((m) => isModuleComplete(m.id)).length });
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-1.5 mt-3">
      {groups.map((g, i) => {
        const pct = g.count ? Math.round((g.done / g.count) * 100) : 0;
        return (
          <div key={g.level} className="flex items-center gap-3">
            {/* Connector dot */}
            <div className="flex flex-col items-center gap-0.5 shrink-0 w-4">
              <div className="w-2 h-2 rounded-full border transition-all"
                style={{
                  borderColor: track.color,
                  background: pct === 100 ? track.color : pct > 0 ? track.color + '60' : 'transparent',
                }} />
              {i < groups.length - 1 && (
                <div className="w-px h-3 rounded-full" style={{ background: track.color + '30' }} />
              )}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-[11px] text-text-muted font-mono w-24 shrink-0">{g.level}</span>
              <div className="flex-1 h-1 rounded-full bg-surface-3 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: track.color }} />
              </div>
              <span className="text-[10px] font-mono text-text-muted/60 w-6 text-right">{g.count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { stats, getTrackStats, isModuleComplete } = useProgress();
  const allTags = [...new Set(TRACKS.flatMap((t) => t.tags))];
  const futureTags = ['mlops', 'llmops', 'ia', 'fullstack'].filter((t) => !allTags.includes(t));

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="text-center pt-10 pb-14 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] rounded-full bg-accent-green/[0.04] blur-3xl -mt-10" />
          <div className="w-[500px] h-[400px] rounded-full bg-accent-blue/[0.03] blur-3xl -ml-60 mt-20" />
          <div className="w-[400px] h-[300px] rounded-full bg-accent-purple/[0.03] blur-3xl ml-60 mt-10" />
        </div>

        <div className="relative">
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[1.05] mb-5 text-balance">
            <span className="text-text-primary">Votre </span>
            <span className="gradient-text">roadmap</span>
            <br />
            <span className="text-text-primary">DevOps</span>
          </h1>

          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            Parcours interactifs, exercices métier, projets réels.
            Progressez étape par étape de débutant à expert.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
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
            {futureTags.map((tagId) => {
              const tag = TAGS[tagId];
              if (!tag) return null;
              return (
                <span key={tagId} className="text-xs px-3 py-1 rounded-full font-mono border border-surface-3 text-text-muted/30 bg-surface-2/30">
                  {tag.icon} {tag.label}
                  <span className="text-[9px] ml-1.5 opacity-60">bientôt</span>
                </span>
              );
            })}
          </div>

          {/* Global progress */}
          {stats.totalCompleted > 0 && (
            <div className="inline-flex items-center gap-4 card px-5 py-3 mb-2">
              <div className="text-left">
                <div className="text-xs text-text-muted mb-1">Progression globale</div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-surface-3 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-blue transition-all duration-700"
                      style={{ width: `${stats.percentage}%` }} />
                  </div>
                  <span className="text-xs font-mono text-text-muted font-bold">
                    {stats.totalCompleted}/{stats.totalExercises}
                  </span>
                </div>
              </div>
              <div className="w-px h-8 bg-surface-3" />
              <div className="text-left">
                <div className="text-xs text-text-muted mb-0.5">{TRACKS.length} parcours</div>
                <div className="text-xs font-mono text-text-muted">
                  {TRACKS.reduce((s, t) => s + (MODULE_REGISTRY[t.id]?.length || 0), 0)} modules
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Roadmap section heading ── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-surface-3" />
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Choisissez votre parcours</span>
        <div className="h-px flex-1 bg-surface-3" />
      </div>

      {/* ── Track cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
        {TRACKS.map((track, idx) => {
          const ts = getTrackStats(track.id);
          const modules = MODULE_REGISTRY[track.id] || [];
          const totalMods = modules.length;

          return (
            <Link key={track.id} to={track.slug}
              className={`card-interactive p-6 bg-gradient-to-br ${track.gradient} border ${track.borderColor} group animate-slide-up flex flex-col`}
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}>

              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{track.icon}</div>
                {ts.totalCompleted > 0 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
                    style={{ color: track.color, borderColor: track.color + '40', background: track.color + '10' }}>
                    {ts.percentage}%
                  </span>
                )}
              </div>

              <h2 className="font-display font-extrabold text-xl text-text-primary mb-0.5 tracking-tight">
                {track.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: track.color }}>
                {track.subtitle}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{track.desc}</p>

              {/* Mini roadmap */}
              <MiniRoadmap track={track} modules={modules} isModuleComplete={isModuleComplete} />

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-3/40">
                <div className="flex gap-3 text-[11px] text-text-muted font-mono">
                  <span>{totalMods} modules</span>
                  <span>·</span>
                  <span>{ts.totalExercises} exercices</span>
                </div>
                <span className="text-sm font-display font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: track.color }}>
                  {ts.totalCompleted > 0 ? 'Continuer →' : 'Commencer →'}
                </span>
              </div>
            </Link>
          );
        })}

        {/* Coming soon placeholder */}
        <div className="card p-6 border-dashed border-surface-3/50 flex flex-col items-center justify-center text-center gap-3 min-h-[280px] opacity-40">
          <div className="text-3xl">🔒</div>
          <p className="text-sm font-mono text-text-muted">Prochain parcours</p>
          <div className="flex flex-col gap-1 w-full max-w-[160px]">
            {futureTags.slice(0, 2).map((tagId) => {
              const tag = TAGS[tagId];
              if (!tag) return null;
              return (
                <span key={tagId} className="text-[11px] px-2 py-1 rounded-lg bg-surface-2 text-text-muted/50 font-mono border border-surface-3">
                  {tag.icon} {tag.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mb-14">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-px flex-1 bg-surface-3" />
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Comment ça marche</span>
          <div className="h-px flex-1 bg-surface-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📖', title: 'Théorie guidée', desc: 'Chaque module commence par des leçons claires avec exemples concrets et références.' },
            { icon: '🏋️', title: 'Exercices pratiques', desc: 'Mettez en pratique dans un terminal interactif ou un éditeur YAML avec validation automatique.' },
            { icon: '🏆', title: 'Projet capstone', desc: 'Terminez chaque parcours par un projet réel qui regroupe toutes les compétences acquises.' },
          ].map((step, i) => (
            <div key={i} className="card p-5 flex flex-col gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 0.1 + 0.3}s`, animationFillMode: 'backwards' }}>
              <div className="text-2xl">{step.icon}</div>
              <div>
                <h3 className="font-display font-bold text-text-primary text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
