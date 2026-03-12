import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import MODULES from '../data/modules';
import CICD_MODULES from '../data/cicdModules';
import ProgressBar from '../components/ui/ProgressBar';

const TRACKS = [
  {
    id: 'git',
    icon: '🌿',
    title: 'Maîtriser Git',
    subtitle: 'Ligne de commande',
    desc: 'De git init au workflow professionnel. Terminal interactif avec moteur Git simulé et graphes SVG en temps réel.',
    link: '/git',
    modules: MODULES,
    color: '#34d399',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    features: ['Terminal simulé', '23 exercices métier', 'Graphes temps réel'],
  },
  {
    id: 'cicd',
    icon: '🔄',
    title: 'Maîtriser le CI/CD',
    subtitle: 'Pipelines & Déploiement',
    desc: 'GitHub Actions, GitLab CI, Jenkins. Écrivez de vrais pipelines YAML dans un éditeur interactif avec validation.',
    link: '/cicd',
    modules: CICD_MODULES,
    color: '#60a5fa',
    gradient: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    features: ['Éditeur YAML', '15+ exercices pipeline', 'Multi-plateforme'],
  },
];

export default function Home() {
  const { stats } = useProgress();

  return (
    <div className="animate-fade-in">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="text-center pt-10 pb-14 relative">
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
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Une plateforme interactive pour apprendre Git et le CI/CD de zéro.
            Exercices pratiques, scénarios métier, et ressources documentées.
          </p>

          {stats.totalCompleted > 0 && (
            <div className="inline-block mb-6">
              <div className="card px-5 py-3 flex items-center gap-4">
                <span className="text-sm text-text-muted">
                  ✅ {stats.totalCompleted}/{stats.totalExercises} exercices
                </span>
                <ProgressBar value={stats.totalCompleted} max={stats.totalExercises} className="w-28" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Track Cards ───────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {TRACKS.map((track, idx) => {
          const totalEx = track.modules.reduce((s, m) => s + (m.exercises?.length || 0), 0);
          return (
            <Link
              key={track.id}
              to={track.link}
              className={`card-interactive p-6 bg-gradient-to-br ${track.gradient} border ${track.borderColor} group animate-slide-up`}
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{track.icon}</div>
                <span className="text-xs font-mono text-text-muted bg-surface-2 px-2 py-0.5 rounded">
                  {track.modules.length} modules
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl text-text-primary mb-1 tracking-tight">
                {track.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: track.color }}>
                {track.subtitle}
              </p>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {track.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {track.features.map((f) => (
                  <span key={f} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-text-muted border border-surface-3">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{totalEx} exercices pratiques</span>
                <span className="text-sm font-display font-bold group-hover:translate-x-1 transition-transform" style={{ color: track.color }}>
                  Commencer →
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── What you'll learn ─────────────────────── */}
      <section className="mb-16">
        <h2 className="font-display font-extrabold text-2xl text-text-primary mb-6 tracking-tight text-center">
          Ce que vous allez apprendre
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '💻', label: 'Git CLI', sub: 'init → workflow pro' },
            { icon: '🌿', label: 'Branches', sub: 'merge, rebase, stash' },
            { icon: '🐙', label: 'GitHub Actions', sub: 'workflows YAML' },
            { icon: '🦊', label: 'GitLab CI/CD', sub: 'stages & artifacts' },
            { icon: '🏗️', label: 'Jenkins', sub: 'pipelines déclaratifs' },
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

      {/* ── All modules preview ───────────────────── */}
      <section>
        <h2 className="font-display font-extrabold text-xl text-text-primary mb-4 tracking-tight">
          📍 Tous les parcours
        </h2>

        <div className="space-y-6">
          {TRACKS.map((track) => (
            <div key={track.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{track.icon}</span>
                <h3 className="font-display font-bold text-text-primary">{track.title}</h3>
                <Link to={track.link} className="ml-auto text-xs font-medium hover:underline" style={{ color: track.color }}>
                  Voir la roadmap →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {track.modules.map((mod) => (
                  <Link key={mod.id}
                    to={track.id === 'git' ? `/git/module/${mod.id}` : `/cicd/module/${mod.id}`}
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
          ))}
        </div>
      </section>
    </div>
  );
}
