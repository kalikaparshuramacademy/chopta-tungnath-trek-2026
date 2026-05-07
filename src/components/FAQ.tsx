import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown } from 'lucide-react';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-himalaya-black relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunrise-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Clear Your Mind
            </p>
            <h2 className="text-5xl font-bold tracking-tighter text-glow">
              Common Queries
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: idx * 0.1 }}
              className="glass-dark rounded-3xl overflow-hidden border-white/5"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-8 py-6 text-left flex items-center justify-between group"
              >
                <span className="text-lg font-bold tracking-tight group-hover:text-sunrise-gold transition-colors">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-sunrise-gold transition-transform duration-500 ${
                    activeIndex === idx ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                  >
                    <div className="px-8 pb-8 text-white/50 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
