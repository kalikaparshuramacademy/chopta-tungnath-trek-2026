import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { Wind, Thermometer, ArrowUpRight } from 'lucide-react';

export const DestinationShowcase = () => {
  return (
    <section id="destinations" className="py-32 px-6 bg-himalaya-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
            >
              The Landscape of Grace
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
              Himalayan Anchors
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-sm max-w-sm mb-2"
          >
            Explore the sacred points that define our expedition. From river confluences to the highest summit.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-3xl overflow-hidden glass-dark border-white/5"
            >
              {/* Image with zoom on hover */}
              <img 
                src={dest.image} 
                alt={dest.name} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-himalaya-black via-himalaya-black/40 to-transparent" />

              {/* Status Badges */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="glass px-3 py-1 rounded-full flex items-center gap-2">
                  <ArrowUpRight className="w-3 h-3 text-sunrise-gold" />
                  <span className="text-[10px] font-bold uppercase">{dest.altitude}</span>
                </div>
                <div className="glass px-3 py-1 rounded-full flex items-center gap-2">
                  <Wind className="w-3 h-3 text-sunrise-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pristine</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-sunrise-gold text-[10px] font-bold uppercase tracking-widest mb-2">
                  {dest.significance}
                </p>
                <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-glow-gold transition-all">
                  {dest.name}
                </h3>
                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300">
                  <p className="text-xs text-white/60 leading-relaxed">
                    {dest.facts}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-6 border-t border-white/10 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-sunrise-gold/60" />
                    <span className="text-[10px] text-white/60 uppercase">12°C - 20°C</span>
                   </div>
                   <button className="ml-auto text-xs font-bold uppercase tracking-widest text-sunrise-gold hover:underline">
                    Explore
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
