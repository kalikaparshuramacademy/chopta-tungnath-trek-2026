import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { Wind, Thermometer, ArrowUpRight } from 'lucide-react';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const DestinationShowcase = () => {
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
                    {dest.elevation}
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

                <div className="flex items-center gap-2 text-sunrise-gold text-xs font-black uppercase tracking-widest cursor-pointer group/link">
                  View Details
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
