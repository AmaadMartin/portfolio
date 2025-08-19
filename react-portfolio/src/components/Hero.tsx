import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero: React.FC = () => {
  const GithubIcon = FaGithub as unknown as React.FC<{ className?: string }>;
  const LinkedinIcon = FaLinkedin as unknown as React.FC<{ className?: string }>;
  const TwitterIcon = FaTwitter as unknown as React.FC<{ className?: string }>;

  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="container">
        <div className="hero-row">
          {/* Left: Avatar and intro text */}
          <div className="hero-left flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-lg glass-effect overflow-hidden" style={{ width: '6rem', height: '6rem' }}>
                <img src="/images/me.png" alt="Amaad Martin" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-left"
            >
              <span className="gradient-text">Amaad Martin</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full flex flex-col gap-4 items-start">
              <p className="text-lg max-w-xl text-left" style={{ color: '#fff' }}>Full-Stack Developer & AI Builder</p>
              <div className="flex gap-4">
                <a href="https://github.com/amaadmartin" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover-text-accent"><GithubIcon /></a>
                <a href="https://linkedin.com/in/amaadmartin" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover-text-accent"><LinkedinIcon /></a>
                <a href="https://twitter.com/amaadmartin" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover-text-accent"><TwitterIcon /></a>
              </div>
            </motion.div>
          </div>

          {/* Right: DoidVerse card */}
          <motion.div
            className="hero-right glass-effect rounded-2xl p-6 min-h-[10rem] md:min-h-[14rem] flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-bold gradient-text">DoidVerse</h2>
              <p className="text-gray-300 mt-2 max-w-prose">
                Evolution simulator with emergent behavior. Cellular-automata worlds, neural-network organisms, and NEAT-driven learning.
              </p>
            </div>
            <div className="w-full grow rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-gray-300">Live simulation space</span>
            </div>
            <div className="pt-3 text-right">
              <a href="https://amaadmartin.github.io/doidVerse/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover-text-accent">Open full demo</a>
            </div>
            <iframe
              src="exit"
              style={{ width: '100%', height: '40vh', border: 0 }}
              allow="clipboard-read; clipboard-write; fullscreen"
              // referrerPolicy="no-referrer"
            ></iframe>
          </motion.div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <a href="/resume.pdf" className="btn btn-glass">Resume</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
