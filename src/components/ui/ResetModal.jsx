import { useEffect, useRef } from 'react';

/**
 * Modale de confirmation pour réinitialiser la progression.
 *
 * Props:
 *   open      — boolean, afficher ou non
 *   onConfirm — callback si l'utilisateur confirme
 *   onCancel  — callback si l'utilisateur annule
 */
export default function ResetModal({ open, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  // Fermer avec Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onCancel]);

  // Empêcher le scroll du body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-surface-1 border border-surface-3 rounded-2xl
                   shadow-2xl shadow-black/40 max-w-sm w-full p-6 animate-slide-up"
      >
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="font-display font-bold text-lg text-text-primary mb-2">
            Réinitialiser la progression ?
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Tous vos exercices complétés seront effacés.
            Cette action est <span className="text-accent-red font-semibold">irréversible</span>.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm
                       bg-surface-2 text-text-secondary border border-surface-4
                       hover:text-text-primary transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl font-display font-bold text-sm
                       bg-red-500/20 text-accent-red border border-red-500/30
                       hover:bg-red-500/30 transition-colors"
          >
            Tout effacer
          </button>
        </div>
      </div>
    </div>
  );
}
