import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ALL_MODULES, MODULE_REGISTRY } from '../data/registry';
import TRACKS from '../data/tracks';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'devmaster-progress';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { exercises: {}, capstones: {}, readLessons: {} };
    const p = JSON.parse(raw);
    return {
      exercises:   p.exercises   || p || {},
      capstones:   p.capstones   || {},
      readLessons: p.readLessons || {},
    };
  } catch { return { exercises: {}, capstones: {}, readLessons: {} }; }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function getTrackForModule(moduleId) {
  for (const track of TRACKS) {
    const [min, max] = track.moduleIdRange;
    if (moduleId >= min && moduleId <= max) return track.id;
  }
  return null;
}

function getModulesForTrack(trackId) {
  return MODULE_REGISTRY[trackId] || [];
}

export function ProgressProvider({ children }) {
  const [data, setData] = useState(load);

  const completedMap  = data.exercises;
  const capstonesMap  = data.capstones;
  const readLessonsMap = data.readLessons || {};

  // ── Lesson reading ────────────────────────────
  const markLessonRead = useCallback((moduleId, lessonIndex) => {
    setData((prev) => {
      const key = `${moduleId}-lesson-${lessonIndex}`;
      if (prev.readLessons?.[key]) return prev;
      const next = { ...prev, readLessons: { ...(prev.readLessons || {}), [key]: true } };
      save(next);
      return next;
    });
  }, []);

  const isLessonRead = useCallback(
    (moduleId, lessonIndex) => !!readLessonsMap[`${moduleId}-lesson-${lessonIndex}`],
    [readLessonsMap]
  );

  const areAllLessonsRead = useCallback(
    (moduleId) => {
      const mod = ALL_MODULES.find((m) => m.id === moduleId);
      if (!mod?.lessons?.length) return true;
      return mod.lessons.every((_, i) => readLessonsMap[`${moduleId}-lesson-${i}`]);
    },
    [readLessonsMap]
  );

  // ── Exercise / project completion ─────────────
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
      if (!mod) return false;
      // All lessons must be read
      const lessonsOk = areAllLessonsRead(moduleId);
      // All exercises/projects must be done (field can be exercises or projects)
      const exField = mod.projects || mod.exercises;
      if (!exField?.length) return lessonsOk;
      const exOk = exField.every((_, i) => completedMap[`${moduleId}-${i}`]);
      return lessonsOk && exOk;
    },
    [completedMap, areAllLessonsRead]
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
      const exField = mod?.projects || mod?.exercises;
      if (!exField) return null;

      const nextIdx = currentExerciseIndex + 1;
      if (nextIdx < exField.length) {
        return { moduleId: currentModuleId, exerciseIndex: nextIdx, moduleDone: false, allDone: false };
      }

      const curIdx = trackModules.findIndex((m) => m.id === currentModuleId);
      for (let i = curIdx + 1; i < trackModules.length; i++) {
        const nextExField = trackModules[i].projects || trackModules[i].exercises;
        if (nextExField?.length > 0) {
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
      let totalExercises = 0, totalCompleted = 0;
      modules.forEach((m) => {
        const exField = m.projects || m.exercises || [];
        totalExercises += exField.length;
        exField.forEach((_, i) => { if (completedMap[`${m.id}-${i}`]) totalCompleted++; });
      });
      const percentage = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;
      return { totalExercises, totalCompleted, percentage, capstone: !!capstonesMap[trackId] };
    },
    [completedMap, capstonesMap]
  );

  // ── Global stats ──────────────────────────────
  const stats = useMemo(() => {
    let totalExercises = 0, totalCompleted = 0;
    ALL_MODULES.forEach((m) => {
      const exField = m.projects || m.exercises || [];
      totalExercises += exField.length;
      exField.forEach((_, i) => { if (completedMap[`${m.id}-${i}`]) totalCompleted++; });
    });
    const percentage = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;
    return { totalExercises, totalCompleted, percentage };
  }, [completedMap]);

  // ── Reset ─────────────────────────────────────
  const resetProgress = useCallback((trackId = null) => {
    if (!trackId) {
      setData({ exercises: {}, capstones: {}, readLessons: {} });
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return;
    }
    const modules = getModulesForTrack(trackId);
    setData((prev) => {
      const newEx = { ...prev.exercises };
      const newRL = { ...(prev.readLessons || {}) };
      modules.forEach((m) => {
        const exField = m.projects || m.exercises || [];
        exField.forEach((_, i) => { delete newEx[`${m.id}-${i}`]; });
        (m.lessons || []).forEach((_, i) => { delete newRL[`${m.id}-lesson-${i}`]; });
      });
      const newCap = { ...prev.capstones };
      delete newCap[trackId];
      const next = { exercises: newEx, capstones: newCap, readLessons: newRL };
      save(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      completeExercise, isExerciseComplete, isModuleComplete,
      markLessonRead, isLessonRead, areAllLessonsRead,
      completeCapstone, isCapstoneComplete,
      getNextExercise, getTrackStats,
      resetProgress, stats,
    }),
    [completeExercise, isExerciseComplete, isModuleComplete,
     markLessonRead, isLessonRead, areAllLessonsRead,
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
