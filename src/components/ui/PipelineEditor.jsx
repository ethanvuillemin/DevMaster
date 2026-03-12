import { useState, useEffect, useRef } from 'react';

/**
 * PipelineEditor — Éditeur YAML/Groovy avec validation pour les exercices CI/CD.
 *
 * Props:
 *   exercise    — { title, scenario, objectives, hints[], solution, starterCode, validate }
 *   alreadyDone — boolean
 *   onComplete  — callback validation
 *   onNext      — callback bouton suivant
 *   nextLabel   — texte du bouton
 */
export default function PipelineEditor({
  exercise, alreadyDone = false, onComplete, onNext, nextLabel,
}) {
  const [code, setCode] = useState('');
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(alreadyDone);
  const [justCompleted, setJustCompleted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const textareaRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    setCode(exercise?.starterCode || '');
    setHintIndex(-1);
    setShowSolution(false);
    setCompleted(alreadyDone);
    setJustCompleted(false);
    setValidationError('');
  }, [exercise?.title, alreadyDone]);

  useEffect(() => {
    if (justCompleted && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [justCompleted]);

  const handleValidate = () => {
    if (!exercise || completed) return;
    try {
      if (exercise.validate(code)) {
        setCompleted(true);
        setJustCompleted(true);
        setValidationError('');
        onComplete?.();
      } else {
        setValidationError('Le pipeline ne remplit pas encore tous les objectifs. Vérifiez les éléments manquants.');
      }
    } catch (e) {
      setValidationError('Erreur de syntaxe dans votre configuration.');
    }
  };

  const handleKeyDown = (e) => {
    // Tab inserts 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      });
    }
  };

  const allHintsUsed = exercise ? hintIndex >= exercise.hints.length - 1 : false;
  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 15);

  // Parse simple pipeline stages from the YAML for visualization
  const stages = extractStages(code);

  return (
    <div className="space-y-0">
      <div className="rounded-xl overflow-hidden border border-surface-3/60 bg-surface-0 shadow-xl shadow-black/30">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-2 border-b border-surface-3/40">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-text-muted select-none font-mono">pipeline-editor</span>
          {completed && (
            <span className="ml-auto text-xs text-accent-green font-semibold animate-fade-in">✓ Validé</span>
          )}
        </div>

        {/* Exercise brief */}
        {exercise && (
          <div className="px-4 py-3 bg-surface-1 border-b border-surface-3/30">
            <p className="text-xs text-text-muted mb-1.5">
              📋 <span className="text-text-secondary font-semibold">{exercise.title}</span>
            </p>
            <p className="text-sm text-text-primary leading-relaxed mb-3">{exercise.scenario}</p>

            <div className="space-y-1 mb-3">
              <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold">Objectifs :</p>
              {exercise.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className={`mt-0.5 text-xs ${completed ? 'text-accent-green' : 'text-text-muted'}`}>
                    {completed ? '✓' : '○'}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>

            {/* Hints */}
            {!completed && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHintIndex((p) => Math.min(p + 1, exercise.hints.length - 1))}
                    disabled={allHintsUsed}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      allHintsUsed ? 'border-surface-3 text-text-muted/40 cursor-not-allowed'
                        : 'border-surface-4 text-text-muted hover:text-accent-yellow hover:border-accent-yellow/30'
                    }`}
                  >
                    💡 Indice {hintIndex + 2 <= exercise.hints.length
                      ? `(${hintIndex + 2}/${exercise.hints.length})` : '(tous)'}
                  </button>
                  {allHintsUsed && !showSolution && (
                    <button onClick={() => setShowSolution(true)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-accent-red/30 text-accent-red/70 hover:text-accent-red transition-all">
                      🔓 Voir la solution
                    </button>
                  )}
                </div>

                {hintIndex >= 0 && (
                  <div className="space-y-1.5 animate-fade-in">
                    {exercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                      <div key={i} className="flex gap-2 text-xs p-2 rounded-lg bg-amber-950/20 border border-amber-900/20">
                        <span className="text-accent-yellow shrink-0">💡</span>
                        <span className="text-accent-yellow/90">{hint}</span>
                      </div>
                    ))}
                  </div>
                )}

                {showSolution && (
                  <div className="animate-slide-up p-3 rounded-lg bg-red-950/20 border border-red-900/30">
                    <p className="text-[11px] text-accent-red/70 uppercase tracking-wider font-bold mb-2">Solution :</p>
                    <pre className="text-xs text-text-primary bg-surface-0/50 p-3 rounded overflow-x-auto font-mono leading-relaxed">
                      {exercise.solution}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {alreadyDone && !justCompleted && (
              <p className="mt-2 text-xs text-accent-green/70 italic">Déjà complété.</p>
            )}
          </div>
        )}

        {/* Pipeline visualizer */}
        {stages.length > 0 && (
          <div className="px-4 py-3 border-b border-surface-3/30 bg-surface-1/50 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-0">
              {stages.map((stage, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  {i > 0 && (
                    <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0">
                      <path d="M0 6 L14 6 M10 2 L16 6 L10 10" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    stage.active
                      ? 'bg-accent-green/10 border-accent-green/30 text-accent-green'
                      : 'bg-surface-2 border-surface-3 text-text-muted'
                  }`}>
                    {stage.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="flex">
          {/* Line numbers */}
          <div className="py-3 px-2 bg-surface-2/50 text-right select-none border-r border-surface-3/30 min-w-[3rem]">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="text-[11px] leading-6 text-text-muted/40 font-mono">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code area */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => { setCode(e.target.value); setValidationError(''); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent p-3 text-sm text-text-primary font-mono
                       leading-6 resize-none outline-none min-h-[360px]
                       placeholder:text-text-muted/30 caret-accent-green"
            placeholder="Écrivez votre pipeline ici..."
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
        </div>

        {/* Action bar */}
        <div className="px-4 py-3 bg-surface-2 border-t border-surface-3/40 flex items-center justify-between gap-3">
          <div className="flex-1">
            {validationError && (
              <p className="text-xs text-accent-red animate-fade-in">{validationError}</p>
            )}
          </div>
          <button
            onClick={handleValidate}
            disabled={completed}
            className={`px-5 py-2 rounded-lg text-sm font-display font-bold transition-all ${
              completed
                ? 'bg-accent-green/20 text-accent-green border border-accent-green/30 cursor-default'
                : 'bg-gradient-to-r from-accent-green to-emerald-500 text-surface-0 shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5'
            }`}
          >
            {completed ? '✓ Validé' : '▶ Valider le pipeline'}
          </button>
        </div>
      </div>

      {/* Success banner */}
      {completed && onNext && (
        <div ref={bannerRef}
          className={`mt-4 p-4 rounded-xl border animate-slide-up ${
            justCompleted ? 'bg-accent-green/[0.08] border-accent-green/30' : 'bg-surface-1 border-surface-3/50'
          }`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{justCompleted ? '🎉' : '✅'}</span>
              <div>
                <p className="text-sm font-display font-bold text-text-primary">
                  {justCompleted ? 'Pipeline validé !' : 'Exercice déjà complété'}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {justCompleted ? 'Progression sauvegardée.' : 'Vous pouvez le refaire ou continuer.'}
                </p>
              </div>
            </div>
            <button onClick={onNext} className="btn-primary shrink-0 text-sm">
              {nextLabel || 'Exercice suivant →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Extrait les stages/jobs du YAML pour la visualisation.
 */
function extractStages(code) {
  const stages = [];
  // GitHub Actions: jobs
  const jobMatches = code.matchAll(/^\s{2}(\w[\w-]*):\s*$/gm);
  let inJobs = false;
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^jobs:\s*$/)) { inJobs = true; continue; }
    if (inJobs && lines[i].match(/^\s{2}[\w][\w-]*:\s*$/)) {
      const name = lines[i].trim().replace(':', '');
      stages.push({ name, active: true });
    }
    if (inJobs && lines[i].match(/^\S/) && !lines[i].match(/^jobs:/)) inJobs = false;
  }
  // GitLab CI: stages
  if (stages.length === 0) {
    const stagesMatch = code.match(/stages:\s*\n((?:\s+-\s+\S+\n?)+)/);
    if (stagesMatch) {
      const stageLines = stagesMatch[1].matchAll(/^\s+-\s+(\S+)/gm);
      for (const m of stageLines) stages.push({ name: m[1], active: true });
    }
  }
  // Jenkins: stage('...')
  if (stages.length === 0) {
    const jenkinsMatches = code.matchAll(/stage\s*\(\s*['"](.+?)['"]\s*\)/g);
    for (const m of jenkinsMatches) stages.push({ name: m[1], active: true });
  }
  return stages;
}
