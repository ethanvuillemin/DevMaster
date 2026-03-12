import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import MODULES from '../data/modules';
import ProgressBar from '../components/ui/ProgressBar';

const FEATURES = [
  {
    icon: '💻',
    title: 'Terminal interactif',
    desc: 'Pratiquez dans un terminal simulé avec validation automatique des exercices.',
  },
  {
    icon: '🗺️',
    title: 'Parcours progressif',
    desc: 'De débutant à expert en 7 modules structurés, avec théorie et pratique.',
  },
  {
    icon: '🔗',
    title: 'Agnostique plateforme',
    desc: 'Git en ligne de commande : fonctionne avec GitHub, GitLab, Bitbucket...',
  },
  {
    icon: '📖',
    title: 'Ressources complètes',
    desc: 'Liens vers la documentation officielle, cheatsheets et tutoriels à chaque étape.',
  },
];

const LEVEL_COLORS = {
  green: 'bg-emerald-500/10 text-accent-green border-accent-green/20',
  blue: 'bg-blue-500/10 text-accent-blue border-accent-blue/20',
  purple: 'bg-purple-500/10 text-accent-purple border-accent-purple/20',
  pink: 'bg-pink-500/10 text-accent-pink border-accent-pink/20',
  orange: 'bg-orange-500/10 text-accent-orange border-accent-orange/20',
  red: 'bg-red-500/10 text-accent-red border-accent-red/20',
  yellow: 'bg-yellow-500/10 text-accent-yellow border-accent-yellow/20',
};

export default function Home() {
  const { stats } = useProgress();

  return (
    <div className="animate-fade-in">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="text-center pt-12 pb-16 relative">
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-accent-green/[0.04] blur-3xl" />
        </div>

        <div className="relative">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-5 text-balance">
            <span className="text-text-primary">Maîtrisez </span>
            <span className="gradient-text">Git</span>
            <span className="text-text-primary"> de Zéro</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Un parcours complet et interactif pour apprendre Git en ligne de commande.
            De l'initialisation au workflow professionnel.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/roadmap" className="btn-primary">
              🚀 Commencer le parcours
            </Link>
            <Link to="/cheatsheet" className="btn-secondary">
              📋 Cheatsheet
            </Link>
          </div>

          {/* Progress indicator */}
          {stats.totalCompleted > 0 && (
            <div className="mt-8 inline-block">
              <div className="card px-5 py-3 flex items-center gap-4">
                <span className="text-sm text-text-muted">
                  ✅ {stats.totalCompleted}/{stats.totalExercises} exercices
                </span>
                <ProgressBar
                  value={stats.totalCompleted}
                  max={stats.totalExercises}
                  className="w-28"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {FEATURES.map((feat, idx) => (
          <div
            key={feat.title}
            className="card p-5 animate-slide-up"
            style={{ animationDelay: `${idx * 0.08}s`, animationFillMode: 'backwards' }}
          >
            <div className="text-3xl mb-3">{feat.icon}</div>
            <h3 className="font-display font-bold text-text-primary mb-1.5">{feat.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* ── Module preview ────────────────────────── */}
      <section>
        <h2 className="font-display font-extrabold text-2xl text-text-primary mb-6 tracking-tight">
          📍 Aperçu du parcours
        </h2>
        <div className="flex flex-col gap-3">
          {MODULES.map((mod, idx) => (
            <Link
              key={mod.id}
              to={`/module/${mod.id}`}
              className="card-interactive flex items-center gap-4 p-4 animate-slide-up"
              style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'backwards' }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${LEVEL_COLORS[mod.color] || ''}`}
              >
                {mod.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: mod.colorHex }}
                  >
                    {mod.level}
                  </span>
                  <span className="text-[11px] text-text-muted">Module {idx + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-text-primary">{mod.title}</h3>
                <p className="text-sm text-text-muted mt-0.5 truncate">{mod.desc}</p>
              </div>
              <span className="text-text-muted text-xl shrink-0">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
