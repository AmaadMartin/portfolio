import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFileAlt } from 'react-icons/fa';

const Hero: React.FC = () => {
  const GithubIcon = FaGithub as unknown as React.FC<{ className?: string }>;
  const LinkedinIcon = FaLinkedin as unknown as React.FC<{ className?: string }>;
  const TwitterIcon = FaTwitter as unknown as React.FC<{ className?: string }>;
  const FileIcon = FaFileAlt as unknown as React.FC<{ className?: string }>;

  return (
    <section id="home" className="section min-h-screen flex items-center">
      <div className="container">
        <div className="hero-row">
          {/* Left: Avatar and intro text */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="rounded-lg glass-effect overflow-hidden w-24 h-24" style={{marginTop: 25}}>
              <img
                src="/images/me.png"
                alt="Amaad Martin"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Buttons (force normal flow with `static`) */}
            <div className="btn btn-glass btn-lg flex items-center gap-9" style={{marginLeft: 43, marginTop: 10}}>
              <a
                href="https://github.com/amaadmartin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-glass btn-lg flex items-center gap-9"
              >
                <GithubIcon />
              </a>
              <a href="/resume.pdf" className="btn btn-glass btn-lg flex items-center gap-9">
                <FileIcon />
                Resume
              </a>
              <a
                href="https://linkedin.com/in/amaadmartin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-glass btn-lg flex items-center gap-9"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>


          {/* Right: DoidVerse card */}
          <motion.div
            className="hero-right glass-effect rounded-2xl p-6 min-h-[10rem] md:min-h-[14rem] flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-bold gradient-text" style={{textAlign: 'center'}}>DoidVerse</h2>
              <p className="text-gray-300 mt-2 max-w-prose" style={{fontSize: 14, textAlign: 'center'}}>
                Live Neural Evolution Simulator. Cellular-automata used for procedural worldgen. Built with Unity.
              </p>
            </div>
            <div className="pt-3 text-right" style={{textAlign: 'center'}}>
              <a href="https://amaadmartin.github.io/doidVerse/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover-text-accent">Open local demo</a>
            </div>
            <iframe
              src="https://doidverse.the-aether.com/"
              style={{ width: '100%', height: '40vh', border: 0 }}
              allow="clipboard-read; clipboard-write; fullscreen"
              // referrerPolicy="no-referrer"
            ></iframe>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
