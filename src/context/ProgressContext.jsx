import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import MODULES from '../data/modules';
import CICD_MODULES from '../data/cicdModules';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'devmaster-progress';
const ALL_MODULES = [...MODULES, ...CICD_MODULES];

/**
 * Lit la progression depuis localStorage.
 * Retourne {} si rien n'existe ou si le JSON est corrompu.
 */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

/**
 * Écrit la progression dans localStorage.
 */
function saveProgress(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage plein ou indisponible — on continue silencieusement
  }
}

/**
 * ProgressProvider — gère toute la progression des exercices.
 *
 * API exposée :
 *   completeExercise(moduleId, exerciseIndex)    → marque comme fait + persiste
 *   isExerciseComplete(moduleId, exerciseIndex)   → boolean
 *   isModuleComplete(moduleId)                    → boolean
 *   getNextExercise(moduleId, exerciseIndex)       → { moduleId, exerciseIndex, moduleDone, allDone } | null
 *   resetProgress()                                → efface tout (localStorage + state)
 *   stats                                          → { totalExercises, totalCompleted, percentage }
 */
export function ProgressProvider({ children }) {
  const [completedMap, setCompletedMap] = useState(loadProgress);

  const completeExercise = useCallback((moduleId, exerciseIndex) => {
    setCompletedMap((prev) => {
      const key = `${moduleId}-${exerciseIndex}`;
      if (prev[key]) return prev;
      const next = { ...prev, [key]: true };
      saveProgress(next);
      return next;
    });
  }, []);

  const isExerciseComplete = useCallback(
    (moduleId, exerciseIndex) => !!completedMap[`${moduleId}-${exerciseIndex}`],
    [completedMap]
  );

  const isModuleComplete = useCallback(
    (moduleId) => {
      const mod = ALL_MODULES.find((m) => m.id === moduleId);
      if (!mod?.exercises?.length) return false;
      return mod.exercises.every((_, i) => completedMap[`${moduleId}-${i}`]);
    },
    [completedMap]
  );

  const getNextExercise = useCallback(
    (currentModuleId, currentExerciseIndex) => {
      const mod = MODULES.find((m) => m.id === currentModuleId);
      if (!mod?.exercises) return null;

      // Prochain exercice dans le même module
      const nextIdx = currentExerciseIndex + 1;
      if (nextIdx < mod.exercises.length) {
        return {
          moduleId: currentModuleId,
          exerciseIndex: nextIdx,
          moduleDone: false,
          allDone: false,
        };
      }

      // Module terminé → prochain module avec des exercices
      const currentModuleIndex = MODULES.findIndex((m) => m.id === currentModuleId);
      for (let i = currentModuleIndex + 1; i < MODULES.length; i++) {
        if (MODULES[i].exercises?.length > 0) {
          return {
            moduleId: MODULES[i].id,
            exerciseIndex: 0,
            moduleDone: true,
            allDone: false,
          };
        }
      }

      // Tout est terminé
      return { moduleId: null, exerciseIndex: null, moduleDone: true, allDone: true };
    },
    []
  );

  const resetProgress = useCallback(() => {
    setCompletedMap({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silencieux
    }
  }, []);

  const stats = useMemo(() => {
    const totalExercises = ALL_MODULES.reduce(
      (sum, m) => sum + (m.exercises?.length || 0),
      0
    );
    const totalCompleted = Object.keys(completedMap).length;
    const percentage =
      totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;
    return { totalExercises, totalCompleted, percentage };
  }, [completedMap]);

  const value = useMemo(
    () => ({
      completeExercise,
      isExerciseComplete,
      isModuleComplete,
      getNextExercise,
      resetProgress,
      stats,
    }),
    [completeExercise, isExerciseComplete, isModuleComplete, getNextExercise, resetProgress, stats]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
