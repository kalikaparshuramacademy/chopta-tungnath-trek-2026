import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Send, Instagram, GraduationCap, MapPin, Zap } from 'lucide-react';

export const AmbassadorForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark p-16 rounded-[40px] text-center border-sunrise-gold/30"
        >
          <div className="w-20 h-20 bg-sunrise-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sunrise-gold/40">
            <Send className="text-black w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Application Sent!</h2>
          <p className="text-white/60 mb-8">Our team will review your campus profile and contact you on WhatsApp/Instagram within 48 hours.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-sunrise-gold text-sm font-bold uppercase tracking-widest hover:underline"
          >
            Submit Another Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-32 px-6 bg-himalaya-black" id="ambassador-form">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 md:p-16 rounded-[40px] border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/5 blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Apply Now</h3>
            <p className="text-white/40 text-sm">Join the 2026 Batch leadership team.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">College Name</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input required type="text" placeholder="Hindu College (DU)" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Course / Year</label>
                <input required type="text" placeholder="BA (Hons) / 3rd Year" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Instagram Username</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input required type="text" placeholder="@username" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Instagram Followers</label>
                <input required type="number" placeholder="1500" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">WhatsApp Community Size</label>
                <input required type="number" placeholder="250" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">How will you promote this trek in your college?</label>
              <textarea required rows={4} placeholder="Societies, WhatsApp groups, Posters, etc." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sunrise-gold/50 transition-colors text-sm resize-none"></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-6 bg-sunrise-gold text-black rounded-2xl font-bold text-lg shadow-2xl shadow-sunrise-gold/20 flex items-center justify-center gap-3 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-3">
                Apply Now & Start Your Journey <Zap className="w-5 h-5 fill-current" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
