import { motion } from 'motion/react';
import { Shield, Heart, Award, CheckCircle2 } from 'lucide-react';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const TrustStack = () => {
  const stats = [
    { value: "427+", label: "Trekkers Guided", icon: Heart },
    { value: "0", label: "Evacuation Incidents", icon: Shield },
    { value: "4.8/5", label: "Group Rating", icon: Award },
    { value: "12+", label: "Certified Leaders", icon: CheckCircle2 },
  ];

  return (
    <section className="py-32 px-6 relative bg-himalaya-black overflow-hidden">
      <img src="/images/trust_safety_1778044760954.webp" alt="Safety and Trust" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-himalaya-black/90 via-himalaya-black/80 to-himalaya-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The Science of Safety
            </p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 text-glow">
              Our Commitment to <br/>
              <span className="text-sunrise-gold">Elite Adventure</span>
            </h2>
            <p className="text-white/60 mb-10 leading-relaxed max-w-lg font-medium">
              We specialize in student-focused expeditions where safety is not an afterthought, but the core engine. Every batch is lead by certified mountaineers equipped with medical-grade support.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: idx * 0.1 }}
                  className="space-y-2 group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <stat.icon className="w-5 h-5 text-sunrise-gold group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: SMOOTH_EASE }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-sunrise-gold/10 rounded-[3rem] blur-2xl" />
            <div className="relative glass-dark p-12 rounded-[3rem] border-white/5 space-y-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sunrise-gold/5 blur-3xl -mr-16 -mt-16" />
              
              <div className="space-y-6">
                {[
                  "ISO 9001:2015 Certified Operations",
                  "24/7 Satellite Support Readiness",
                  "Verified Background-Checked Staff",
                  "Comprehensive Insurance Coverage"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-sunrise-gold/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-sunrise-gold" />
                    </div>
                    <span className="text-sm font-bold text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
