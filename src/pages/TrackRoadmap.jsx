import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import TRACKS, { TAGS } from '../data/tracks';
import MODULE_REGISTRY from '../data/registry';
import CapstoneProject from '../components/ui/CapstoneProject';

const LEVEL_ORDER = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
const LEVEL_META = {
  'Débutant':      { label: 'Débutant',      badge: '01', color: '#59CD90' },
  'Intermédiaire': { label: 'Intermédiaire', badge: '02', color: '#3FA7D6' },
  'Avancé':        { label: 'Avancé',        badge: '03', color: '#AA7DCE' },
  'Expert':        { label: 'Expert',        badge: '04', color: '#F3752B' },
};

export default function TrackRoadmap({ trackId }) {
  const { isExerciseComplete, isModuleComplete, getTrackStats } = useProgress();
  const track = TRACKS.find((t) => t.id === trackId);
  const modules = MODULE_REGISTRY[trackId] || [];
  const trackStats = getTrackStats(trackId);

  if (!track) return <p className="text-text-muted">Track introuvable.</p>;

  // Group modules by level
  const groups = LEVEL_ORDER.reduce((acc, lvl) => {
    const mods = modules.filter((m) => m.level === lvl);
    if (mods.length) acc.push({ level: lvl, mods });
    return acc;
  }, []);

  // Ungrouped modules (custom levels not in LEVEL_ORDER)
  const ungrouped = modules.filter((m) => !LEVEL_ORDER.includes(m.level));
  if (ungrouped.length) groups.push({ level: null, mods: ungrouped });

  const completedCount = modules.reduce((sum, m) => {
    return sum + (m.exercises?.filter((_, ei) => isExerciseComplete(m.id, ei)).length || 0);
  }, 0);
  const totalCount = trackStats.totalExercises;

  return (
    <div className="animate-fade-in">
      {/* ── Track header ── */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {track.tags.map((tagId) => {
            const tag = TAGS[tagId];
            return (
              <span key={tagId}
                className="text-[11px] px-2 py-0.5 rounded-md font-mono font-bold border"
                style={{ color: tag.color, borderColor: tag.color + '33', background: tag.color + '10' }}>
                {tag.icon} {tag.label}
              </span>
            );
          })}
        </div>

        <h1 className="font-display font-extrabold text-3xl text-text-primary tracking-tight mb-2">
          {track.icon} {track.title}
        </h1>
        <p className="text-text-secondary max-w-2xl mb-5">{track.desc}</p>

        {/* Global progress bar */}
        {completedCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="h-2 rounded-full bg-surface-3 overflow-hidden w-48">
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(completedCount / totalCount) * 100}%`,
                  background: `linear-gradient(90deg, ${track.color}, ${track.color}88)`,
                }} />
            </div>
            <span className="text-xs font-mono text-text-muted">
              {completedCount}/{totalCount} exercices ({Math.round((completedCount / totalCount) * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* ── Level groups ── */}
      <div className="space-y-16">
        {groups.map(({ level, mods }, groupIdx) => {
          const meta = level ? LEVEL_META[level] : null;
          const groupDone = mods.every((m) => isModuleComplete(m.id));

          return (
            <div key={level ?? 'ungrouped'} className="relative">
              {/* Level banner */}
              {meta && (
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="flex items-center gap-3 px-4 py-2 rounded-xl border font-mono font-bold text-sm"
                    style={{ color: meta.color, borderColor: meta.color + '30', background: meta.color + '08' }}>
                    <span className="text-lg opacity-60">{meta.badge}</span>
                    <span className="uppercase tracking-widest text-xs">{meta.label}</span>
                    {groupDone && <span className="text-xs">✓ Terminé</span>}
                  </div>
                  <div className="flex-1 h-px bg-surface-3" />
                </div>
              )}

              {/* Modules in this group */}
              <div className="relative pl-8 sm:pl-10">
                {/* Vertical line */}
                <div
                  className="absolute left-[14px] sm:left-[18px] top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: meta ? meta.color + '40' : '#334155' }}
                />

                <div className="flex flex-col gap-4">
                  {mods.map((mod, idx) => {
                    const exCount = mod.exercises?.length || 0;
                    const exDone = mod.exercises
                      ? mod.exercises.filter((_, ei) => isExerciseComplete(mod.id, ei)).length
                      : 0;
                    const allDone = isModuleComplete(mod.id);
                    const inProgress = exDone > 0 && !allDone;

                    // Global index across all groups for animation delay
                    const globalIdx = groups
                      .slice(0, groupIdx)
                      .reduce((s, g) => s + g.mods.length, 0) + idx;

                    return (
                      <div key={mod.id} className="relative animate-slide-up"
                        style={{ animationDelay: `${globalIdx * 0.05}s`, animationFillMode: 'backwards' }}>

                        {/* Timeline node */}
                        <div
                          className="absolute -left-8 sm:-left-10 top-5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 border-2 transition-all duration-300"
                          style={{
                            background: allDone ? mod.colorHex : 'var(--surface-0)',
                            borderColor: inProgress ? mod.colorHex : allDone ? mod.colorHex : '#334155',
                            color: allDone ? 'var(--surface-0)' : inProgress ? mod.colorHex : '#64748b',
                            boxShadow: inProgress ? `0 0 12px ${mod.colorHex}40` : 'none',
                          }}>
                          {allDone ? '✓' : idx + 1}
                        </div>

                        <Link to={`/${track.id}/module/${mod.id}`} className="card-interactive p-5 block group">
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border transition-all duration-300 group-hover:scale-105"
                              style={{ background: `${mod.colorHex}10`, borderColor: `${mod.colorHex}30` }}>
                              {mod.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider"
                                  style={{ color: mod.colorHex }}>
                                  Module {idx + 1}
                                </span>
                                {allDone && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-accent-green/10 text-accent-green border border-accent-green/20">
                                    Terminé
                                  </span>
                                )}
                                {inProgress && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                                    style={{ background: mod.colorHex + '10', color: mod.colorHex, borderColor: mod.colorHex + '30' }}>
                                    En cours
                                  </span>
                                )}
                              </div>

                              <h3 className="font-display font-bold text-text-primary text-lg">{mod.title}</h3>
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

                              {exCount > 0 && (
                                <div className="mt-3 h-1.5 rounded-full bg-surface-3 overflow-hidden max-w-xs">
                                  <div className="h-full rounded-full transition-all duration-500"
                                    style={{
                                      width: `${(exDone / exCount) * 100}%`,
                                      background: `linear-gradient(90deg, ${mod.colorHex}, ${mod.colorHex}88)`,
                                    }} />
                                </div>
                              )}
                            </div>

                            <span className="text-text-muted text-lg shrink-0 mt-3 transition-transform duration-200 group-hover:translate-x-1">→</span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow to next group */}
              {groupIdx < groups.length - 1 && (
                <div className="flex flex-col items-start pl-[14px] sm:pl-[18px] mt-4 gap-1">
                  <div className="w-0.5 h-6 bg-surface-3 rounded-full ml-3" />
                  <div className="text-text-muted/40 text-xs font-mono ml-1">↓</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Capstone ── */}
      {track.capstone && (
        <div className="mt-16">
          <CapstoneProject trackId={trackId} capstone={track.capstone} />
        </div>
      )}
    </div>
  );
}
