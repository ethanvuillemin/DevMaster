import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import ModulePage from './pages/ModulePage';
import Cheatsheets from './pages/Cheatsheets';
import CICDRoadmap from './pages/CICDRoadmap';
import CICDModulePage from './pages/CICDModulePage';
import DockerRoadmap from './pages/DockerRoadmap';
import DockerModulePage from './pages/DockerModulePage';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Git track */}
          <Route path="/git" element={<Roadmap />} />
          <Route path="/git/module/:id" element={<ModulePage />} />
          {/* Cheatsheets */}
          <Route path="/cheatsheets" element={<Cheatsheets />} />
          <Route path="/cheatsheet" element={<Cheatsheets />} />
          {/* Legacy routes */}
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/module/:id" element={<ModulePage />} />
          {/* CI/CD track */}
          <Route path="/cicd" element={<CICDRoadmap />} />
          <Route path="/cicd/module/:id" element={<CICDModulePage />} />
          {/* Docker track */}
          <Route path="/docker" element={<DockerRoadmap />} />
          <Route path="/docker/module/:id" element={<DockerModulePage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
