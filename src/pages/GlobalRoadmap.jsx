import { Link } from 'react-router-dom';
import TRACKS, { ROADMAP_PHASES } from '../data/tracks';
import MODULE_REGISTRY from '../data/registry';
import TrackIcon from '../components/ui/TrackIcon';
import { useProgress } from '../context/ProgressContext';

/* ── Icons ── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const LockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const LEVEL_COLOR = {
  'Débutant':      '#10B981',
  'Intermédiaire': '#6366F1',
  'Avancé':        '#A78BFA',
  'Expert':        '#FB923C',
};

/* ── Module chip ── */
function ModuleChip({ mod, trackId, trackColor, isComplete, inProgress, comingSoon }) {
  const lvlColor = LEVEL_COLOR[mod.level] ?? trackColor;

  const inner = (
    <div
      className="group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200"
      style={{
        background: isComplete
          ? '#10B98112'
          : inProgress
            ? trackColor + '10'
            : 'var(--surface-1)',
        borderColor: isComplete
          ? '#10B98130'
          : inProgress
            ? trackColor + '35'
            : 'var(--surface-3)',
        opacity: comingSoon ? 0.55 : 1,
        cursor: comingSoon ? 'default' : 'pointer',
      }}
    >
      {/* Status dot */}
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px]"
        style={{
          background: isComplete
            ? '#10B981'
            : inProgress
              ? trackColor + '25'
              : 'var(--surface-3)',
          color: isComplete ? '#fff' : inProgress ? trackColor : 'var(--text-muted)',
          border: inProgress ? `1.5px solid ${trackColor}` : 'none',
        }}
      >
        {isComplete ? <CheckIcon /> : comingSoon ? <LockIcon /> : null}
      </div>

      <div className="min-w-0">
        <p
          className="text-xs font-medium leading-tight truncate max-w-[140px]"
          style={{ color: isComplete ? '#10B981' : inProgress ? 'var(--text-primary)' : 'var(--text-secondary)' }}
        >
          {mod.title}
        </p>
        <p className="text-[10px] font-mono mt-0.5" style={{ color: lvlColor, opacity: 0.8 }}>
          {mod.level}
        </p>
      </div>

      {!comingSoon && (
        <ExternalIcon
          style={{ color: 'var(--text-muted)', opacity: 0, transition: 'opacity 0.15s' }}
          className="shrink-0 group-hover:opacity-100"
        />
      )}
    </div>
  );

  if (comingSoon) return inner;

  const href = trackId === 'git'
    ? `/git/module/${mod.id}`
    : `/${trackId}/module/${mod.id}`;

  return <Link to={href}>{inner}</Link>;
}

