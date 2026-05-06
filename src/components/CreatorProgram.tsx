import { motion } from 'motion/react';
import { Camera, Instagram, Video, Sparkles, Award, Users } from 'lucide-react';

export const CreatorProgram = () => {
  const benefits = [
    { title: "Free Stays", icon: Sparkles, desc: "Complimentary mountain experiences for top creators." },
    { title: "Gear Access", icon: Camera, desc: "Premium content opportunities with pro equipment." },
    { title: "Networking", icon: Users, desc: "Connect with the elite Himalayan creator circle." },
    { title: "Paid Gigs", icon: Award, desc: "Future opportunities for sponsored collaborations." }
  ];

  return (
    <section id="creators" className="py-32 px-6 bg-himalaya-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Travel. Create. Grow.
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Creator Collaboration
          </motion.h2>
          <p className="mt-6 text-white/40 max-w-xl mx-auto">
            Become part of the Himalayan story. We're looking for influencers, photographers, and filmmakers to capture the soul of Tungnath.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-dark p-8 rounded-3xl border-white/5 hover:border-sunrise-gold/30 transition-colors group"
              >
                <item.icon className="w-8 h-8 text-sunrise-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="aspect-[4/5] glass-dark rounded-[40px] overflow-hidden border-white/10 relative">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop" 
                alt="Creator filming"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-himalaya-black via-transparent to-transparent" />
              
              <div className="absolute inset-x-8 bottom-8">
                <div className="flex gap-4 mb-4">
                  <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Instagram className="w-3 h-3" /> @peakandriver
                  </div>
                  <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Video className="w-3 h-3" /> Reel Ready
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-4">Join our 2026 Batch Creator Squad</h4>
                <button className="w-full py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-sunrise-gold transition-colors flex items-center justify-center gap-2">
                  Apply as Creator <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Decorative social cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 glass p-4 rounded-2xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sunrise-gold" />
                <div>
                  <p className="text-[10px] font-bold">New Collab</p>
                  <p className="text-[8px] opacity-40">Just now</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
