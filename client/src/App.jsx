import React, { useState } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CaseStudyModal from './components/CaseStudyModal';
import ProjectArchive from './components/ProjectArchive';
import About from './components/About';
import DSAGrind from './components/DSAGrind';
import Contact from './components/Contact';

function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleOpenCaseStudy = (project) => {
    setSelectedCaseStudy(project);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <div className="min-h-screen text-[#ededed] font-sans antialiased bg-[#0b0c0e] selection:bg-[#f59e0b]/20 selection:text-[#f59e0b]">
      <Background />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Projects onOpenCaseStudy={handleOpenCaseStudy} />
        <ProjectArchive />
        <About />
        <DSAGrind />
        <Contact />
      </main>

      {/* Deep-Dive Case Study Modal / Drawer */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={Boolean(selectedCaseStudy)}
        onClose={handleCloseCaseStudy}
      />
    </div>
  );
}

export default App;