/* ── Track row ── */
function TrackRow({ track, modules, isExerciseComplete, isModuleComplete }) {
  const comingSoon = !!track.comingSoon;

  const totalEx = modules.reduce((s, m) => s + (m.exercises?.length || 0), 0);
  const doneEx  = modules.reduce((s, m) =>
    s + (m.exercises?.filter((_, i) => isExerciseComplete(m.id, i)).length || 0), 0);
  const pct = totalEx ? Math.round((doneEx / totalEx) * 100) : 0;

  return (
    <div className="group">
      <div className="flex items-start gap-4">

        {/* Left: track identity */}
        <div className="shrink-0 w-52">
          <Link
            to={comingSoon ? '#' : track.slug}
            className="flex items-center gap-2.5 mb-1"
            style={{ pointerEvents: comingSoon ? 'none' : 'auto' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
              style={{ background: track.color + '12', borderColor: track.color + '28' }}
            >
              <TrackIcon trackId={track.id} size={22} color={track.color} />
            </div>
            <div>
              <p className="text-sm font-display font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {track.title}
              </p>
              <p className="text-[11px] font-mono" style={{ color: track.color, opacity: 0.8 }}>
                {track.subtitle}
              </p>
            </div>
          </Link>

          {comingSoon ? (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-lg border"
              style={{ color: track.color, borderColor: track.color + '30', background: track.color + '0A' }}
            >
              <LockIcon /> À venir
            </span>
          ) : totalEx > 0 ? (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
                <div
                  className="h-1 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: track.color }}
                />
              </div>
              <span className="text-[10px] font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
                {doneEx}/{totalEx}
              </span>
            </div>
          ) : null}
        </div>

        {/* Right: module chips grid */}
        <div className="flex-1 flex flex-wrap gap-2">
          {modules.map((mod, idx) => {
            const hasExercises = (mod.exercises?.length ?? 0) > 0;
            const done = hasExercises && isModuleComplete(mod.id);
            const ip = hasExercises && !done && (mod.exercises?.some((_, i) => isExerciseComplete(mod.id, i)) ?? false);
            return (
              <ModuleChip
                key={mod.id}
                mod={mod}
                trackId={track.id}
                trackColor={track.color}
                isComplete={done}
                inProgress={ip}
                comingSoon={comingSoon}
              />
            );
          })}
          {modules.length === 0 && (
            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
              Modules en cours de création…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Phase section ── */
function PhaseSection({ phase, tracks, moduleRegistry, isExerciseComplete, isModuleComplete, isLast }) {
  const phaseTracks = phase.trackIds
    .map(id => tracks.find(t => t.id === id))
    .filter(Boolean);

  const totalModules = phaseTracks.reduce((s, t) => s + (moduleRegistry[t.id]?.length || 0), 0);

  return (
    <div className="relative">
      {/* Phase card */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: phase.color + '25', background: 'var(--surface-1)' }}
      >
        {/* Phase header */}
        <div
          className="flex items-center gap-4 px-6 py-4 border-b"
          style={{ borderColor: phase.color + '20', background: phase.color + '08' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: phase.color + '18', border: `1.5px solid ${phase.color}30` }}
          >
            <span className="font-display font-bold text-sm" style={{ color: phase.color }}>
              {phase.number}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              {phase.label}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{phase.desc}</p>
          </div>
          <div
            className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg"
            style={{ background: phase.color + '10', color: phase.color }}
          >
            {totalModules} modules
          </div>
        </div>

        {/* Track rows */}
        <div className="px-6 py-5 flex flex-col gap-6">
          {phaseTracks.map((track, idx) => (
            <div key={track.id}>
              <TrackRow
                track={track}
                modules={moduleRegistry[track.id] || []}
                isExerciseComplete={isExerciseComplete}
                isModuleComplete={isModuleComplete}
              />
              {idx < phaseTracks.length - 1 && (
                <div className="mt-5 h-px" style={{ background: 'var(--surface-3)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connector between phases */}
      {!isLast && (
        <div className="flex flex-col items-center py-3" style={{ color: 'var(--text-muted)' }}>
          <div className="w-px h-4 rounded-full" style={{ background: 'var(--surface-3)' }} />
          <ArrowDownIcon />
          <div className="w-px h-4 rounded-full" style={{ background: 'var(--surface-3)' }} />
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function GlobalRoadmap() {
  const { isExerciseComplete, isModuleComplete, stats } = useProgress();

  const totalModules = TRACKS.reduce(
    (s, t) => s + (MODULE_REGISTRY[t.id]?.length || 0), 0
  );

  return (
    <div className="animate-fade-in">

      {/* ── Header ── */}
      <div className="mb-8">
        <p className="section-label mb-2">PARCOURS COMPLET</p>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Votre <span className="gradient-text">roadmap</span> d'apprentissage
        </h1>
        <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Des bases de l'informatique à l'IA générative — tous les modules dans l'ordre recommandé,
          avec une progression claire du débutant à l'expert.
        </p>
      </div>

      {/* ── Global progress bar ── */}
      {stats.totalCompleted > 0 && (
        <div
          className="flex items-center gap-4 p-4 rounded-xl border mb-8"
          style={{ background: 'var(--surface-1)', borderColor: 'var(--surface-3)' }}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Progression globale
              </span>
              <span className="text-sm font-mono tabular-nums" style={{ color: 'var(--brand)' }}>
                {stats.percentage}%
              </span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill transition-all duration-700"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              {stats.totalCompleted}
              <span className="text-sm font-normal ml-1" style={{ color: 'var(--text-muted)' }}>
                / {stats.totalExercises}
              </span>
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>exercices complétés</p>
          </div>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-xs" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: '#10B981' }}>
            <CheckIcon />
          </div>
          <span>Terminé</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md border-2" style={{ borderColor: 'var(--brand)', background: 'var(--brand)' + '15' }} />
          <span>En cours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md" style={{ background: 'var(--surface-3)' }} />
          <span>À faire</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
            <LockIcon />
          </div>
          <span>À venir</span>
        </div>
      </div>

      {/* ── Phases ── */}
      <div>
        {ROADMAP_PHASES.map((phase, idx) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            tracks={TRACKS}
            moduleRegistry={MODULE_REGISTRY}
            isExerciseComplete={isExerciseComplete}
            isModuleComplete={isModuleComplete}
            isLast={idx === ROADMAP_PHASES.length - 1}
          />
        ))}
      </div>

    </div>
  );
}
