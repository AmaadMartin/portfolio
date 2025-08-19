import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const CloseIcon = FaTimes as unknown as React.FC<{ className?: string }>;
  const MenuIcon = FaBars as unknown as React.FC<{ className?: string }>;
  const FileIcon = FaFileAlt as unknown as React.FC<{ className?: string }>;
  const GithubIcon = FaGithub as unknown as React.FC<{ className?: string }>;
  const LinkedinIcon = FaLinkedin as unknown as React.FC<{ className?: string }>;
  const TwitterIcon = FaTwitter as unknown as React.FC<{ className?: string }>;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'glass-effect' : ''}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="text-2xl font-bold gradient-text">Amaad Martin</button>

          <div className="hidden md:flex items-center gap-8">
            {items.map(item => (
              <button
                key={item.id}
                className="transition-colors font-medium"
                style={{ color: '#fff' }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg flex items-center gap-2" style={{ color: '#fff' }}>
              <FileIcon />
              Resume
            </a>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-secondary btn-lg flex items-center justify-center">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn btn-secondary btn-lg flex items-center justify-center">
                <GithubIcon />
              </a>
              <a href="https://twitter.com/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="btn btn-secondary btn-lg flex items-center justify-center">
                <TwitterIcon />
              </a>
            </div>
          </div>

          <button className="md:hidden text-2xl" style={{ color: '#fff' }} onClick={() => setIsOpen(v => !v)}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {items.map(item => (
              <button
                key={item.id}
                className="block w-full text-left transition-colors font-medium"
                style={{ color: '#fff' }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg block w-full text-center flex items-center justify-center gap-2" style={{ color: '#fff' }}>
              <FileIcon />
              Resume
            </a>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a href="https://linkedin.com/in/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-secondary flex items-center justify-center">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn btn-secondary flex items-center justify-center">
                <GithubIcon />
              </a>
              <a href="https://twitter.com/amaadmartin" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="btn btn-secondary flex items-center justify-center">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
