import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

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
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ color: '#fff' }}>Resume</a>
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
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary block w-full text-center" style={{ color: '#fff' }}>Resume</a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
