import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export default function MiniProject({
  project,
  projectIndex,
  moduleColorHex = '#59CD90',
  alreadyDone,
  allLessonsRead,
  onComplete,
}) {
  const [showStarter, setShowStarter] = useState(false);

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        alreadyDone
          ? 'border-accent-green/40 bg-accent-green/5'
          : 'border-surface-3/60 bg-surface-1'
      }`}
    >
      {/* Header band */}
      <div
        className="px-5 py-3 flex items-center gap-3 flex-wrap"
        style={{ background: `${moduleColorHex}12`, borderBottom: `1px solid ${moduleColorHex}20` }}
      >
        <span className="text-xl">{project.sector?.split(' ')[0] ?? '📋'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Projet {projectIndex + 1}
            </span>
            {project.connectedFrom && (
              <span
                className="text-xs px-2 py-0.5 rounded-full border font-medium"
                style={{ borderColor: `${moduleColorHex}40`, color: moduleColorHex, background: `${moduleColorHex}10` }}
              >
                🔗 Suite de « {project.connectedFrom} »
              </span>
            )}
            {project.connectedTo && (
              <span className="text-xs px-2 py-0.5 rounded-full border border-surface-3/50 text-text-muted">
                → continue en « {project.connectedTo} »
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-base sm:text-lg text-text-primary leading-tight">
            {project.title}
          </h3>
        </div>
        {alreadyDone && (
          <span className="text-xs font-semibold text-accent-green flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Terminé
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Context */}
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">📋 Contexte métier</p>
          <p className="text-sm text-text-secondary leading-relaxed">{project.context}</p>
        </div>

        {/* Objective */}
        <div className="p-3 rounded-xl border" style={{ background: `${moduleColorHex}08`, borderColor: `${moduleColorHex}25` }}>
          <p className="text-xs font-semibold text-text-muted mb-1">🎯 Objectif</p>
          <p className="text-sm text-text-primary font-medium">{project.objective}</p>
        </div>

        {/* Dataset (optionnel — absent sur les tracks piscine) */}
        {project.dataset && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-text-muted">📦 Dataset :</span>
            <a
              href={project.dataset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue/70 transition-colors border border-accent-blue/25 rounded-lg px-3 py-1 bg-accent-blue/5 hover:bg-accent-blue/10"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {project.dataset.label}
            </a>
          </div>
        )}

        {/* Skills */}
        {project.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-lg bg-surface-2 text-text-secondary border border-surface-3/50 font-mono"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Starter code (collapsible) */}
        {project.starter && (
          <div>
            <button
              onClick={() => setShowStarter((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform ${showStarter ? 'rotate-90' : ''}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Code de démarrage Python
            </button>
            {showStarter && (
              <div className="mt-3">
                <MarkdownRenderer text={project.starter} />
              </div>
            )}
          </div>
        )}

        {/* Complete button */}
        <div className="pt-2 border-t border-surface-3/30">
          {alreadyDone ? (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Projet terminé
            </span>
          ) : !allLessonsRead ? (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Lis toutes les parties du cours pour débloquer les projets
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="btn-primary text-sm"
              style={{ background: moduleColorHex }}
            >
              ✅ Marquer ce projet comme terminé
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
