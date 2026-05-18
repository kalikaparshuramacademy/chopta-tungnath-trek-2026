import { Footer } from '../components/Footer';
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
    followers_count: '',
    content_type: '',
    gender: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('influencers')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          instagram_handle: formData.instagram_handle,
          followers_count: formData.followers_count,
          content_type: formData.content_type,
          gender: formData.gender
        }])
        .select();

      if (error) {
        console.error('[InfluencerApply] ❌ INSERT failed:', error.code, error.message);
        alert(`Error [${error.code}]: ${error.message}`);
        return;
      }

      console.log('[InfluencerApply] ✅ Saved:', data);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      console.error('[InfluencerApply] ❌ JS error:', err);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Application Received!</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Thank you for applying to our Influencer Collaboration program. Our team will review your profile and reach out on WhatsApp within 48 hours.
          </p>
          <p className="text-sunrise-gold text-sm font-bold tracking-widest uppercase">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-6 pb-12 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/media__1778044315001.webp')] bg-cover bg-center mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Creator <span className="text-sunrise-gold">Collab Program</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Travel to the Himalayas for free. Create stunning content. Earn your audience's respect — and some cash too.
          </p>
          <ul className="space-y-4">
            {[
              'Fully funded Himalayan trip',
              'Exclusive media access & shoots',
              'Sponsored content opportunities',
              'Co-branded promotions & revenue share'
            ].map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <CheckCircle className="w-5 h-5 text-sunrise-gold shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6 relative z-10">Your Application</h2>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-white/50 uppercase">Full Name *</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="Enter your full name" />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-white/50 uppercase">Email *</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-bold tracking-widest text-white/50 uppercase">WhatsApp No. *</label>
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="+91" />
              </div>
            </div>

            {/* Instagram + Followers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="instagram_handle" className="text-xs font-bold tracking-widest text-white/50 uppercase">Instagram Handle *</label>
                <input id="instagram_handle" name="instagram_handle" type="text" required value={formData.instagram_handle} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                  placeholder="@yourhandle" />
              </div>
              <div className="space-y-2">
                <label htmlFor="followers_count" className="text-xs font-bold tracking-widest text-white/50 uppercase">Followers Count *</label>
                <select id="followers_count" name="followers_count" required value={formData.followers_count} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white appearance-none">
                  <option value="">Select Range</option>
                  <option value="1K–5K">1K – 5K</option>
                  <option value="5K–10K">5K – 10K</option>
                  <option value="10K–50K">10K – 50K</option>
                  <option value="50K–100K">50K – 100K</option>
                  <option value="100K+">100K+</option>
                </select>
              </div>
            </div>

            {/* Content Type */}
            <div className="space-y-2">
              <label htmlFor="content_type" className="text-xs font-bold tracking-widest text-white/50 uppercase">Type of Content You Make *</label>
              <select id="content_type" name="content_type" required value={formData.content_type} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white appearance-none">
                <option value="">Select Content Type</option>
                <option value="Travel & Adventure">Travel & Adventure</option>
                <option value="Lifestyle & Vlogs">Lifestyle & Vlogs</option>
                <option value="Photography & Reels">Photography & Reels</option>
                <option value="Fitness & Outdoor">Fitness & Outdoor</option>
                <option value="Food & Culture">Food & Culture</option>
                <option value="Education & Motivation">Education & Motivation</option>
                <option value="Comedy & Entertainment">Comedy & Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender" className="text-xs font-bold tracking-widest text-white/50 uppercase">Gender *</label>
              <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white appearance-none">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold text-lg py-4 rounded-xl mt-2 transition-all ${
                isSubmitting ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-sunrise-gold text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]'
              }`}
            >
              {isSubmitting ? 'Submitting Application...' : 'Apply as Influencer'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
};
