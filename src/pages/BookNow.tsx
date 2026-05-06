import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PAYMENT_LINK } from '../constants';
import { ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';

export const BookNow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    date: '21st June 2026'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // --- DEBUG: Log Supabase config ---
      console.log('[BookNow] Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('[BookNow] Anon Key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      console.log('[BookNow] Submitting registration payload:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        batch_date: formData.date,
      });

      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            batch_date: formData.date
          }
        ])
        .select();
        
      if (error) {
        // --- DETAILED ERROR LOGGING ---
        console.error('[BookNow] ❌ Supabase INSERT failed:');
        console.error('  code:', error.code);         // e.g. "42501" = RLS violation
        console.error('  message:', error.message);
        console.error('  details:', error.details);
        console.error('  hint:', error.hint);
        console.error('  Full error object:', JSON.stringify(error, null, 2));

        const userMessage = error.code === '42501'
          ? 'Permission denied. The database is blocking this submission (RLS policy issue). Check the browser console for details.'
          : `Submission error [${error.code}]: ${error.message}`;
        alert(userMessage);
        setIsSubmitting(false);
        return;
      }

      console.log('[BookNow] ✅ Registration saved successfully:', data);
      // Redirect to Razorpay payment link after saving data
      window.location.href = PAYMENT_LINK;
    } catch (err) {
      console.error('[BookNow] ❌ Unexpected JS error during submit:', err);
      alert('An unexpected error occurred. Please check the browser console.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-6 pb-12">
      {/* Background element */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay backdrop-blur-[2px]" />
      
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow mb-6">
            Secure Your <span className="text-sunrise-gold">Seat</span>
          </h1>
          
          <div className="glass-dark p-8 rounded-3xl border border-white/10 mb-8 space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
              <div>
                <p className="text-sm text-white/50 mb-1">Total Trek Cost</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold line-through text-white/30">₹7,499</span>
                  <span className="text-5xl font-bold text-sunrise-gold">₹5,499</span>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                Discounted Rate
              </div>
            </div>
            
            <div>
              <p className="text-sm text-white/50 mb-2">Book Your Seat Now At</p>
              <p className="text-4xl font-bold text-white mb-2">₹999/- <span className="text-sm font-normal text-white/40">only</span></p>
              <p className="text-xs text-white/50 italic">Pay the remaining amount 7 days before departure.</p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-white/10">
              {[
                "Priority Seating (Front rows)",
                "Exclusive DU Batch 2026 T-Shirt",
                "Free Photography Coverage",
                "Instant Confirmation"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 text-sunrise-gold" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center gap-4 text-white/40 text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
            <Shield className="w-6 h-6 text-sunrise-gold shrink-0" />
            <p>100% Secure Payment via Razorpay. Encrypted & Safe.</p>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-6">Traveler Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/50 uppercase">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/50 uppercase">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold tracking-widest text-white/50 uppercase">WhatsApp Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="+91"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="college" className="text-xs font-bold tracking-widest text-white/50 uppercase">College / University</label>
              <input
                id="college"
                name="college"
                type="text"
                required
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="E.g., Hindu College, DU"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-xs font-bold tracking-widest text-white/50 uppercase">Select Batch</label>
              <select
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white appearance-none"
              >
                <option value="21st June 2026">21st June - 25th June 2026 (DU Special)</option>
                <option value="28th June 2026">28th June - 2nd July 2026</option>
              </select>
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
              {isSubmitting ? 'Securing Seat...' : 'Pay ₹999 & Book Seat'}
            </motion.button>
            <p className="text-center text-xs text-white/30 mt-4">
              You will be redirected to Razorpay securely.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
