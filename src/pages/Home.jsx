import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import TRACKS, { TAGS } from '../data/tracks';
import MODULE_REGISTRY from '../data/registry';
import TrackIcon from '../components/ui/TrackIcon';

const LEVEL_ORDER = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

/* ══════════════════════════════════════
   SVG Hero Illustration — Roadmap visuel
══════════════════════════════════════ */
function HeroIllustration() {
  const nodes = [
    { x: 60,  y: 180, label: 'Débutant',      color: '#10B981', r: 22 },
    { x: 180, y: 100, label: 'Intermédiaire', color: '#6366F1', r: 22 },
    { x: 300, y: 160, label: 'Avancé',        color: '#A78BFA', r: 22 },
    { x: 420, y: 80,  label: 'Expert',        color: '#FB923C', r: 24 },
  ];

  return (
    <svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[500px] mx-auto animate-float" aria-label="Illustration d'une roadmap d'apprentissage">

      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
        </radialGradient>
        <filter id="blur-sm"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id="blur-xs"><feGaussianBlur stdDeviation="3"/></filter>
        <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#10B981"/>
          <stop offset="50%"  stopColor="#6366F1"/>
          <stop offset="100%" stopColor="#FB923C"/>
        </linearGradient>
      </defs>

      {/* Background glows */}
      <ellipse cx="250" cy="140" rx="200" ry="100" fill="url(#glow1)" filter="url(#blur-sm)"/>
      <ellipse cx="60"  cy="180" rx="60"  ry="60"  fill="url(#glow2)" filter="url(#blur-sm)"/>

      {/* Grid dots */}
      {[40,90,140,190,240,290,340,390,440].map(x =>
        [40,90,140,190,240].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5"
            fill="var(--surface-3)" opacity="0.6"/>
        ))
      )}

      {/* Path connecting nodes — dashed */}
      <path d="M60 180 Q120 80 180 100 Q240 120 300 160 Q360 200 420 80"
        stroke="url(#pathGrad)" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="6 4" opacity="0.8"/>

      {/* Glow under path */}
      <path d="M60 180 Q120 80 180 100 Q240 120 300 160 Q360 200 420 80"
        stroke="url(#pathGrad)" strokeWidth="12" strokeLinecap="round"
        opacity="0.08" filter="url(#blur-xs)"/>

      {/* Progress fill (first segment) */}
      <path d="M60 180 Q120 80 180 100"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {/* Outer ring */}
          <circle cx={n.x} cy={n.y} r={n.r + 8} fill={n.color} opacity="0.08"/>
          <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.color} opacity="0.12"/>
          {/* Main circle */}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={i === 0 ? 1 : 0.85}/>
          {/* Inner shine */}
          <circle cx={n.x - 5} cy={n.y - 5} r={n.r * 0.4}
            fill="white" opacity="0.15"/>
          {/* Number */}
          <text x={n.x} y={n.y + 5} textAnchor="middle"
            fill="white" fontSize="13" fontWeight="700" fontFamily="Outfit, sans-serif">
            {i + 1}
          </text>
          {/* Label */}
          <text x={n.x} y={n.y + n.r + 18} textAnchor="middle"
            fill="var(--text-secondary)" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">
            {n.label}
          </text>
        </g>
      ))}

      {/* Floating skill pills */}
      {[
        { x: 100, y: 230, text: 'Git',     color: '#10B981' },
        { x: 210, y: 55,  text: 'CI/CD',   color: '#6366F1' },
        { x: 355, y: 230, text: 'Docker',  color: '#A78BFA' },
        { x: 445, y: 135, text: 'GenAI',   color: '#FB923C' },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 22} y={p.y - 10} width={44} height={20} rx="10"
            fill={p.color} fillOpacity="0.12" stroke={p.color} strokeOpacity="0.4" strokeWidth="1"/>
          <text x={p.x} y={p.y + 5} textAnchor="middle"
            fill={p.color} fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">
            {p.text}
          </text>
        </g>
      ))}

      {/* Checkmark on first node */}
      <g transform="translate(60, 180)">
        <path d="M-6 0 L-2 4 L7 -5" stroke="white" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════
   Diagramme "Comment ça marche"
