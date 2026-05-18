import { Footer } from '../components/Footer';
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
    year_of_study: '',
    date_of_birth: '',
    gender: '',
    societies: '',
    why_join: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('ambassadors')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          year_of_study: formData.year_of_study,
          date_of_birth: formData.date_of_birth || null,
          gender: formData.gender,
          societies: formData.societies,
          why_join: formData.why_join
        }])
        .select();

      if (error) {
        console.error('[AmbassadorApply] ❌ INSERT failed:', error.code, error.message);
        alert(`Error [${error.code}]: ${error.message}`);
        return;
      }

      console.log('[AmbassadorApply] ✅ Saved:', data);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      console.error('[AmbassadorApply] ❌ JS error:', err);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Become a <span className="text-sunrise-gold">Campus Leader</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Lead the charge at your college. Bring 8 friends, travel for free, and earn real cash bonuses for your network.
          </p>
          <ul className="space-y-4">
            {['Free fully-funded trip', '₹500 bonus per referral', 'Official CV Certificate', 'Exclusive Networking'].map((b, i) => (
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
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

            {/* College */}
            <div className="space-y-2">
              <label htmlFor="college" className="text-xs font-bold tracking-widest text-white/50 uppercase">College / University *</label>
              <input id="college" name="college" type="text" required value={formData.college} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="E.g., Hindu College, DU" />
            </div>

            {/* Year + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="year_of_study" className="text-xs font-bold tracking-widest text-white/50 uppercase">Year of Study *</label>
                <select id="year_of_study" name="year_of_study" required value={formData.year_of_study} onChange={handleChange}
                  className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white appearance-none">
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
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
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label htmlFor="date_of_birth" className="text-xs font-bold tracking-widest text-white/50 uppercase">Date of Birth *</label>
              <input id="date_of_birth" name="date_of_birth" type="date" required value={formData.date_of_birth} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white"
                max={new Date().toISOString().split('T')[0]} />
            </div>

            {/* Societies */}
            <div className="space-y-2">
              <label htmlFor="societies" className="text-xs font-bold tracking-widest text-white/50 uppercase">Societies / Clubs you're in</label>
              <input id="societies" name="societies" type="text" value={formData.societies} onChange={handleChange}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20"
                placeholder="E.g., Dramatics Society, NSS, Photography Club..." />
            </div>

            {/* Why Join */}
            <div className="space-y-2">
              <label htmlFor="why_join" className="text-xs font-bold tracking-widest text-white/50 uppercase">Why do you want to join? *</label>
              <textarea id="why_join" name="why_join" required value={formData.why_join} onChange={handleChange}
                rows={3}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20 resize-none"
                placeholder="Tell us your motivation..." />
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
              {isSubmitting ? 'Submitting Application...' : 'Apply as Campus Ambassador'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
};
