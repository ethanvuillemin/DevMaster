import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import ModulePage from './pages/ModulePage';
import Cheatsheet from './pages/Cheatsheet';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/cheatsheet" element={<Cheatsheet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
