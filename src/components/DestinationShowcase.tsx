import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { Wind, Thermometer, ArrowUpRight, X, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Destination } from '../types';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const DestinationShowcase = () => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedDest]);

  return (
    <section id="destinations" className="py-32 px-6 bg-himalaya-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
            className="max-w-2xl"
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The Landscape of Grace
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow">
              Himalayan Anchors
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white/40 text-sm max-w-sm mb-2 font-medium"
          >
            Explore the sacred points that define our expedition. From river confluences to the highest summit.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: SMOOTH_EASE, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden glass-dark border-white/5"
            >
              {/* Image with zoom on hover */}
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-himalaya-black via-himalaya-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content within the card */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-[10px] font-bold text-white/90">
                    <Wind className="w-3 h-3 text-sunrise-gold" />
                    {dest.altitude}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-[10px] font-bold text-white/90">
                    <Thermometer className="w-3 h-3 text-sunrise-gold" />
                    {dest.temp}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight transition-transform duration-500 group-hover:translate-x-1">{dest.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2 transition-opacity duration-500 group-hover:opacity-100">
                  {dest.description}
                </p>

                <button 
                  onClick={() => setSelectedDest(dest)}
                  className="flex items-center gap-2 text-sunrise-gold text-xs font-black uppercase tracking-widest cursor-pointer group/link hover:text-white transition-colors"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DESTINATION DETAILS MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-himalaya-black/95 backdrop-blur-2xl"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-neutral-900 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDest(null)}
                title="Close details"
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-xl transition-all active:scale-90"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Left Side: Large Image */}
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
                <img 
                  src={selectedDest.image} 
                  alt={selectedDest.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-8 left-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-dark text-xs font-bold text-white">
                      <Wind className="w-4 h-4 text-sunrise-gold" />
                      {selectedDest.altitude}
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                    {selectedDest.name}
                  </h2>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-12 scrollbar-hide">
                <div className="mb-8">
                  <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Destinations of Grace
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-6">{selectedDest.significance}</h3>
                  <p className="text-white/60 leading-relaxed text-lg mb-8">
                    {selectedDest.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {/* Highlights */}
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px]">Key Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedDest.highlights?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <CheckCircle2 className="w-4 h-4 text-sunrise-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm text-white/70 group-hover:text-white transition-colors">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facts & Pro Tip */}
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <MapPin className="w-12 h-12 text-sunrise-gold" />
                    </div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 italic">Expedition Pro-Tip</p>
                    <p className="text-white/80 font-medium text-sm leading-relaxed">
                      "{selectedDest.proTip}"
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => {
                      setSelectedDest(null);
                      window.location.hash = '#pricing';
                    }}
                    className="w-full py-5 bg-sunrise-gold text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-sunrise-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Secure Your Spot
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
