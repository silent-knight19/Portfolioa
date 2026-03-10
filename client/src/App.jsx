import React from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DSAGrind from './components/DSAGrind';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-neon-green selection:text-black">
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <DSAGrind />
        <Projects />
        <Contact />
      </div>
      <Background />
    </div>
  );
}

export default App;
