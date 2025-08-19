import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setForm({ name: '', email: '', subject: '', message: '' }); alert('Thanks!'); }, 1200);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In <span className="gradient-text">Touch</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Open to collabs and opportunities. Let s build.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h3>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <input className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
              <textarea className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white resize-none" rows={6} placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              <button className="w-full btn btn-primary" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
            </form>
          </div>
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Follow</h3>
            <div className="flex gap-4">
              {(() => {
                const GithubIcon = FaGithub as unknown as React.FC<{ className?: string }>;
                const LinkedinIcon = FaLinkedin as unknown as React.FC<{ className?: string }>;
                const TwitterIcon = FaTwitter as unknown as React.FC<{ className?: string }>;
                return [
                  { renderIcon: () => <GithubIcon />, url: 'https://github.com/amaadmartin' },
                  { renderIcon: () => <LinkedinIcon />, url: 'https://linkedin.com/in/amaadmartin' },
                  { renderIcon: () => <TwitterIcon />, url: 'https://twitter.com/amaadmartin' }
                ].map(({ renderIcon, url }) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl text-gray-400 hover:text-purple-400">{renderIcon()}</a>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