══════════════════════════════════════ */
function TheoryDiagram() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-20">
      <rect x="10" y="20" width="100" height="60" rx="8"
        fill="var(--surface-2)" stroke="var(--surface-3)" strokeWidth="1.5"/>
      {/* Lines representing text */}
      <rect x="20" y="32" width="60" height="5" rx="2.5" fill="var(--brand)" opacity="0.7"/>
      <rect x="20" y="43" width="80" height="4" rx="2" fill="var(--surface-4)" opacity="0.6"/>
      <rect x="20" y="52" width="70" height="4" rx="2" fill="var(--surface-4)" opacity="0.6"/>
      <rect x="20" y="61" width="50" height="4" rx="2" fill="var(--surface-4)" opacity="0.4"/>
      {/* Tag */}
      <rect x="20" y="70" width="28" height="6" rx="3"
        fill="var(--brand)" fillOpacity="0.15" stroke="var(--brand)" strokeOpacity="0.4" strokeWidth="1"/>
    </svg>
  );
}

function PracticeDiagram() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-20">
      {/* Terminal window */}
      <rect x="10" y="15" width="100" height="70" rx="8"
        fill="#0B0E1A" stroke="var(--surface-3)" strokeWidth="1.5"/>
      {/* Traffic lights */}
      <circle cx="22" cy="26" r="3.5" fill="#F87171"/>
      <circle cx="33" cy="26" r="3.5" fill="#FBBF24"/>
      <circle cx="44" cy="26" r="3.5" fill="#10B981"/>
      {/* Terminal lines */}
      <rect x="18" y="37" width="8"  height="3" rx="1.5" fill="#10B981" opacity="0.9"/>
      <rect x="29" y="37" width="40" height="3" rx="1.5" fill="var(--brand)" opacity="0.6"/>
      <rect x="18" y="46" width="8"  height="3" rx="1.5" fill="#10B981" opacity="0.9"/>
      <rect x="29" y="46" width="55" height="3" rx="1.5" fill="var(--text-muted)" opacity="0.4"/>
      <rect x="18" y="55" width="8"  height="3" rx="1.5" fill="#10B981" opacity="0.9"/>
      <rect x="29" y="55" width="30" height="3" rx="1.5" fill="var(--text-muted)" opacity="0.4"/>
      {/* Cursor blink */}
      <rect x="29" y="64" width="6" height="3" rx="1" fill="var(--brand)" opacity="0.8"/>
    </svg>
  );
}

function CapstoneDiagram() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-20">
      {/* Trophy body */}
      <path d="M50 25 H70 V55 Q70 70 60 72 Q50 70 50 55 Z"
        fill="var(--brand)" fillOpacity="0.2" stroke="var(--brand)" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Trophy handles */}
      <path d="M50 32 Q40 32 40 44 Q40 52 50 52" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M70 32 Q80 32 80 44 Q80 52 70 52" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      {/* Base */}
      <rect x="52" y="72" width="16" height="4" rx="1" fill="var(--brand)" opacity="0.5"/>
      <rect x="46" y="76" width="28" height="5" rx="2.5" fill="var(--brand)" opacity="0.4"/>
      {/* Star inside */}
      <path d="M60 38 L61.8 43.5 H67.5 L62.9 46.9 L64.7 52.5 L60 49.1 L55.3 52.5 L57.1 46.9 L52.5 43.5 H58.2 Z"
        fill="var(--brand)" opacity="0.9"/>
    </svg>
  );
}

