import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import TrackRoadmap from './pages/TrackRoadmap';
import GlobalRoadmap from './pages/GlobalRoadmap';
import ModulePage from './pages/ModulePage';           // Git uniquement (terminal simulé)
import TrackModulePage from './pages/TrackModulePage'; // Tous les autres tracks
import Cheatsheets from './pages/Cheatsheets';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ── Git (page spéciale avec terminal simulé) ──── */}
          <Route path="/git"            element={<TrackRoadmap trackId="git" />} />
          <Route path="/git/module/:id" element={<ModulePage />} />

          {/* ── Tous les autres tracks (route générique) ──── */}
          <Route path="/:trackId"            element={<TrackRoadmap />} />
          <Route path="/:trackId/module/:id" element={<TrackModulePage />} />

          {/* ── Cheatsheets ───────────────────────────────── */}
          <Route path="/cheatsheets" element={<Cheatsheets />} />
          <Route path="/cheatsheet"  element={<Cheatsheets />} />

          {/* ── Roadmap globale ───────────────────────────── */}
          <Route path="/roadmap"    element={<GlobalRoadmap />} />

          {/* ── Legacy ────────────────────────────────────── */}
          <Route path="/module/:id" element={<ModulePage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
