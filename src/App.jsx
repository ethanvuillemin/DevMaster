import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import ModulePage from './pages/ModulePage';
import Cheatsheet from './pages/Cheatsheet';
import CICDRoadmap from './pages/CICDRoadmap';
import CICDModulePage from './pages/CICDModulePage';

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
          <Route path="/cheatsheet" element={<Cheatsheet />} />
          {/* Legacy routes */}
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/module/:id" element={<ModulePage />} />
          {/* CI/CD track */}
          <Route path="/cicd" element={<CICDRoadmap />} />
          <Route path="/cicd/module/:id" element={<CICDModulePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
