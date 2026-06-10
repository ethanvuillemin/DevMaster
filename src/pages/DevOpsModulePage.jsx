import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DEVOPS_MODULES  from '../data/devopsModules';
import DEVOPS_PROJECTS from '../data/devopsProjects';
import { useProgress } from '../context/ProgressContext';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import MiniProject from '../components/ui/MiniProject';

export default function DevOpsModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId    = parseInt(id, 10);
  const moduleIndex = DEVOPS_MODULES.findIndex((m) => m.id === moduleId);
  const mod         = DEVOPS_MODULES[moduleIndex];
  const projects    = DEVOPS_PROJECTS[moduleId] || [];

  const [activeLesson, setActiveLesson] = useState(0);

  const {
    completeExercise, isExerciseComplete, isModuleComplete,
    markLessonRead, isLessonRead, areAllLessonsRead,
  } = useProgress();

  useEffect(() => {
    setActiveLesson(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleId]);

  if (!mod) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted text-lg mb-4">Module introuvable.</p>
        <Link to="/devops" className="btn-secondary">← Retour à la roadmap DevOps</Link>
      </div>
    );
  }

  const lesson           = mod.lessons[activeLesson];
  const allLessonsRead   = areAllLessonsRead(moduleId);
  const lessonsCount     = mod.lessons.length;
  const lessonsReadCount = mod.lessons.filter((_, i) => isLessonRead(moduleId, i)).length;
  const projDone         = projects.filter((_, i) => isExerciseComplete(moduleId, i)).length;
  const moduleComplete   = isModuleComplete(moduleId);
  const prevModule       = moduleIndex > 0 ? DEVOPS_MODULES[moduleIndex - 1] : null;
  const nextModule       = moduleIndex < DEVOPS_MODULES.length - 1 ? DEVOPS_MODULES[moduleIndex + 1] : null;

  return (
    <div className="animate-fade-in">
      <Link
        to="/devops"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6"
      >
        ← Retour à la roadmap DevOps / MLOps / LLMOps
      </Link>

      {/* Module header */}
      <div className="flex items-center gap-4 mb-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
          style={{ background: `${mod.colorHex}10`, borderColor: `${mod.colorHex}30` }}
        >
          {mod.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: mod.colorHex }}>
            {mod.level} — Module {moduleIndex + 1}/{DEVOPS_MODULES.length}
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">
            {mod.title}
          </h1>
        </div>
      </div>

      {/* Progress bars */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted w-28 shrink-0">📖 Parties lues</span>
          <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden max-w-xs">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out bg-accent-blue"
              style={{ width: `${(lessonsReadCount / lessonsCount) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-text-muted">{lessonsReadCount}/{lessonsCount}</span>
          {allLessonsRead && <span className="text-xs text-accent-blue font-semibold">✓ Tout lu</span>}
        </div>
        {projects.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted w-28 shrink-0">🚀 Projets</span>
            <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden max-w-xs">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(projDone / projects.length) * 100}%`,
                  background: `linear-gradient(90deg, ${mod.colorHex}, ${mod.colorHex}99)`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-text-muted">{projDone}/{projects.length}</span>
            {moduleComplete && <span className="text-xs text-accent-green font-semibold">✓ Complété</span>}
          </div>
        )}
        {projects.length === 0 && allLessonsRead && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-accent-green font-semibold">✓ Module complété — tout lu</span>
          </div>
        )}
      </div>

      {/* Lesson tabs */}
      <div className="card p-1 flex gap-1 mb-6 overflow-x-auto">
        {mod.lessons.map((l, i) => {
          const read = isLessonRead(moduleId, i);
          return (
            <button
              key={i}
              onClick={() => setActiveLesson(i)}
              className={`flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeLesson === i ? '' : 'text-text-muted hover:text-text-secondary'
              }`}
              style={activeLesson === i ? { background: `${mod.colorHex}15`, color: mod.colorHex } : {}}
            >
              {read ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3FA7D6" strokeWidth="3" className="shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="text-xs">📖</span>
              )}
              <span className="truncate">{l.title}</span>
            </button>
          );
        })}
      </div>

      {/* Lesson content */}
      <div className="card p-6 sm:p-8 mb-6 animate-fade-in" key={`lesson-${activeLesson}`}>
        <MarkdownRenderer text={lesson.content} />

        {lesson.links?.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-surface-0 border border-surface-3/40">
            <p className="text-xs font-semibold text-text-muted mb-3">🔗 Ressources & Documentation</p>
            <div className="flex flex-col gap-2">
              {lesson.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>↗</span> {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* J'ai lu button */}
        <div className="mt-8 pt-6 border-t border-surface-3/30 flex justify-between items-center">
          <span className="text-xs text-text-muted">Partie {activeLesson + 1} / {lessonsCount}</span>
          {isLessonRead(moduleId, activeLesson) ? (
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border"
              style={{ color: mod.colorHex, borderColor: `${mod.colorHex}40`, background: `${mod.colorHex}10` }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Partie lue
            </span>
          ) : (
            <button
              onClick={() => markLessonRead(moduleId, activeLesson)}
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: mod.colorHex }}
            >
              ✓ J'ai lu cette partie
            </button>
          )}
        </div>
      </div>

      {/* Info banner quand toutes les parties pas lues */}
      {projects.length > 0 && !allLessonsRead && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-accent-blue/20 bg-accent-blue/5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3FA7D6" strokeWidth="2" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-accent-blue">
            <strong>{lessonsReadCount}/{lessonsCount} parties lues.</strong>
            {' '}Lis et valide toutes les parties théoriques pour débloquer les projets et valider ce module.
          </p>
        </div>
      )}

      {/* Mini-projects */}
      {projects.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl text-text-primary mb-1">🚀 Mini-projets métier</h2>
          <p className="text-sm text-text-muted mb-6">
            Applique les concepts sur un cas réel (startup MonitAI). Réalise chaque projet sur ta machine, puis marque-le comme terminé.
          </p>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <MiniProject
                key={i}
                project={project}
                projectIndex={i}
                moduleColorHex={mod.colorHex}
                alreadyDone={isExerciseComplete(moduleId, i)}
                allLessonsRead={allLessonsRead}
                onComplete={() => completeExercise(moduleId, i)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Module nav */}
      <div className="flex justify-between items-center pt-6 border-t border-surface-3/30">
        {prevModule ? (
          <button onClick={() => navigate(`/devops/module/${prevModule.id}`)} className="btn-secondary text-sm">
            ← {prevModule.title}
          </button>
        ) : <div />}
        {nextModule ? (
          <button onClick={() => navigate(`/devops/module/${nextModule.id}`)} className="btn-primary text-sm">
            {nextModule.title} →
          </button>
        ) : (
          <Link to="/devops" className="btn-primary text-sm">🎉 Parcours terminé !</Link>
        )}
      </div>
    </div>
  );
}
