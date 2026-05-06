import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-himalaya-black relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Clear Your Mind
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tighter"
          >
            Common Queries
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className={`w-full p-8 text-left glass-dark rounded-[32px] transition-all duration-300 border border-white/5 flex items-center justify-between ${
                  activeIndex === idx ? 'ring-1 ring-sunrise-gold/30 ring-inset' : 'hover:bg-white/5'
                }`}
              >
                <span className={`font-bold transition-colors ${activeIndex === idx ? 'text-sunrise-gold' : 'text-white/80'}`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${activeIndex === idx ? 'rotate-180 text-sunrise-gold' : 'text-white/40'}`} />
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-2 text-white/50 text-sm leading-relaxed">
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
