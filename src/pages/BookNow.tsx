import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PAYMENT_LINK } from '../constants';
import { ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    date: '21st June 2026'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Razorpay payment link after "saving" data
    window.location.href = PAYMENT_LINK;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-6 pb-12">
      {/* Background element */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen" />
      
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-sunrise-gold text-black font-bold text-lg py-4 rounded-xl mt-6 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-shadow"
            >
              Pay ₹999 & Book Seat
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
