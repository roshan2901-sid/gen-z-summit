import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  return null;

  // eslint-disable-next-line no-unreachable
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Luxury Golden Starlight & Diamond Sparkles
    const particleCount = Math.min(width > 768 ? 65 : 35, 80);
    const particles = [];

    const colors = [
      'rgba(245, 158, 11, ',   // radiant gold
      'rgba(255, 223, 115, ',  // champagne gold
      'rgba(255, 255, 255, ',  // pure diamond white
      'rgba(212, 175, 55, ',   // 24k polished gold
      'rgba(254, 240, 138, ',  // bright star flare
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.5 - 0.15, // graceful upward drift like stardust
        pulseSpeed: Math.random() * 0.025 + 0.01,
        isStar: Math.random() > 0.65, // 4-point diamond star sparkle
      });
    }

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 223, 115, 0.8)';
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient luxury gold vignette
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.25,
        60,
        width / 2,
        height * 0.25,
        width * 0.8
      );
      radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(18, 15, 8, 0.04)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render sparkles and diamond stars
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.015;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentAlpha = Math.max(0.15, Math.min(0.9, p.alpha));
        const color = `${p.colorBase}${currentAlpha})`;

        if (p.isStar) {
          drawStar(p.x, p.y, 4, p.radius * 2.2, p.radius * 0.7, color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}
