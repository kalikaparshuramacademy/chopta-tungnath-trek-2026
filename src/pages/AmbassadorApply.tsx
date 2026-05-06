import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AmbassadorApply = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    why_join: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('ambassadors')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            why_join: formData.why_join
          }
        ]);
        
      if (error) {
        throw error;
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Application Received!</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Thank you for applying to the Campus Ambassador program. Our team will review your profile and contact you on WhatsApp soon.
          </p>
          <p className="text-sunrise-gold text-sm font-bold tracking-widest uppercase">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-6 pb-12 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/campus_ambassador_1778044724349.webp')] bg-cover bg-center mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-bold tracking-tighter mb-4">
            Become a <br/><span className="text-sunrise-gold">Campus Leader</span>
          </h1>
          
          <p className="text-white/60 mb-8 leading-relaxed">
            Lead the charge at your college. Bring 8 friends, travel for free, and earn real cash bonuses for your network.
          </p>

          <ul className="space-y-4">
            {[
              "Free fully-funded trip",
              "₹500 bonus per referral",
              "Official CV Certificate",
              "Exclusive Networking"
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm font-bold text-white/80">
                <CheckCircle className="w-5 h-5 text-sunrise-gold" />
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden md:col-span-3"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-6">Ambassador Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/50 uppercase">Full Name</label>
              <input
                id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/50 uppercase">Email Address</label>
                <input
                  id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold tracking-widest text-white/50 uppercase">WhatsApp Number</label>
                <input
                  id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="+91"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="college" className="text-xs font-bold tracking-widest text-white/50 uppercase">College / University</label>
              <input
                id="college" name="college" type="text" required value={formData.college} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="E.g., Hindu College, DU"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="why_join" className="text-xs font-bold tracking-widest text-white/50 uppercase">Why do you want to join?</label>
              <textarea
                id="why_join" name="why_join" required value={formData.why_join} onChange={handleChange} rows={3}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20 resize-none"
                placeholder="Tell us about your campus influence and why you'd be a great fit."
              />
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold text-lg py-4 rounded-xl mt-6 shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all ${
                isSubmitting ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-sunrise-gold text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]'
              }`}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
