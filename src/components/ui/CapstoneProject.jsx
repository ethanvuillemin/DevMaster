import { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import MarkdownRenderer from './MarkdownRenderer';

/**
 * Projet capstone de fin de parcours.
 *
 * Props:
 *   trackId   — 'git' | 'cicd'
 *   capstone  — { title, scenario, tasks[], skills[], links[] }
 */
export default function CapstoneProject({ trackId, capstone }) {
  const { isCapstoneComplete, completeCapstone } = useProgress();
  const done = isCapstoneComplete(trackId);
  const [expandedTask, setExpandedTask] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleTask = (idx) => {
    setCheckedTasks((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      // Auto-complete capstone when all tasks checked
      const allChecked = capstone.tasks.every((_, i) => next[i]);
      if (allChecked && !done) completeCapstone(trackId);
      return next;
    });
  };

  const allChecked = capstone.tasks.every((_, i) => checkedTasks[i]);
  const checkedCount = capstone.tasks.filter((_, i) => checkedTasks[i]).length;

  return (
    <section className="mt-12 animate-fade-in">
      {/* Header */}
      <div className="card p-6 border-2 border-accent-yellow/20 bg-gradient-to-br from-yellow-500/[0.04] to-transparent mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center text-3xl shrink-0">
            🏆
          </div>
          <div className="flex-1">
            <h2 className="font-display font-extrabold text-xl text-text-primary tracking-tight mb-1">
              {capstone.title}
            </h2>
            {done && (
              <span className="inline-flex items-center gap-1 text-xs text-accent-green font-semibold bg-accent-green/10 px-2 py-0.5 rounded-md">
                ✓ Projet complété
              </span>
            )}
          </div>
        </div>

        <MarkdownRenderer text={capstone.scenario} />

        {/* Skills covered */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {capstone.skills.map((skill) => (
            <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-accent-yellow border border-accent-yellow/20 font-mono">
              {skill}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden max-w-xs">
            <div className="h-full rounded-full bg-gradient-to-r from-accent-yellow to-amber-400 transition-all duration-500"
              style={{ width: `${(checkedCount / capstone.tasks.length) * 100}%` }} />
          </div>
          <span className="text-xs font-mono text-text-muted">{checkedCount}/{capstone.tasks.length} étapes</span>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {capstone.tasks.map((task, idx) => {
          const isExpanded = expandedTask === idx;
          const isChecked = checkedTasks[idx] || done;

          return (
            <div key={idx} className={`card overflow-hidden transition-all duration-300 ${
              isChecked ? 'border-accent-green/20' : ''
            }`}>
              {/* Task header */}
              <button
                onClick={() => setExpandedTask(isExpanded ? -1 : idx)}
                className="w-full px-5 py-4 flex items-center gap-3 text-left"
              >
                {/* Checkbox */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleTask(idx); }}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-accent-green border-accent-green text-surface-0'
                      : 'border-surface-4 hover:border-accent-green/50'
                  }`}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-display font-bold text-sm ${
                    isChecked ? 'text-accent-green' : 'text-text-primary'
                  }`}>
                    {task.title}
                  </h3>
                </div>

                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`shrink-0 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {/* Task content (expandable) */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-surface-3/30 pt-4 animate-fade-in">
                  <MarkdownRenderer text={task.instructions} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion banner */}
      {(allChecked || done) && (
        <div className="mt-6 p-5 rounded-xl border-2 border-accent-green/30 bg-accent-green/[0.06] text-center animate-slide-up">
          <span className="text-4xl mb-3 block">🎉</span>
          <h3 className="font-display font-extrabold text-lg text-text-primary mb-2">
            Félicitations ! Projet terminé !
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Vous avez complété tout le parcours. Vous maîtrisez maintenant les compétences
            nécessaires pour travailler en équipe sur de vrais projets professionnels.
          </p>
        </div>
      )}

      {/* Resources */}
      {capstone.links?.length > 0 && (
        <div className="mt-6 card p-5">
          <p className="text-xs font-semibold text-text-muted mb-3">🔗 Ressources pour aller plus loin</p>
          <div className="flex flex-col gap-2">
            {capstone.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors inline-flex items-center gap-1.5">
                <span>↗</span> {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
