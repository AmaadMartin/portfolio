import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Bottom row projects
const projects = [
  { id: 'artemis', title: 'Artemis Gen', desc: 'Automated deal sourcing using AI agents + deep web scraping. Input ICP → lead database.', url: 'https://artemis-gen.com', img: '/images/projects/Artemis.jpg' },
  { id: 'aether', title: 'The Aether', desc: 'LLM infra for prompt version control and testing. SDK + Web UI.', url: 'https://www.the-aether.com/', img: '/images/projects/aether.png' },
  { id: 'practice-pal', title: 'Practice Pal', desc: 'Generate practice exams from notes/materials using an AI agent.', url: 'https://www.practice-pal.com', img: '/images/projects/PracticePal.png' },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section" style={{ marginTop: '-85px', paddingTop: '0px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>
            Featured <span style={{ color: '#fff' }}>Projects</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db', margin: '0 auto', maxWidth: '48rem' }}>
            A few of my recent projects.
          </p>
        </motion.div>

        <Carousel projects={projects} />
      </div>
    </section>
  );
};

export default Projects;

// Simple carousel component with buttons and drag support
type ProjectItem = { id: string; title: string; desc: string; url: string; img: string };
const Carousel: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scrollBy = (delta: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        className="carousel"
        style={{ marginTop: -8 }}
      >
        {projects.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="glass-effect carousel-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="square">
              <img src={p.img} alt={p.title} />
            </div>
            <div style={{ padding: 16 }}>
              <h3 className="gradient-text" style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
              <p style={{ color: '#fff', fontSize: 14, marginBottom: 8 }}>{p.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
      <button
        aria-label="Previous"
        onClick={() => scrollBy(-300)}
        disabled={!canScrollLeft}
        className="btn btn-secondary"
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={() => scrollBy(300)}
        disabled={!canScrollRight}
        className="btn btn-primary"
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
      >
        ›
      </button>
    </div>
  );
};
