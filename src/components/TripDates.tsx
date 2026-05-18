import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

const BATCHES = [
  'Jun 6–10', 'Jun 11–15', 'Jun 14–18', 'Jun 20–24', 
  'Jun 23–27', 'Jun 26–30', 'Jun 28–Jul 2', 'Jun 30–Jul 4', 
  'Jul 3–7', 'Jul 6–10'
];

export const TripDates = () => {
  return (
    <section className="py-12 bg-himalaya-black border-b border-white/5 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sunrise-gold text-xs font-bold tracking-[0.2em] uppercase">
            <Calendar className="w-3 h-3" />
            <span>Upcoming Batch Dates 2026</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {BATCHES.map((batch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-dark px-4 py-2 rounded-xl border border-white/5 text-white/80 font-bold text-sm hover:border-sunrise-gold/30 hover:text-sunrise-gold transition-colors cursor-default"
              >
                {batch}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
