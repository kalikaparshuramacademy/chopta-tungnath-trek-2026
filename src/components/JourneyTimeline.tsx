import { motion } from 'motion/react';
import { ITINERARY } from '../constants';

export const JourneyTimeline = () => {
  return (
    <section id="journey" className="py-32 px-6 bg-himalaya-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-himalaya-emerald/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            The Path of Enlightenment
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Interactive Journey
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sunrise-gold/0 via-sunrise-gold/40 to-sunrise-gold/0 hidden md:block" />

          <div className="space-y-32">
            {ITINERARY.map((day, idx) => (
              <motion.div 
                key={day.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-sunrise-gold bg-himalaya-black z-10 hidden md:block" />

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="glass px-6 py-2 rounded-full mb-6">
                    <span className="text-2xl font-display font-bold text-sunrise-gold">DAY 0{day.day}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{day.title}</h3>
                  <p className="text-white/60 mb-8 max-w-md">{day.description}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {day.highlights.map(h => (
                      <span key={h} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 border border-white/10 rounded-full bg-white/5">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="aspect-video glass-dark p-2 rounded-2xl overflow-hidden group"
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                       <img 
                        src={day.image}
                        alt={`Day ${day.day}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-himalaya-black/40" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
