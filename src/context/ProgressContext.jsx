import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import MODULES from '../data/modules';
import CICD_MODULES from '../data/cicdModules';
import TRACKS from '../data/tracks';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'devmaster-progress';
const ALL_MODULES = [...MODULES, ...CICD_MODULES];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { exercises: {}, capstones: {} };
    const p = JSON.parse(raw);
    return {
      exercises: p.exercises || p || {},
      capstones: p.capstones || {},
    };
  } catch { return { exercises: {}, capstones: {} }; }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

/**
 * Returns which track a module belongs to by checking ID ranges.
 */
function getTrackForModule(moduleId) {
  for (const track of TRACKS) {
    const [min, max] = track.moduleIdRange;
    if (moduleId >= min && moduleId <= max) return track.id;
  }
  return null;
}

/**
 * Returns modules for a given track ID.
 */
function getModulesForTrack(trackId) {
  const track = TRACKS.find((t) => t.id === trackId);
  if (!track) return [];
  const [min, max] = track.moduleIdRange;
  return ALL_MODULES.filter((m) => m.id >= min && m.id <= max);
}

export function ProgressProvider({ children }) {
  const [data, setData] = useState(load);

  const completedMap = data.exercises;
  const capstonesMap = data.capstones;

  // ── Exercise completion ───────────────────────
  const completeExercise = useCallback((moduleId, exerciseIndex) => {
    setData((prev) => {
      const key = `${moduleId}-${exerciseIndex}`;
      if (prev.exercises[key]) return prev;
      const next = { ...prev, exercises: { ...prev.exercises, [key]: true } };
      save(next);
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

  // ── Capstone completion ───────────────────────
  const completeCapstone = useCallback((trackId) => {
    setData((prev) => {
      if (prev.capstones[trackId]) return prev;
      const next = { ...prev, capstones: { ...prev.capstones, [trackId]: true } };
      save(next);
      return next;
    });
  }, []);

  const isCapstoneComplete = useCallback(
    (trackId) => !!capstonesMap[trackId],
    [capstonesMap]
  );

  // ── Next exercise (track-scoped) ──────────────
  const getNextExercise = useCallback(
    (currentModuleId, currentExerciseIndex) => {
      const trackId = getTrackForModule(currentModuleId);
      const trackModules = getModulesForTrack(trackId);
      const mod = trackModules.find((m) => m.id === currentModuleId);
      if (!mod?.exercises) return null;

      const nextIdx = currentExerciseIndex + 1;
      if (nextIdx < mod.exercises.length) {
        return { moduleId: currentModuleId, exerciseIndex: nextIdx, moduleDone: false, allDone: false };
      }

      const curIdx = trackModules.findIndex((m) => m.id === currentModuleId);
      for (let i = curIdx + 1; i < trackModules.length; i++) {
        if (trackModules[i].exercises?.length > 0) {
          return { moduleId: trackModules[i].id, exerciseIndex: 0, moduleDone: true, allDone: false };
        }
      }

      return { moduleId: null, exerciseIndex: null, moduleDone: true, allDone: true };
    },
    []
  );

  // ── Per-track stats ───────────────────────────
  const getTrackStats = useCallback(
    (trackId) => {
      const modules = getModulesForTrack(trackId);
      const totalExercises = modules.reduce((s, m) => s + (m.exercises?.length || 0), 0);
      let totalCompleted = 0;
      modules.forEach((m) => {
        (m.exercises || []).forEach((_, i) => {
          if (completedMap[`${m.id}-${i}`]) totalCompleted++;
        });
      });
      const percentage = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;
      const capstone = !!capstonesMap[trackId];
      return { totalExercises, totalCompleted, percentage, capstone };
    },
    [completedMap, capstonesMap]
  );

  // ── Global stats ──────────────────────────────
  const stats = useMemo(() => {
    const totalExercises = ALL_MODULES.reduce((s, m) => s + (m.exercises?.length || 0), 0);
    let totalCompleted = 0;
    ALL_MODULES.forEach((m) => {
      (m.exercises || []).forEach((_, i) => {
        if (completedMap[`${m.id}-${i}`]) totalCompleted++;
      });
    });
    const percentage = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;
    return { totalExercises, totalCompleted, percentage };
  }, [completedMap]);

  // ── Reset (all or per-track) ──────────────────
  const resetProgress = useCallback((trackId = null) => {
    if (!trackId) {
      // Reset everything
      setData({ exercises: {}, capstones: {} });
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }
    // Reset specific track
    const modules = getModulesForTrack(trackId);
    setData((prev) => {
      const newEx = { ...prev.exercises };
      modules.forEach((m) => {
        (m.exercises || []).forEach((_, i) => { delete newEx[`${m.id}-${i}`]; });
      });
      const newCap = { ...prev.capstones };
      delete newCap[trackId];
      const next = { exercises: newEx, capstones: newCap };
      save(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      completeExercise, isExerciseComplete, isModuleComplete,
      completeCapstone, isCapstoneComplete,
      getNextExercise, getTrackStats,
      resetProgress, stats,
    }),
    [completeExercise, isExerciseComplete, isModuleComplete,
     completeCapstone, isCapstoneComplete,
     getNextExercise, getTrackStats, resetProgress, stats]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
