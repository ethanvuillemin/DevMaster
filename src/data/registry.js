/**
 * REGISTRE CENTRAL — source unique de vérité pour tous les tracks.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  Pour ajouter un nouveau track, modifier UNIQUEMENT ce fichier: │
 * │                                                                 │
 * │  1. Importer les modules  →  import X_MODULES from './xModules' │
 * │  2. Importer les projets  →  import X_PROJECTS from './xProjects'│
 * │     (si les exercices sont dans une fichier séparé)             │
 * │  3. Ajouter une entrée dans TRACK_DATA ci-dessous               │
 * │  4. Ajouter la config track dans src/data/tracks.js             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Deux patterns de stockage des exercices sont supportés :
 *   A) Embarqués dans le module → { exercises: [...] }  (Git, CICD, Docker, ML)
 *   B) Fichier séparé          → projects: { [moduleId]: [...] }  (DL, GenAI)
 */

import MODULES        from './modules';
import CICD_MODULES   from './cicdModules';
import DOCKER_MODULES from './dockerModules';
import ML_MODULES     from './mlModules';
import DL_MODULES     from './dlModules';
import DL_PROJECTS    from './dlProjects';
import GENAI_MODULES  from './genai/index.js';
import GENAI_PROJECTS from './genaiProjects';
import BASICS_MODULES from './basicsModules';
import PYTHON_MODULES from './pythonModules';

// ─────────────────────────────────────────────────────────────────────
// TRACK_DATA — ajouter un track ici (une seule entrée suffit)
// ─────────────────────────────────────────────────────────────────────
const TRACK_DATA = {
  basics: { modules: BASICS_MODULES, projects: {} },
  python: { modules: PYTHON_MODULES, projects: {} },
  git:    { modules: MODULES,        projects: {} },
  cicd:   { modules: CICD_MODULES,   projects: {} },
  docker: { modules: DOCKER_MODULES, projects: {} },
  ml:     { modules: ML_MODULES,     projects: {} },
  dl:     { modules: DL_MODULES,     projects: DL_PROJECTS },
  genai:  { modules: GENAI_MODULES,  projects: GENAI_PROJECTS },
};
// ─────────────────────────────────────────────────────────────────────

/** Modules indexés par trackId — utilisé par TrackRoadmap */
export const MODULE_REGISTRY = Object.fromEntries(
  Object.entries(TRACK_DATA).map(([id, { modules }]) => [id, modules])
);

/** Projets indexés par trackId puis moduleId — utilisé par TrackModulePage */
export const PROJECTS_REGISTRY = Object.fromEntries(
  Object.entries(TRACK_DATA).map(([id, { projects }]) => [id, projects])
);

/** Tous les modules à plat — utilisé par ProgressContext */
export const ALL_MODULES = Object.values(TRACK_DATA).flatMap(({ modules }) => modules);

export default MODULE_REGISTRY;
