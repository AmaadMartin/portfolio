import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaServer } from 'react-icons/fa';

const About: React.FC = () => {
  // Icon casts to satisfy TS JSX typing with react-icons
  const CodeIcon = FaCode as unknown as React.FC<{ className?: string }>;
  const BrainIcon = FaBrain as unknown as React.FC<{ className?: string }>;
  const RocketIcon = FaRocket as unknown as React.FC<{ className?: string }>;
  const ServerIcon = FaServer as unknown as React.FC<{ className?: string }>;

  const skills = [
    { name: 'React/Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 90 },
    { name: 'AI/ML', level: 85 },
    { name: 'Unity/C#', level: 80 },
    { name: 'Node.js', level: 85 }
  ];

  const expertise: Array<{ renderIcon: () => React.ReactElement; title: string; description: string }> = [
    { renderIcon: () => <CodeIcon className="text-3xl text-purple-400 mb-3 mx-auto" />, title: 'Full-Stack Development', description: 'Scalable web apps with modern frameworks and cloud.' },
    { renderIcon: () => <BrainIcon className="text-3xl text-purple-400 mb-3 mx-auto" />, title: 'AI & Machine Learning', description: 'Neural nets, NEAT, and intelligent systems.' },
    { renderIcon: () => <RocketIcon className="text-3xl text-purple-400 mb-3 mx-auto" />, title: 'Game Development', description: 'Procedural gen and simulations with Unity.' },
    { renderIcon: () => <ServerIcon className="text-3xl text-purple-400 mb-3 mx-auto" />, title: 'DevOps & Infra', description: 'Containers and cloud deployments.' }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="gradient-text">Me</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">I build AI-powered products and immersive simulations. I love turning complex ideas into elegant, performant software.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">From DoidVerse (neural-network organisms + NEAT + cellular automata) to AI agents in production apps, I focus on research-driven engineering with real-world impact.</p>
              <p className="text-gray-300 leading-relaxed">When not coding, I explore AI research, contribute to OSS, and mentor builders.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {expertise.map((e, i) => (
                <motion.div key={e.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} className="glass-effect p-6 text-center">
                  {e.renderIcon()}
                  <h4 className="font-semibold mb-2">{e.title}</h4>
                  <p className="text-sm text-gray-400">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-effect p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-2"><span className="text-gray-300">{s.name}</span><span className="text-sm text-gray-400">{s.level}%</span></div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
