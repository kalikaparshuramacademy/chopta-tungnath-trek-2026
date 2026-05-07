import { motion } from 'motion/react';
import { Trophy, Target, Share2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const AmbassadorProgram = () => {
  const rewards = [
    { 
      title: "FREE TRIP", 
      desc: "After 8 Successful Registrations", 
      icon: Trophy,
      highlight: "Golden Achievement",
      classes: "border-sunrise-gold/30 bg-sunrise-gold/5"
    },
    { 
      title: "EARN ₹500", 
      desc: "Per referral after first 8 bookings", 
      icon: Target,
      highlight: "Growth Bonus",
      classes: "border-white/5 bg-white/5"
    }
  ];

  const steps = [
    { title: "Apply", desc: "Submit your campus profile", icon: Share2 },
    { title: "Get Selected", desc: "Join our elite circle", icon: Target },
    { title: "Promote", desc: "Spread the mountain word", icon: Rocket },
    { title: "Travel Free", desc: "Claim your rewards", icon: Trophy }
  ];

  return (
    <section id="ambassador" className="py-32 px-6 relative bg-himalaya-black overflow-hidden">
      <img src="/images/campus_ambassador_1778044724349.webp" alt="Campus Ambassadors" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-himalaya-black/90 via-himalaya-black/80 to-himalaya-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Lead Your Campus
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow">
              Become an Ambassador
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rewards.map((reward, i) => (
                <motion.div
                  key={reward.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: i * 0.1 }}
                  className={`p-8 rounded-[2.5rem] border ${reward.classes} relative group overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <reward.icon className="w-20 h-20" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-sunrise-gold/60 mb-2 block">{reward.highlight}</span>
                  <h3 className="text-3xl font-black mb-2 tracking-tight">{reward.title}</h3>
                  <p className="text-sm text-white/50 font-medium leading-relaxed">{reward.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-[2.5rem] border-white/5"
            >
              <p className="text-white/70 leading-relaxed font-medium">
                We're looking for the most influential students across DU colleges. Join Peak & River Travels to lead your batch to the summit and travel for free.
              </p>
              <div className="mt-8">
                <Link 
                  to="/ambassador-apply" 
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-sunrise-gold transition-colors group"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-sunrise-gold/5 blur-3xl rounded-full pointer-events-none" />
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: SMOOTH_EASE, delay: 0.2 + i * 0.1 }}
                  className="glass-dark p-8 rounded-3xl border-white/5 flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sunrise-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sunrise-gold/20 transition-all">
                    <step.icon className="w-6 h-6 text-sunrise-gold" />
                  </div>
                  <h4 className="font-bold text-white mb-2 tracking-tight">{step.title}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-black">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
