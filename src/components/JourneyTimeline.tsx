import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ITINERARY } from '../constants';
import { ArrowRight, X } from 'lucide-react';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const JourneyTimeline = () => {
  const [activeDay, setActiveDay] = useState<typeof ITINERARY[0] | null>(null);

  return (
    <section id="itinerary" className="py-32 px-6 bg-himalaya-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-himalaya-emerald/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The Path of Enlightenment
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow">
              Interactive Journey
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sunrise-gold/0 via-sunrise-gold/30 to-sunrise-gold/0 hidden md:block" />

          <div className="space-y-32">
            {ITINERARY.map((day, idx) => (
              <motion.div 
                key={day.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: SMOOTH_EASE, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-sunrise-gold bg-himalaya-black z-10 hidden md:block ring-8 ring-himalaya-black" />

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="glass px-6 py-2 rounded-full mb-6 inline-block">
                    <span className="text-2xl font-display font-bold text-sunrise-gold">DAY 0{day.day}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{day.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
                    {day.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {day.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full bg-white/[0.02]">
                        <span className="w-1.5 h-1.5 rounded-full bg-sunrise-gold/40" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {day.details && (
                    <button
                      onClick={() => setActiveDay(day)}
                      className="mt-6 text-sunrise-gold hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>

                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-sunrise-gold/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-700" />
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden glass-dark border-white/5">
                    <img 
                      src={day.image} 
                      alt={day.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveDay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: SMOOTH_EASE }}
              className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveDay(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              
              <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Day 0{activeDay.day}
              </p>
              <h3 className="text-2xl font-bold mb-6">{activeDay.title}</h3>
              
              <ul className="space-y-4">
                {activeDay.details?.map((detail, index) => (
                  <li key={index} className="text-white/80 text-sm leading-relaxed flex gap-3">
                    <span className="text-sunrise-gold mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
