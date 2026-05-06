import { motion } from 'motion/react';
import { Trophy, Target, Share2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section id="ambassador" className="py-32 px-6 relative">
      <img src="/images/campus_ambassador_1778044724349.png" alt="Campus Ambassadors" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-himalaya-black/90" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4"
          >
            Lead Your Campus
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Become an Ambassador
          </motion.h2>
          <p className="mt-6 text-white/40 max-w-xl mx-auto">
            Build your network, earn rewards, and unlock a free Himalayan journey for the 2026 Batch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {rewards.map((reward, i) => (
            <motion.div
              key={reward.title}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`p-10 rounded-[40px] border glass-dark relative overflow-hidden group ${reward.classes}`}
            >
              <reward.icon className="w-12 h-12 text-sunrise-gold mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-sunrise-gold mb-2">{reward.highlight}</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">{reward.title}</h3>
              <p className="text-white/60 text-lg leading-tight">{reward.desc}</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-sunrise-gold/5 blur-3xl rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Workflow Timeline */}
        <div className="relative mb-32">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-sunrise-gold flex items-center justify-center text-black mb-6 shadow-xl shadow-sunrise-gold/20">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                <p className="text-xs text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Perks List */}
        <div className="glass-dark p-12 rounded-[40px] border-white/5 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Official Certificate",
              "Referral Code",
              "Networking Access",
              "Lead Experience",
              "Social Media Features",
              "Exclusive Group",
              "Future Trips",
              "Creator Acccess"
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sunrise-gold" />
                <span className="text-xs font-medium text-white/70">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/ambassador-apply" 
              className="inline-flex items-center gap-3 bg-sunrise-gold text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all"
            >
              Apply as Ambassador
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/influencer-apply" 
              className="inline-flex items-center gap-3 bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(244,114,182,0.3)] hover:shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all"
            >
              Apply as Influencer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
