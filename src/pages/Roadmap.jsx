import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import MODULES from '../data/modules';
import TRACKS, { TAGS } from '../data/tracks';
import CapstoneProject from '../components/ui/CapstoneProject';

const TRACK = TRACKS.find((t) => t.id === 'git');

export default function Roadmap() {
  const { isExerciseComplete, isModuleComplete, getTrackStats } = useProgress();
  const trackStats = getTrackStats('git');

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {TRACK.tags.map((tagId) => {
            const tag = TAGS[tagId];
            return (
              <span key={tagId} className="text-[11px] px-2 py-0.5 rounded-md font-mono font-bold border"
                style={{ color: tag.color, borderColor: tag.color + '33', background: tag.color + '10' }}>
                {tag.icon} {tag.label}
              </span>
            );
          })}
        </div>
        <h1 className="font-display font-extrabold text-3xl text-text-primary tracking-tight mb-2">
          🌿 Git : From Zero to Hero
        </h1>
        <p className="text-text-secondary max-w-2xl mb-4">
          Suivez ce parcours étape par étape. Chaque module contient des leçons théoriques
          et des exercices pratiques dans un terminal interactif.
        </p>
        {trackStats.totalCompleted > 0 && (
          <div className="flex items-center gap-3">
            <div className="h-2 rounded-full bg-surface-3 overflow-hidden w-48">
              <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-emerald-400 transition-all duration-700"
                style={{ width: `${trackStats.percentage}%` }} />
            </div>
            <span className="text-xs font-mono text-text-muted">
              {trackStats.totalCompleted}/{trackStats.totalExercises} ({trackStats.percentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="relative pl-8 sm:pl-10">
        {/* Vertical gradient line */}
        <div
          className="absolute left-[14px] sm:left-[18px] top-0 bottom-0 w-0.5"
          style={{
            background: `linear-gradient(180deg, ${MODULES.map((m) => m.colorHex).join(', ')})`,
          }}
        />

        <div className="flex flex-col gap-6">
          {MODULES.map((mod, idx) => {
            const exCount = mod.exercises?.length || 0;
            const exDone = mod.exercises
              ? mod.exercises.filter((_, ei) => isExerciseComplete(mod.id, ei)).length
              : 0;
            const allDone = isModuleComplete(mod.id);

            return (
              <div key={mod.id} className="relative animate-slide-up" style={{ animationDelay: `${idx * 0.06}s`, animationFillMode: 'backwards' }}>
                {/* Node on timeline */}
                <div
                  className="absolute -left-8 sm:-left-10 top-5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 border-2 transition-all duration-300"
                  style={{
                    background: allDone ? mod.colorHex : '#0b0f1a',
                    borderColor: mod.colorHex,
                    color: allDone ? '#0b0f1a' : mod.colorHex,
                  }}
                >
                  {allDone ? '✓' : idx + 1}
                </div>

                <Link
                  to={`/git/module/${mod.id}`}
                  className="card-interactive p-5 block"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border"
                      style={{
                        background: `${mod.colorHex}10`,
                        borderColor: `${mod.colorHex}30`,
                      }}
                    >
                      {mod.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] font-mono font-bold uppercase tracking-wider"
                          style={{ color: mod.colorHex }}
                        >
                          {mod.level}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-text-primary text-lg">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">{mod.desc}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-text-muted">
                        <span>📖 {mod.lessons.length} leçon{mod.lessons.length > 1 ? 's' : ''}</span>
                        <span>🏋️ {exCount} exercice{exCount > 1 ? 's' : ''}</span>
                        {exCount > 0 && (
                          <span className={allDone ? 'text-accent-green font-semibold' : ''}>
                            ✅ {exDone}/{exCount}
                          </span>
                        )}
                      </div>

                      {/* Mini progress bar */}
                      {exCount > 0 && (
                        <div className="mt-3 h-1.5 rounded-full bg-surface-3 overflow-hidden max-w-xs">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(exDone / exCount) * 100}%`,
                              background: `linear-gradient(90deg, ${mod.colorHex}, ${mod.colorHex}88)`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <span className="text-text-muted text-lg shrink-0 mt-3">→</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capstone Project */}
      {TRACK.capstone && (
        <CapstoneProject trackId="git" capstone={TRACK.capstone} />
      )}
    </div>
  );
}
