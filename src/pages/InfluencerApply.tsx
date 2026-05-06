import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Instagram } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const InfluencerApply = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram_handle: '',
    followers_count: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('influencers')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            instagram_handle: formData.instagram_handle,
            followers_count: formData.followers_count
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Application Received!</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Thank you for applying to our Creator Collab program. Our team will review your profile and reach out via email or WhatsApp.
          </p>
          <p className="text-pink-400 text-sm font-bold tracking-widest uppercase">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-pink-400 selection:text-black pt-24 px-6 pb-12 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/hero_bg_1778044589465.png')] bg-cover bg-center mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-pink-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="w-16 h-16 bg-pink-500/10 text-pink-400 rounded-full flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-bold tracking-tighter mb-4">
            Creator <br/><span className="text-pink-400">Collaboration</span>
          </h1>
          
          <p className="text-white/60 mb-8 leading-relaxed">
            Are you a travel creator or influencer? Join us on the Chopta Tungnath Trek for a fully-sponsored experience in exchange for content creation.
          </p>

          <ul className="space-y-4">
            {[
              "Fully sponsored trip",
              "VIP accommodations",
              "Exclusive creator access",
              "Professional photography"
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm font-bold text-white/80">
                <CheckCircle className="w-5 h-5 text-pink-400" />
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-2xl font-bold mb-6">Creator Application</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/50 uppercase">Full Name</label>
              <input
                id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-white placeholder-white/20"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/50 uppercase">Email Address</label>
                <input
                  id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-white placeholder-white/20"
                  placeholder="hello@creator.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold tracking-widest text-white/50 uppercase">WhatsApp Number</label>
                <input
                  id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-white placeholder-white/20"
                  placeholder="+91"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="instagram_handle" className="text-xs font-bold tracking-widest text-white/50 uppercase">Instagram Handle</label>
                <input
                  id="instagram_handle" name="instagram_handle" type="text" required value={formData.instagram_handle} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-white placeholder-white/20"
                  placeholder="@yourhandle"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="followers_count" className="text-xs font-bold tracking-widest text-white/50 uppercase">Follower Count</label>
                <select
                  id="followers_count" name="followers_count" required value={formData.followers_count} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-white appearance-none"
                >
                  <option value="" disabled>Select range...</option>
                  <option value="5k - 10k">5k - 10k</option>
                  <option value="10k - 50k">10k - 50k</option>
                  <option value="50k - 100k">50k - 100k</option>
                  <option value="100k+">100k+</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold text-lg py-4 rounded-xl mt-6 shadow-[0_0_20px_rgba(244,114,182,0.3)] transition-all ${
                isSubmitting ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-pink-500 text-white hover:shadow-[0_0_30px_rgba(244,114,182,0.5)]'
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
