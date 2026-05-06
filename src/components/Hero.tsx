import { motion, useScroll, useTransform } from 'motion/react';
import { TRIP_NAME, TAGLINE, TRIP_DATES, DURATION } from '../constants';
import { ChevronDown, Play, Users, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Video and Atmosphere */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: videoY }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-himalaya-black/30 via-transparent to-himalaya-black" />
          
          {/* Moving Fog / Cloud Shaders (Layered) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none">
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
            animate={{ x: [-100, 100], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] mix-blend-screen scale-150 pointer-events-none"
          />
          <motion.div 
            style={{ y: fogY }}
            animate={{ x: [100, -100], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 35, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] mix-blend-screen scale-125 pointer-events-none"
          />

          {/* Glowing Sunrise Rays Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,215,0,0.15)_0%,transparent_40%)] pointer-events-none" />
          
          {/* Animated Snow Particles (Optimized) */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: -20, 
                  opacity: Math.random() * 0.4 + 0.1,
                  scale: Math.random() * 0.5 + 0.3
                }}
                animate={{ 
                  y: "110vh",
                  x: (Math.random() * 100 - 50) + "px",
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 15 + 10, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                className="absolute w-1 h-1 bg-white rounded-full blur-[2px]"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Atmospheric Secondary Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-himalaya-black to-transparent opacity-40" />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-sunrise-gold rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
              {TRIP_DATES} • {DURATION}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tighter leading-[0.9] text-glow">
            {TRIP_NAME.split(' ').map((word, i) => (
              <span key={i} className="block sm:inline">{word} </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-serif italic tracking-wide">
            "{TAGLINE}"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/book">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-sunrise-gold text-black rounded-full font-bold shadow-2xl shadow-sunrise-gold/30 flex items-center gap-4 transition-shadow hover:shadow-sunrise-gold/50"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-widest opacity-80 leading-none mb-1">Total: ₹5,499</span>
                  <span className="text-xl leading-none">Book Now at ₹999</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            </Link>
            <motion.div 
              className="flex items-center gap-4 text-white/80 glass px-6 py-4 rounded-full"
            >
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-himalaya-black bg-black flex items-center justify-center relative">
                    <Users className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-none">47 / 60 Seats</p>
                <p className="text-[10px] opacity-60">Reserved by DU Students</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
