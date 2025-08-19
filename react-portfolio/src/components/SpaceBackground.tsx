import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();

    const stars: Array<{x: number, y: number, size: number, speed: number, opacity: number}> = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    let rafId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw falling stars with twinkle and fade-out after halfway down the screen
      stars.forEach((star, index) => {
        // Update position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size; // restart just above the top
          star.x = Math.random() * canvas.width;
        }

        // Base twinkle
        const twinkle = 0.2 + Math.abs(Math.sin((Date.now() * 0.001) + index)) * 0.8;

        // Fade factor: full opacity above halfway, then smoothly to 0 at the bottom
        const half = canvas.height * 0.5;
        const fade = star.y <= half ? 1 : Math.max(0, 1 - (star.y - half) / half);
        const opacity = twinkle * fade;

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Optional short trailing streak for motion illusion
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.lineWidth = Math.max(0.5, star.size * 0.4);
        ctx.beginPath();
        ctx.moveTo(star.x, star.y - star.speed * 6);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => setSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SpaceBackground;