/* ══════════════════════════════════════
   Mini roadmap inside card
══════════════════════════════════════ */
function MiniRoadmap({ track, modules, isModuleComplete }) {
  const groups = LEVEL_ORDER.reduce((acc, lvl) => {
    const mods = modules.filter(m => m.level === lvl);
    if (mods.length) acc.push({ lvl, count: mods.length, done: mods.filter(m => isModuleComplete(m.id)).length });
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {groups.map((g, i) => {
        const pct = Math.round((g.done / g.count) * 100);
        return (
          <div key={g.lvl} className="flex items-center gap-3">
            <span className="text-[10px] font-mono w-24 shrink-0 truncate"
              style={{ color: 'var(--text-muted)' }}>{g.lvl}</span>
            <div className="flex-1 progress-track h-1">
              <div className="progress-fill h-1 transition-all duration-700"
                style={{ width: `${pct}%`, background: track.color }}/>
            </div>
            <span className="text-[10px] font-mono tabular-nums w-4 text-right"
              style={{ color: 'var(--text-muted)' }}>{g.count}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════
   Arrow right icon
══════════════════════════════════════ */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
export default function Home() {
  const { stats, getTrackStats, isModuleComplete } = useProgress();
  const allTags    = [...new Set(TRACKS.flatMap(t => t.tags))];
  const futureTags = ['mlops', 'llmops', 'ia', 'fullstack'].filter(t => !allTags.includes(t));
  const totalModules = TRACKS.reduce((s, t) => s + (MODULE_REGISTRY[t.id]?.length || 0), 0);

  return (
    <div className="animate-fade-in">

      {/* ══════════════════════════════
          HERO — 2 colonnes
      ══════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10 pb-16">

        {/* Left — texte */}
        <div>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 border text-xs font-mono font-medium"
            style={{
              background: 'rgba(99,102,241,0.08)',
              borderColor: 'rgba(99,102,241,0.25)',
              color: 'var(--brand-bright)',
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-soft"/>
            Plateforme d'apprentissage interactive
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl text-balance mb-5"
            style={{ color: 'var(--text-primary)', lineHeight: '1.12' }}>
            De débutant à{' '}
            <span className="gradient-text">expert</span>
            <br/>en DevOps & IA
          </h1>

          <p className="text-base mb-8 leading-relaxed max-w-md"
            style={{ color: 'var(--text-secondary)' }}>
            Parcours structurés, terminal interactif, exercices métier et projets capstone.
            Chaque module vous guide pas à pas avec du code réel.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { value: TRACKS.length, label: 'parcours' },
              { value: totalModules, label: 'modules' },
              { value: stats.totalExercises, label: 'exercices' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--brand-bright)' }}>
                  {s.value}+
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tags disponibles */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(id => {
              const tag = TAGS[id];
              if (!tag) return null;
              return (
                <span key={id} className="badge text-xs px-3 py-1 rounded-full border font-mono font-medium"
                  style={{ color: tag.color, borderColor: tag.color + '30', background: tag.color + '0A' }}>
                  {tag.label}
                </span>
              );
            })}
            {futureTags.map(id => {
              const tag = TAGS[id];
              if (!tag) return null;
              return (
                <span key={id} className="badge text-xs px-3 py-1 rounded-full border font-mono"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--surface-3)', background: 'transparent' }}>
                  {tag.label}
                  <span className="ml-1.5 text-[9px] opacity-60">bientôt</span>
                </span>
              );
            })}
          </div>

          {/* Global progress (si commencé) */}
          {stats.totalCompleted > 0 && (
            <div className="mt-8 p-4 rounded-2xl border inline-flex items-center gap-4"
              style={{ background: 'var(--surface-1)', borderColor: 'var(--surface-3)' }}>
              <div>
                <div className="text-[11px] mb-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Progression globale
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 progress-track">
                    <div className="progress-fill" style={{ width: `${stats.percentage}%` }}/>
                  </div>
                  <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                    {stats.totalCompleted}/{stats.totalExercises}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-lg" style={{ color: 'var(--brand-bright)' }}>
                  {stats.percentage}%
                </div>
                <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>complété</div>
              </div>
            </div>
          )}
        </div>

        {/* Right — SVG illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full">
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-48 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, var(--brand) 0%, transparent 70%)' }}/>
            </div>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PARCOURS
      ══════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: 'var(--surface-3)' }}/>
          <span className="section-label">Choisissez votre parcours</span>
          <div className="h-px flex-1" style={{ background: 'var(--surface-3)' }}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TRACKS.map((track, idx) => {
            const ts = getTrackStats(track.id);
            const modules = MODULE_REGISTRY[track.id] || [];

            return (
              <Link key={track.id} to={track.slug}
                className="card-interactive p-6 flex flex-col group animate-slide-up"
                style={{
                  animationDelay: `${idx * 0.07}s`,
                  animationFillMode: 'backwards',
                }}>

                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  {/* SVG icon in colored container */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: track.color + '12',
                      borderColor: track.color + '28',
                    }}>
                    <TrackIcon trackId={track.id} size={32} color={track.color}/>
                  </div>

                  {/* Progress badge */}
                  {ts.totalCompleted > 0 ? (
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border"
                      style={{ color: track.color, borderColor: track.color + '30', background: track.color + '08' }}>
                      {ts.percentage}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-1 rounded-lg border"
                      style={{ color: 'var(--text-muted)', borderColor: 'var(--surface-3)', background: 'var(--surface-2)' }}>
                      Nouveau
                    </span>
                  )}
                </div>

                {/* Title & subtitle */}
                <h2 className="font-display font-bold text-lg mb-0.5"
                  style={{ color: 'var(--text-primary)' }}>
                  {track.title}
                </h2>
                <p className="text-[11px] font-mono uppercase tracking-widest mb-3"
                  style={{ color: track.color }}>
                  {track.subtitle}
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-2"
                  style={{ color: 'var(--text-secondary)' }}>
                  {track.desc}
                </p>

                {/* Mini roadmap */}
                <MiniRoadmap track={track} modules={modules} isModuleComplete={isModuleComplete}/>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t"
                  style={{ borderColor: 'var(--surface-3)' }}>
                  <div className="flex gap-3 text-[11px] font-mono"
                    style={{ color: 'var(--text-muted)' }}>
                    <span>{modules.length} modules</span>
                    <span>·</span>
                    <span>{ts.totalExercises} exercices</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: track.color }}>
                    {ts.totalCompleted > 0 ? 'Continuer' : 'Commencer'}
                    <ArrowRight/>
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Coming soon */}
          <div className="card p-6 border-dashed flex flex-col items-center justify-center text-center gap-4 min-h-[260px] opacity-30"
            style={{ borderStyle: 'dashed' }}>
            <div className="w-12 h-12 rounded-xl border flex items-center justify-center"
              style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}>
              <LockIcon/>
            </div>
            <div>
              <p className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Prochain parcours
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {futureTags.slice(0, 2).map(id => {
                  const tag = TAGS[id]; if (!tag) return null;
                  return (
                    <span key={id} className="text-[10px] px-2 py-0.5 rounded-lg font-mono border"
                      style={{ color: 'var(--text-muted)', borderColor: 'var(--surface-3)', background: 'var(--surface-2)' }}>
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COMMENT ÇA MARCHE
      ══════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: 'var(--surface-3)' }}/>
          <span className="section-label">Comment ça marche</span>
          <div className="h-px flex-1" style={{ background: 'var(--surface-3)' }}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              num: '01',
              color: '#6366F1',
              title: 'Théorie guidée',
              desc: 'Chaque module commence par des leçons claires, avec exemples concrets et références officielles.',
              diagram: <TheoryDiagram/>,
            },
            {
              num: '02',
              color: '#10B981',
              title: 'Exercices pratiques',
              desc: 'Pratiquez dans un terminal interactif ou un éditeur YAML avec validation automatique en temps réel.',
              diagram: <PracticeDiagram/>,
            },
            {
              num: '03',
              color: '#A78BFA',
              title: 'Projet capstone',
              desc: 'Chaque parcours se termine par un projet professionnel complet qui regroupe toutes les compétences.',
              diagram: <CapstoneDiagram/>,
            },
          ].map((step, i) => (
            <div key={i} className="card p-5 flex flex-col animate-slide-up"
              style={{ animationDelay: `${i * 0.1 + 0.2}s`, animationFillMode: 'backwards' }}>
              {/* SVG diagram */}
              <div className="mb-4 rounded-xl overflow-hidden border p-2"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--surface-3)' }}>
                {step.diagram}
              </div>
              <div className="flex items-start gap-3">
                <span className="font-display font-bold text-xl shrink-0" style={{ color: step.color }}>
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-sm mb-1"
                    style={{ color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
