import React from 'react';
import './index.css';
import ThemeFromImage from './theme/ThemeFromImage';
import Navbar from './components/Navbar';
import BackgroundAudio from './components/BackgroundAudio';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SpaceBackground from './components/SpaceBackground';

function App() {
  return (
    <div className="App" style={{ backgroundImage: 'url(/images/background.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
      <ThemeFromImage src="/images/background.png" />
      <SpaceBackground />
      <BackgroundAudio />
      <main>
        <Hero />
        <Projects />
      </main>
    </div>
  );
}

export default App;
