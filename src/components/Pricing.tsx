import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRICING_PLANS, INCLUSIONS, EXCLUSIONS } from '../constants';
import { Check, X, ShieldCheck, Zap } from 'lucide-react';

export const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <img src="/images/pricing_bg_1778044708749.png" alt="Luxury Mountain Camping" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-himalaya-black/80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-himalaya-emerald/5 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Invest in Memories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Expedition Plans
          </motion.h2>
          <p className="mt-6 text-white/40 max-w-xl mx-auto">
            Transparent pricing designed for students. Slotting right between budget and premium floors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative glass-dark p-10 rounded-[40px] flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 group ${
                plan.recommended ? 'border-sunrise-gold/30 ring-1 ring-sunrise-gold/20' : 'border-white/5'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sunrise-gold text-black px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">{plan.type}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl md:text-6xl font-display font-bold group-hover:text-glow transition-all">{plan.price}</span>
                <span className="text-white/40 text-sm">/ person</span>
              </div>
              <p className="text-sm text-white/60 mb-8 leading-relaxed h-12">{plan.description}</p>
              
              <Link to="/book" className={`block w-full py-4 rounded-2xl font-bold transition-all text-center ${
                plan.recommended 
                  ? 'bg-sunrise-gold text-black shadow-lg shadow-sunrise-gold/20' 
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}>
                Book For ₹999
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 p-12 rounded-[40px] glass">
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <ShieldCheck className="text-sunrise-gold" />
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INCLUSIONS.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-himalaya-emerald/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-sunrise-gold" />
                  </div>
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <X className="text-white/20" />
              Not Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXCLUSIONS.map(item => (
                <div key={item} className="flex items-center gap-3 opacity-60">
                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-white/40" />
                  </div>
                  <span className="text-sm text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
