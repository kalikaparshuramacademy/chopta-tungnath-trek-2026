import { motion, useScroll, useTransform } from 'motion/react';
import { TRIP_NAME, TAGLINE, TRIP_DATES, DURATION } from '../constants';
import { Users, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-himalaya-black">
      {/* Background with Video and Atmosphere */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: videoY }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: SMOOTH_EASE }}
          className="relative w-full h-full"
        >
          {/* Cinematic Video Layer - High Resolution Loop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero_bg_1778044589465.webp"
            className="absolute inset-0 w-full h-full object-cover"
            title="Cinematic view of Himalayan clouds"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-clouds-among-the-mountain-peaks-at-sunset-41604-large.mp4" type="video/mp4" />
          </video>
          
          {/* Enhanced Visibility Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-himalaya-black/40 via-transparent to-himalaya-black" />
          
          {/* Moving Fog / Cloud Shaders (Layered) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-screen pointer-events-none">
            <filter id="fog-shader">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3">
                <animate attributeName="baseFrequency" dur="60s" values="0.012;0.008;0.012" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
            <rect width="100%" height="100%" filter="url(#fog-shader)" className="fill-white/10" />
          </svg>

          <motion.div 
            style={{ y: fogY }}
            animate={{ x: [-50, 50], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] mix-blend-screen scale-150 pointer-events-none will-change-transform"
          />

          {/* Glowing Sunrise Rays Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,215,0,0.1)_0%,transparent_40%)] pointer-events-none" />
          
          {/* Animated Snow Particles (Optimized) */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: -20, 
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.3
                }}
                animate={{ 
                  y: "110vh",
                  x: (Math.random() * 60 - 30) + "px",
                  opacity: [0, 0.4, 0],
                }}
                transition={{ 
                  duration: Math.random() * 10 + 15, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 10
                }}
                className="absolute w-1 h-1 bg-white rounded-full blur-[1px] will-change-transform"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: SMOOTH_EASE, delay: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: SMOOTH_EASE, delay: 0.8 }}
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-sunrise-gold rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
              {TRIP_DATES} • {DURATION}
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 tracking-tighter leading-[0.85] text-glow">
            {TRIP_NAME.split(' ').map((word, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: SMOOTH_EASE, delay: 1 + i * 0.1 }}
                className="block sm:inline"
              >
                {word}{' '}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-serif italic tracking-wide"
          >
            "{TAGLINE}"
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: SMOOTH_EASE, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link to="/book" className="group">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-sunrise-gold text-black rounded-full font-bold shadow-2xl shadow-sunrise-gold/20 flex items-center gap-4 transition-all hover:shadow-sunrise-gold/40"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-widest opacity-70 leading-none mb-1 font-black">Total: ₹5,499</span>
                  <span className="text-xl leading-none font-black">Book Now at ₹999</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.button>
            </Link>
            
            <motion.div 
              className="flex items-center gap-5 text-white/80 glass px-8 py-4 rounded-full"
            >
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-himalaya-black bg-himalaya-black/80 flex items-center justify-center relative overflow-hidden">
                    <Users className="w-5 h-5 text-sunrise-gold" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-sunrise-gold/10 to-transparent" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-black leading-none text-sunrise-gold">47 / 60 Seats</p>
                <p className="text-[10px] opacity-60 font-bold uppercase tracking-wider mt-1">Reserved by DU Students</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-1 bg-sunrise-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
