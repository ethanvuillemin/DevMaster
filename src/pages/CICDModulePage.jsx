import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CICD_MODULES from '../data/cicdModules';
import { useProgress } from '../context/ProgressContext';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import PipelineEditor from '../components/ui/PipelineEditor';

export default function CICDModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = parseInt(id, 10);
  const moduleIndex = CICD_MODULES.findIndex((m) => m.id === moduleId);
  const mod = CICD_MODULES[moduleIndex];

  const [activeLesson, setActiveLesson] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);

  const { completeExercise, isExerciseComplete, isModuleComplete, getNextExercise } = useProgress();

  useEffect(() => {
    setActiveLesson(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mod?.exercises) {
      const first = mod.exercises.findIndex((_, i) => !isExerciseComplete(moduleId, i));
      setActiveExercise(first >= 0 ? first : 0);
    } else setActiveExercise(0);
  }, [moduleId]); // eslint-disable-line

  if (!mod) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted text-lg mb-4">Module introuvable.</p>
        <Link to="/cicd" className="btn-secondary">← Retour à la roadmap CI/CD</Link>
      </div>
    );
  }

  const lesson = mod.lessons[activeLesson];
  const exercise = mod.exercises?.[activeExercise];
  const exerciseAlreadyDone = isExerciseComplete(mod.id, activeExercise);
  const prevModule = moduleIndex > 0 ? CICD_MODULES[moduleIndex - 1] : null;
  const nextModule = moduleIndex < CICD_MODULES.length - 1 ? CICD_MODULES[moduleIndex + 1] : null;

  // Next exercise logic — uses CI/CD module list
  const getNextCICD = useCallback((curModId, curExIdx) => {
    const curMod = CICD_MODULES.find((m) => m.id === curModId);
    if (!curMod?.exercises) return null;
    const nextIdx = curExIdx + 1;
    if (nextIdx < curMod.exercises.length) return { moduleId: curModId, exerciseIndex: nextIdx, moduleDone: false, allDone: false };
    const curIdx = CICD_MODULES.findIndex((m) => m.id === curModId);
    for (let i = curIdx + 1; i < CICD_MODULES.length; i++) {
      if (CICD_MODULES[i].exercises?.length > 0) return { moduleId: CICD_MODULES[i].id, exerciseIndex: 0, moduleDone: true, allDone: false };
    }
    return { moduleId: null, exerciseIndex: null, moduleDone: true, allDone: true };
  }, []);

  const nextInfo = getNextCICD(mod.id, activeExercise);
  let nextLabel = 'Exercice suivant →';
  if (nextInfo?.allDone) nextLabel = '🎉 Parcours terminé !';
  else if (nextInfo?.moduleDone) {
    const nm = CICD_MODULES.find((m) => m.id === nextInfo.moduleId);
    nextLabel = `Module suivant : ${nm?.title} →`;
  }

  const handleNext = useCallback(() => {
    if (!nextInfo) return;
    if (nextInfo.allDone) { navigate('/cicd'); return; }
    if (nextInfo.moduleDone) { navigate(`/cicd/module/${nextInfo.moduleId}`); }
    else { setActiveExercise(nextInfo.exerciseIndex); }
  }, [nextInfo, navigate]);

  const exCount = mod.exercises?.length || 0;
  const exDone = mod.exercises ? mod.exercises.filter((_, i) => isExerciseComplete(mod.id, i)).length : 0;

  return (
    <div className="animate-fade-in">
      <Link to="/cicd" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors mb-6">
        ← Retour à la roadmap CI/CD
      </Link>

      {/* Module header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
          style={{ background: `${mod.colorHex}10`, borderColor: `${mod.colorHex}30` }}>
          {mod.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: mod.colorHex }}>
            {mod.level} — Module {moduleIndex + 1}/{CICD_MODULES.length}
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">{mod.title}</h1>
        </div>
      </div>

      {exCount > 0 && (
        <div className="mb-8 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden max-w-xs">
            <div className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(exDone / exCount) * 100}%`, background: `linear-gradient(90deg, ${mod.colorHex}, ${mod.colorHex}99)` }} />
          </div>
          <span className="text-xs font-mono text-text-muted">{exDone}/{exCount}</span>
          {isModuleComplete(mod.id) && <span className="text-xs text-accent-green font-semibold">✓ Complété</span>}
        </div>
      )}

      {/* Lesson tabs */}
      <div className="card p-1 flex gap-1 mb-6 overflow-x-auto">
        {mod.lessons.map((l, i) => (
          <button key={i} onClick={() => setActiveLesson(i)}
            className={`flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-all whitespace-nowrap ${
              activeLesson === i ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
            style={activeLesson === i ? { background: `${mod.colorHex}15`, color: mod.colorHex } : {}}>
            📖 {l.title}
          </button>
        ))}
      </div>

      {/* Lesson content */}
      <div className="card p-6 sm:p-8 mb-6 animate-fade-in" key={`lesson-${activeLesson}`}>
        <MarkdownRenderer text={lesson.content} />
        {lesson.links?.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-surface-0 border border-surface-3/40">
            <p className="text-xs font-semibold text-text-muted mb-3">🔗 Ressources & Documentation</p>
            <div className="flex flex-col gap-2">
              {lesson.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors inline-flex items-center gap-1.5">
                  <span>↗</span> {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exercises */}
      {mod.exercises?.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl text-text-primary mb-4">🏋️ Exercices — Écriture de pipeline</h2>
          {mod.exercises.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {mod.exercises.map((ex, i) => {
                const done = isExerciseComplete(mod.id, i);
                return (
                  <button key={i} onClick={() => setActiveExercise(i)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      activeExercise === i ? 'bg-surface-3 text-text-primary border-surface-4'
                      : done ? 'border-accent-green/30 text-accent-green hover:bg-accent-green/5'
                      : 'border-surface-3 text-text-muted hover:text-text-secondary hover:border-surface-4'
                    }`}>
                    {done ? '✅' : `${i + 1}.`} {ex.title}
                  </button>
                );
              })}
            </div>
          )}

          <PipelineEditor
            key={`${mod.id}-${activeExercise}`}
            exercise={exercise}
            alreadyDone={exerciseAlreadyDone}
            onComplete={() => completeExercise(mod.id, activeExercise)}
            onNext={handleNext}
            nextLabel={nextLabel}
          />
        </section>
      )}

      {/* Module nav */}
      <div className="flex justify-between items-center pt-6 border-t border-surface-3/30">
        {prevModule ? (
          <button onClick={() => navigate(`/cicd/module/${prevModule.id}`)} className="btn-secondary text-sm">
            ← {prevModule.title}
          </button>
        ) : <div />}
        {nextModule ? (
          <button onClick={() => navigate(`/cicd/module/${nextModule.id}`)} className="btn-primary text-sm">
            {nextModule.title} →
          </button>
        ) : (
          <Link to="/cicd" className="btn-primary text-sm">🎉 Parcours terminé !</Link>
        )}
      </div>
    </div>
  );
}
