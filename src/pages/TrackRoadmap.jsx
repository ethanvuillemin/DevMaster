import { Link, useParams } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import TRACKS, { TAGS } from '../data/tracks';
import MODULE_REGISTRY from '../data/registry';
import CapstoneProject from '../components/ui/CapstoneProject';
import TrackIcon from '../components/ui/TrackIcon';

const LEVEL_ORDER = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
const LEVEL_META = {
  'Débutant':      { badge: '01', color: '#10B981' },
  'Intermédiaire': { badge: '02', color: '#6366F1' },
  'Avancé':        { badge: '03', color: '#A78BFA' },
  'Expert':        { badge: '04', color: '#FB923C' },
};

/* ── Icons ── */
const CheckIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const LessonsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

export default function TrackRoadmap({ trackId: trackIdProp }) {
  const { trackId: trackIdParam } = useParams();
  const trackId = trackIdProp ?? trackIdParam;

  const { isExerciseComplete, isModuleComplete, getTrackStats } = useProgress();
  const track   = TRACKS.find(t => t.id === trackId);
  const modules = MODULE_REGISTRY[trackId] || [];
  const trackStats = getTrackStats(trackId);

  if (!track) return (
    <div className="text-center py-20">
      <p className="font-display font-semibold" style={{ color: 'var(--text-muted)' }}>
        Track introuvable.
      </p>
      <Link to="/" className="btn-secondary mt-4 inline-flex">← Retour</Link>
    </div>
  );

  const groups = LEVEL_ORDER.reduce((acc, lvl) => {
    const mods = modules.filter(m => m.level === lvl);
    if (mods.length) acc.push({ level: lvl, mods });
    return acc;
  }, []);
  const ungrouped = modules.filter(m => !LEVEL_ORDER.includes(m.level));
  if (ungrouped.length) groups.push({ level: null, mods: ungrouped });

  const completedCount = modules.reduce((sum, m) => {
    return sum + (m.exercises?.filter((_, ei) => isExerciseComplete(m.id, ei)).length || 0);
  }, 0);
  const totalCount = trackStats.totalExercises;
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="animate-fade-in">

      {/* ── Header ── */}
      <div className="mb-10">
        <Link to="/"
          className="inline-flex items-center gap-1.5 text-sm mb-5 transition-colors cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <BackIcon/> Tous les parcours
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {track.tags.map(tagId => {
            const tag = TAGS[tagId]; if (!tag) return null;
            return (
              <span key={tagId} className="badge text-[11px] px-2.5 py-0.5 rounded-lg border font-mono font-medium"
                style={{ color: tag.color, borderColor: tag.color + '28', background: tag.color + '08' }}>
                {tag.label}
              </span>
            );
          })}
        </div>

        {/* Title row */}
        <div className="flex items-start gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0"
            style={{ background: track.color + '10', borderColor: track.color + '25' }}>
            <TrackIcon trackId={track.id} size={38} color={track.color}/>
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl" style={{ color: 'var(--text-primary)' }}>
              {track.title}
            </h1>
            <p className="text-sm mt-1 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {track.desc}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {completedCount > 0 && (
          <div className="flex items-center gap-3 mt-4">
            <div className="w-48 progress-track">
              <div className="progress-fill transition-all duration-700"
                style={{ width: `${pct}%`, background: track.color }}/>
            </div>
            <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
              {completedCount}/{totalCount} exercices ({pct}%)
            </span>
          </div>
        )}
      </div>

      {/* ── Level groups ── */}
      <div className="space-y-12">
        {groups.map(({ level, mods }, groupIdx) => {
          const meta = level ? LEVEL_META[level] : null;
          const groupDone = mods.every(m => isModuleComplete(m.id));

          return (
            <div key={level ?? 'ungrouped'}>
              {/* Level banner */}
              {meta && (
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono shrink-0"
                    style={{ color: meta.color, borderColor: meta.color + '25', background: meta.color + '08' }}>
                    <span className="font-bold opacity-50">{meta.badge}</span>
                    <span className="uppercase tracking-widest font-semibold">{level}</span>
                    {groupDone && (
                      <span className="flex items-center gap-1 opacity-80">
                        <CheckIcon/> Terminé
                      </span>
                    )}
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'var(--surface-3)' }}/>
                </div>
              )}

              {/* Module list with timeline */}
              <div className="relative pl-8 sm:pl-10">
                {/* Vertical line */}
                <div className="absolute left-[14px] sm:left-[18px] top-3 bottom-3 w-px rounded-full"
                  style={{ background: meta ? meta.color + '25' : 'var(--surface-3)' }}/>

                <div className="flex flex-col gap-3">
                  {mods.map((mod, idx) => {
                    const exCount  = mod.exercises?.length || 0;
                    const exDone   = mod.exercises?.filter((_, ei) => isExerciseComplete(mod.id, ei)).length || 0;
                    const allDone  = isModuleComplete(mod.id);
                    const inProgress = exDone > 0 && !allDone;
                    const globalIdx  = groups.slice(0, groupIdx).reduce((s, g) => s + g.mods.length, 0) + idx;

                    return (
                      <div key={mod.id} className="relative animate-slide-up"
                        style={{ animationDelay: `${globalIdx * 0.04}s`, animationFillMode: 'backwards' }}>

                        {/* Timeline node */}
                        <div className="absolute -left-8 sm:-left-10 top-5 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-200"
                          style={{
                            background: allDone ? mod.colorHex : 'var(--surface-0)',
                            borderColor: allDone ? mod.colorHex : inProgress ? mod.colorHex : 'var(--surface-4)',
                            color: allDone ? '#fff' : inProgress ? mod.colorHex : 'var(--text-muted)',
                            boxShadow: inProgress ? `0 0 12px ${mod.colorHex}30` : 'none',
                          }}>
                          {allDone
                            ? <CheckIcon size={12}/>
                            : <span style={{ fontSize: '9px', fontWeight: 700 }}>{idx + 1}</span>
                          }
                        </div>

                        {/* Module card */}
                        <Link to={`/${track.id}/module/${mod.id}`} className="card-interactive p-5 block group">
                          <div className="flex items-start gap-4">
                            {/* Module SVG icon */}
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105"
                              style={{ background: mod.colorHex + '0E', borderColor: mod.colorHex + '25' }}>
                              <TrackIcon trackId={track.id} size={28} color={mod.colorHex}/>
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Badges */}
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider"
                                  style={{ color: mod.colorHex }}>
                                  Module {idx + 1}
                                </span>
                                {allDone && (
                                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-mono border"
                                    style={{ background: '#10B98110', color: '#10B981', borderColor: '#10B98125' }}>
                                    <CheckIcon/> Terminé
                                  </span>
                                )}
                                {inProgress && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                                    style={{ background: mod.colorHex + '10', color: mod.colorHex, borderColor: mod.colorHex + '25' }}>
                                    En cours
                                  </span>
                                )}
                              </div>

                              <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                                {mod.title}
                              </h3>
                              <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {mod.desc}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center gap-4 mt-2.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                <span className="flex items-center gap-1">
                                  <LessonsIcon/>
                                  {mod.lessons.length} leçon{mod.lessons.length > 1 ? 's' : ''}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ZapIcon/>
                                  {exCount} exercice{exCount > 1 ? 's' : ''}
                                </span>
                                {exCount > 0 && (
                                  <span className={`font-mono tabular-nums ${allDone ? 'text-accent-green font-medium' : ''}`}>
                                    {exDone}/{exCount}
                                  </span>
                                )}
                              </div>

                              {/* Progress bar */}
                              {exCount > 0 && (
                                <div className="mt-2.5 w-40 progress-track h-1">
                                  <div className="progress-fill h-1 transition-all duration-500"
                                    style={{ width: `${(exDone / exCount) * 100}%`, background: mod.colorHex }}/>
                                </div>
                              )}
                            </div>

                            <span className="text-lg shrink-0 mt-2 transition-all duration-150 group-hover:translate-x-1"
                              style={{ color: 'var(--text-muted)' }}>
                              <ArrowRightIcon/>
                            </span>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Separator between groups */}
              {groupIdx < groups.length - 1 && (
                <div className="flex flex-col items-start pl-[14px] sm:pl-[18px] mt-3">
                  <div className="w-px h-6 rounded-full ml-3" style={{ background: 'var(--surface-3)' }}/>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Capstone ── */}
      {track.capstone && (
        <div className="mt-16">
          <CapstoneProject trackId={trackId} capstone={track.capstone}/>
        </div>
      )}
    </div>
  );
}
