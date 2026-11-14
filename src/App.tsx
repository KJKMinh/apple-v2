import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SpecCompare from './components/SpecCompare';
import Entertainment from './components/Entertainment';
import Footer from './components/Footer';
import { useScrollReveal } from './components/useScrollReveal';

export function App() {
  const [darkMode, setDarkMode] = useState(false);

  useScrollReveal();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#0071e3] selection:text-white ${
        darkMode ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-white text-ink'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-apple-blue focus:px-3 focus:py-1.5 focus:text-white"
      >
        Skip to Content
      </a>
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
      <main id="main" className="pt-11">
        <Hero darkMode={darkMode} />
        <BentoGrid darkMode={darkMode} />
        <SpecCompare darkMode={darkMode} />
        <Entertainment darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
