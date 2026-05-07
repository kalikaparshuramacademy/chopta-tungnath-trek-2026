import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const GoldenBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce particle count on mobile for performance
  const particleCount = isMobile ? 15 : 40;
  const glowCount = isMobile ? 3 : 6;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ── FLOATING GLOW BLOBS ─────────────────────────────────────────── */}
      {[...Array(glowCount)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0 
          }}
          animate={{
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[40vw] h-[40vw] bg-sunrise-gold rounded-full blur-[120px]"
        />
      ))}

      {/* ── GOLDEN DUST PARTICLES ───────────────────────────────────────── */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0 
          }}
          animate={{
            y: ['-10%', '110%'],
            x: (Math.random() * 100) + '%',
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute w-1 h-1 bg-sunrise-gold rounded-full shadow-[0_0_10px_rgba(255,183,0,0.8)]"
          style={{
            left: (Math.random() * 100) + '%',
          }}
        />
      ))}

      {/* ── SUBTLE RADIAL VIGNETTE ──────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-himalaya-black/40" />
    </div>
  );
};
