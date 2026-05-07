import { motion } from 'motion/react';
import { Camera, Instagram, Video, Sparkles, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

export const CreatorProgram = () => {
  const benefits = [
    { title: "Free Stays", icon: Sparkles, desc: "Complimentary mountain experiences for top creators." },
    { title: "Gear Access", icon: Camera, desc: "Premium content opportunities with pro equipment." },
    { title: "Networking", icon: Users, desc: "Connect with the elite Himalayan creator circle." },
    { title: "Paid Gigs", icon: Award, desc: "Future opportunities for sponsored collaborations." }
  ];

  return (
    <section id="creators" className="py-32 px-6 bg-himalaya-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sunrise-gold/[0.02] blur-[150px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Travel. Create. Grow.
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow">
              Creator Collaboration
            </h2>
            <p className="mt-6 text-white/40 max-w-xl mx-auto font-medium">
              Become part of the Himalayan story. We're looking for influencers, photographers, and filmmakers to capture the soul of Tungnath.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: idx * 0.1 }}
                className="glass-dark p-10 rounded-[2.5rem] border-white/5 hover:border-sunrise-gold/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sunrise-gold/10 transition-all">
                  <item.icon className="w-6 h-6 text-sunrise-gold" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: SMOOTH_EASE }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-4xl font-bold tracking-tight text-white/90">Showcase your <span className="text-sunrise-gold italic font-serif">Vision</span></h3>
              <p className="text-lg text-white/50 leading-relaxed font-medium">
                Whether you have 5k or 500k followers, what matters to us is your storytelling. We provide the location, the logistical support, and the canvas; you provide the creativity.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 glass-dark px-6 py-3 rounded-full">
                <Instagram className="w-5 h-5 text-sunrise-gold" />
                <span className="text-xs font-bold tracking-widest text-white/60">REELS</span>
              </div>
              <div className="flex items-center gap-3 glass-dark px-6 py-3 rounded-full">
                <Video className="w-5 h-5 text-sunrise-gold" />
                <span className="text-xs font-bold tracking-widest text-white/60">VLOGS</span>
              </div>
              <div className="flex items-center gap-3 glass-dark px-6 py-3 rounded-full">
                <Camera className="w-5 h-5 text-sunrise-gold" />
                <span className="text-xs font-bold tracking-widest text-white/60">STILLS</span>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                to="/influencer-apply" 
                className="inline-flex items-center gap-3 bg-sunrise-gold text-black px-12 py-5 rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all group shadow-2xl shadow-sunrise-gold/20"
              >
                Join Creator Circle
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
