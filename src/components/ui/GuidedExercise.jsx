import { useState, useEffect, useRef } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

/**
 * GuidedExercise — Exercice pratique SANS terminal.
 *
 * L'étudiant réalise l'exercice sur SA propre machine. L'app le guide
 * (scénario + étapes), tout en gardant l'accès aux indices et à la solution.
 * La validation est manuelle : l'étudiant marque l'exercice comme terminé.
 *
 * Props:
 *   exercise    — { title, scenario, steps[], hints[], solution }
 *   alreadyDone — boolean
 *   onComplete  — callback quand l'étudiant marque comme terminé
 *   onNext      — callback bouton suivant
 *   nextLabel   — texte du bouton
 */
export default function GuidedExercise({
  exercise, alreadyDone = false, onComplete, onNext, nextLabel,
}) {
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(alreadyDone);
  const [justCompleted, setJustCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const bannerRef = useRef(null);

  useEffect(() => {
    setHintIndex(-1);
    setShowSolution(false);
    setCompleted(alreadyDone);
    setJustCompleted(false);
    setCopied(false);
  }, [exercise?.title, alreadyDone]);

  useEffect(() => {
    if (justCompleted && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [justCompleted]);

  if (!exercise) return null;

  const allHintsUsed = hintIndex >= exercise.hints.length - 1;

  const handleDone = () => {
    if (completed) return;
    setCompleted(true);
    setJustCompleted(true);
    onComplete?.();
  };

  const copySolution = async () => {
    try {
      await navigator.clipboard.writeText(exercise.solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) { /* clipboard indisponible */ }
  };

  const downloadSolution = () => {
    const slug = exercise.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blob = new Blob([`# Solution : ${exercise.title}\n\n${exercise.solution}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `solution-${slug}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-0">
      <div className="rounded-xl overflow-hidden border border-surface-3/60 bg-surface-1 shadow-xl shadow-black/20">

        {/* En-tête */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border-b border-surface-3/40">
          <span className="text-base">🛠️</span>
          <span className="text-xs text-text-secondary select-none font-semibold">
            Exercice pratique — à réaliser sur ta machine
          </span>
          {completed && (
            <span className="ml-auto text-xs text-accent-green font-semibold animate-fade-in">✓ Terminé</span>
          )}
        </div>

        <div className="px-4 sm:px-5 py-4">
          {/* Titre + scénario */}
          <p className="text-xs text-text-muted mb-1.5">
            📋 <span className="text-text-secondary font-semibold">{exercise.title}</span>
          </p>
          <p className="text-sm text-text-primary leading-relaxed mb-4">{exercise.scenario}</p>

          {/* Étapes à réaliser */}
          <div className="rounded-lg bg-surface-0 border border-surface-3/40 p-4 mb-4">
            <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-2">
              👉 À toi de jouer — sur ton propre ordinateur
            </p>
            <ol className="space-y-2">
              {exercise.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-surface-3 text-text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed [&_code]:bg-surface-3/60 [&_code]:text-accent-blue [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.85em] [&_code]:font-mono">
                    <InlineMd text={step} />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Indices */}
          <div className="space-y-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
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
              {!showSolution && (
                <button onClick={() => setShowSolution(true)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-accent-blue/30 text-accent-blue/80 hover:text-accent-blue transition-all">
                  🔓 Voir la solution
                </button>
              )}
            </div>

            {hintIndex >= 0 && (
              <div className="space-y-1.5 animate-fade-in">
                {exercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                  <div key={i} className="flex gap-2 text-xs p-2 rounded-lg bg-amber-950/20 border border-amber-900/20">
                    <span className="text-accent-yellow shrink-0">💡</span>
                    <span className="text-accent-yellow/90 [&_code]:bg-surface-3/60 [&_code]:px-1 [&_code]:rounded [&_code]:font-mono">
                      <InlineMd text={hint} />
                    </span>
                  </div>
                ))}
              </div>
            )}

            {showSolution && (
              <div className="animate-slide-up p-3 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] text-accent-blue/80 uppercase tracking-wider font-bold">Solution de référence :</p>
                  <div className="flex items-center gap-2">
                    <button onClick={copySolution}
                      className="text-[11px] px-2 py-0.5 rounded border border-surface-4 text-text-muted hover:text-text-primary transition-colors">
                      {copied ? '✓ Copié' : '📋 Copier'}
                    </button>
                    <button onClick={downloadSolution}
                      className="text-[11px] px-2 py-0.5 rounded border border-surface-4 text-text-muted hover:text-text-primary transition-colors">
                      📥 Télécharger
                    </button>
                  </div>
                </div>
                <pre className="text-xs text-text-primary bg-surface-0/60 p-3 rounded overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                  {exercise.solution}
                </pre>
                <p className="text-[11px] text-text-muted mt-2 italic">
                  Compare avec ce que tu as fait — il peut y avoir plusieurs façons correctes de faire.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Barre d'action : marquage manuel */}
        <div className="px-4 sm:px-5 py-3 bg-surface-2 border-t border-surface-3/40 flex items-center justify-between gap-3">
          <p className="text-xs text-text-muted hidden sm:block">
            {completed ? 'Bravo, exercice validé.' : 'Une fois fait sur ta machine, marque-le comme terminé.'}
          </p>
          <button
            onClick={handleDone}
            disabled={completed}
            className={`px-5 py-2 rounded-lg text-sm font-display font-bold transition-all ${
              completed
                ? 'bg-accent-green/20 text-accent-green border border-accent-green/30 cursor-default'
                : 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-surface-0 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5'
            }`}
          >
            {completed ? '✓ Terminé' : '✓ J\'ai réussi sur ma machine'}
          </button>
        </div>
      </div>

      {/* Bannière de succès */}
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
                  {justCompleted ? 'Exercice validé !' : 'Exercice déjà complété'}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {justCompleted ? 'Progression sauvegardée.' : 'Tu peux le refaire ou continuer.'}
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
 * Mini-rendu inline : gère `code` et **gras** dans une chaîne courte.
 */
function InlineMd({ text }) {
  const parts = [];
  let rest = text;
  let key = 0;
  while (rest.length > 0) {
    const bold = rest.match(/\*\*(.+?)\*\*/);
    const code = rest.match(/`([^`]+)`/);
    const candidates = [bold, code].filter(Boolean);
    if (candidates.length === 0) { parts.push(rest); break; }
    const first = candidates.reduce((a, b) => (a.index < b.index ? a : b));
    if (first.index > 0) parts.push(rest.slice(0, first.index));
    if (first === bold) parts.push(<strong key={key++} className="text-text-primary font-semibold">{first[1]}</strong>);
    else parts.push(<code key={key++}>{first[1]}</code>);
    rest = rest.slice(first.index + first[0].length);
  }
  return <>{parts}</>;
}
