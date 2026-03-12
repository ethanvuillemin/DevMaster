import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Terminal interactif avec moteur Git intégré.
 *
 * Props:
 *   exercise    — { title, scenario, objectives, hints[], solution, validate, setup? }
 *   engine      — instance de GitEngine
 *   alreadyDone — boolean (depuis localStorage)
 *   onComplete  — callback validation
 *   onNext      — callback bouton suivant
 *   nextLabel   — texte du bouton
 *   onStateChange — callback quand l'état Git change (pour le visualiseur)
 */
export default function Terminal({
  exercise, engine, alreadyDone = false,
  onComplete, onNext, nextLabel, onStateChange,
}) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(alreadyDone);
  const [justCompleted, setJustCompleted] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const bannerRef = useRef(null);

  // Reset quand l'exercice change
  useEffect(() => {
    setHistory([]);
    setInput('');
    setHintIndex(-1);
    setShowSolution(false);
    setCompleted(alreadyDone);
    setJustCompleted(false);
    setCmdHistory([]);
    setCmdIdx(-1);

    // Setup initial state if exercise has a setup function
    if (exercise?.setup && engine) {
      exercise.setup.forEach((cmd) => engine.execute(cmd));
      onStateChange?.(engine.getState());
    }
  }, [exercise?.title, alreadyDone]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (justCompleted && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [justCompleted]);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    let output = '';
    let isError = false;

    if (engine) {
      const result = engine.execute(trimmed);
      output = result.output;
      isError = result.error;
      onStateChange?.(result.state);
    }

    if (output === '__CLEAR__') {
      setHistory([]);
    } else {
      const newEntry = { cmd: trimmed, output, isError };
      const newHistory = [...history, newEntry];
      setHistory(newHistory);

      // Validate
      if (exercise && !completed && engine) {
        const allCmds = newHistory.map((h) => h.cmd);
        const engineState = engine.getState();
        if (exercise.validate(allCmds, engineState)) {
          setCompleted(true);
          setJustCompleted(true);
          onComplete?.();
        }
      }
    }

    setCmdHistory((prev) => [trimmed, ...prev]);
    setCmdIdx(-1);
    setInput('');
  }, [input, engine, exercise, completed, history, onComplete, onStateChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
        setCmdIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIdx > 0) { setCmdIdx(cmdIdx - 1); setInput(cmdHistory[cmdIdx - 1]); }
      else { setCmdIdx(-1); setInput(''); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = ['git init','git status','git add','git commit','git log','git branch',
        'git checkout','git merge','git push','git pull','git fetch','git clone','git stash',
        'git reset','git revert','git reflog','git tag','git diff','git restore','git remote',
        'git cherry-pick','git rebase','git switch','git blame'];
      const match = cmds.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  }, [handleSubmit, cmdHistory, cmdIdx]);

  const allHintsUsed = exercise ? hintIndex >= exercise.hints.length - 1 : false;

  return (
    <div className="space-y-0">
      <div className="rounded-xl overflow-hidden border border-surface-3/60 bg-surface-0 font-mono shadow-xl shadow-black/30">

        {/* ── Title bar ─────────────────────────────── */}
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-2 border-b border-surface-3/40">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-text-muted select-none">terminal — bash</span>
          {completed && (
            <span className="ml-auto text-xs text-accent-green font-semibold animate-fade-in">✓ Validé</span>
          )}
        </div>

        {/* ── Exercise brief ────────────────────────── */}
        {exercise && (
          <div className="px-4 py-3 bg-surface-1 border-b border-surface-3/30">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-text-muted mb-1.5">
                  📋 <span className="text-text-secondary font-semibold">{exercise.title}</span>
                </p>
                {/* Scénario métier */}
                <p className="text-sm text-text-primary leading-relaxed mb-3">
                  {exercise.scenario}
                </p>
                {/* Objectifs */}
                <div className="space-y-1">
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
              </div>
              {completed && (
                <span className="shrink-0 text-2xl animate-fade-in">
                  {justCompleted ? '🎉' : '✅'}
                </span>
              )}
            </div>

            {/* ── Indices progressifs ─────────────────── */}
            {!completed && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHintIndex((p) => Math.min(p + 1, exercise.hints.length - 1))}
                    disabled={allHintsUsed}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      allHintsUsed
                        ? 'border-surface-3 text-text-muted/40 cursor-not-allowed'
                        : 'border-surface-4 text-text-muted hover:text-accent-yellow hover:border-accent-yellow/30'
                    }`}
                  >
                    💡 Indice {hintIndex + 2 <= exercise.hints.length
                      ? `(${hintIndex + 2}/${exercise.hints.length})`
                      : '(tous utilisés)'}
                  </button>

                  {/* Solution button — only after all hints */}
                  {allHintsUsed && !showSolution && (
                    <button
                      onClick={() => setShowSolution(true)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-accent-red/30 text-accent-red/70
                                 hover:text-accent-red hover:border-accent-red/50 transition-all"
                    >
                      🔓 Voir la solution
                    </button>
                  )}
                </div>

                {/* Displayed hints */}
                {hintIndex >= 0 && (
                  <div className="space-y-1.5 animate-fade-in">
                    {exercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                      <div
                        key={i}
                        className="flex gap-2 text-xs p-2 rounded-lg bg-amber-950/20 border border-amber-900/20"
                      >
                        <span className="text-accent-yellow shrink-0">💡</span>
                        <span className="text-accent-yellow/90">{hint}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Solution reveal */}
                {showSolution && (
                  <div className="animate-slide-up p-3 rounded-lg bg-red-950/20 border border-red-900/30">
                    <p className="text-[11px] text-accent-red/70 uppercase tracking-wider font-bold mb-2">Solution :</p>
                    <div className="space-y-1">
                      {exercise.solution.map((cmd, i) => (
                        <code key={i} className="block text-xs text-text-primary bg-surface-0/50 px-2 py-1 rounded">
                          $ {cmd}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Already done */}
            {alreadyDone && !justCompleted && (
              <p className="mt-3 text-xs text-accent-green/70 italic">
                Déjà complété — vous pouvez le refaire ou passer au suivant.
              </p>
            )}
          </div>
        )}

        {/* ── Terminal output ────────────────────────── */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="px-4 py-3 min-h-[160px] max-h-[400px] overflow-y-auto cursor-text"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="flex gap-2 text-sm">
                <span className="text-accent-green shrink-0">dev@git</span>
                <span className="text-accent-blue shrink-0">~/projet</span>
                <span className="text-text-primary">$ {entry.cmd}</span>
              </div>
              {entry.output && (
                <pre className={`text-[13px] leading-relaxed mt-0.5 whitespace-pre-wrap ${
                  entry.isError ? 'text-accent-red/80' : 'text-text-muted'
                }`}>
                  {entry.output}
                </pre>
              )}
            </div>
          ))}

          <div className="flex gap-2 text-sm items-center">
            <span className="text-accent-green shrink-0">dev@git</span>
            <span className="text-accent-blue shrink-0">~/projet</span>
            <span className="text-text-primary">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-text-primary
                         caret-accent-green font-mono text-sm placeholder:text-text-muted/40"
              placeholder={completed ? 'Exercice terminé !' : 'Tapez une commande...'}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>

      {/* ── Success banner ──────────────────────────── */}
      {completed && onNext && (
        <div
          ref={bannerRef}
          className={`mt-4 p-4 rounded-xl border animate-slide-up ${
            justCompleted
              ? 'bg-accent-green/[0.08] border-accent-green/30'
              : 'bg-surface-1 border-surface-3/50'
          }`}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{justCompleted ? '🎉' : '✅'}</span>
              <div>
                <p className="text-sm font-display font-bold text-text-primary">
                  {justCompleted ? 'Bravo, exercice réussi !' : 'Exercice déjà complété'}
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
