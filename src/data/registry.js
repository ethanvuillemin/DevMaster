/**
 * Registre central des modules.
 *
 * Pour ajouter un nouveau track :
 *   1. Créer  src/data/monTrackModules.js  (exporter un tableau)
 *   2. Ajouter le track dans  src/data/tracks.js
 *   3. Ajouter une ligne ici  monTrack: MON_TRACK_MODULES
 *   4. Ajouter les routes dans  src/App.jsx  (utiliser TrackRoadmap + la bonne ModulePage)
 */

import MODULES        from './modules';
import CICD_MODULES   from './cicdModules';
import DOCKER_MODULES from './dockerModules';
import ML_MODULES     from './mlModules';

const MODULE_REGISTRY = {
  git:    MODULES,
  cicd:   CICD_MODULES,
  docker: DOCKER_MODULES,
  ml:     ML_MODULES,
};

export default MODULE_REGISTRY;
