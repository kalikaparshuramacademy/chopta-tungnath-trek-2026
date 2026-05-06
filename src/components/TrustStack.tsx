import { motion } from 'motion/react';
import { Shield, Heart, Award, CheckCircle2 } from 'lucide-react';

export const TrustStack = () => {
  const stats = [
    { value: "427+", label: "Trekkers Guided", icon: Heart },
    { value: "0", label: "Evacuation Incidents", icon: Shield },
    { value: "4.8/5", label: "Group Rating", icon: Award },
    { value: "12+", label: "Certified Leaders", icon: CheckCircle2 },
  ];

  return (
    <section className="py-32 px-6 relative">
      <img src="/images/trust_safety_1778044760954.png" alt="Safety and Trust" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-himalaya-black/90" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
            >
              The Science of Safety
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tighter mb-8"
            >
              Our Commitment to <br/>
              <span className="text-sunrise-gold">Elite Adventure</span>
            </motion.h2>
            <p className="text-white/60 mb-10 leading-relaxed max-w-lg">
              We specialize in student-focused expeditions where safety is not an afterthought, but the core engine. Every batch is lead by certified mountaineers equipped with medical-grade support.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-sunrise-gold" />
                    <span className="text-2xl font-display font-bold">{stat.value}</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-dark p-12 rounded-[40px] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/5 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            
            <h3 className="text-2xl font-bold mb-8">For Parents</h3>
            <div className="space-y-6">
              {[
                { title: "Udyam Registered", desc: "Recognized by Govt. of India for formal operations." },
                { title: "24/7 Helpline", desc: "Constant support for parents while students are on the mountain." },
                { title: "Female Safety First", desc: "Separate stays and female trek leaders on every major batch." },
                { title: "GPS Tracking", desc: "Daily batch updates and positioning shared via WhatsApp." }
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-sunrise-gold mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a 
              href="/Chopta_Tungnath_Safety_Brochure.pdf" 
              download="Chopta_Tungnath_Safety_Brochure.pdf"
              className="mt-10 w-full py-4 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors text-center inline-block"
            >
              Download Safety Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
