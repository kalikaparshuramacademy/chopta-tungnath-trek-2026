import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  IndianRupee,
  Copy,
  CheckCircle2,
  LogOut,
  Share2,
  BarChart3,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const INPUT =
  'w-full bg-himalaya-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/60 focus:ring-1 focus:ring-sunrise-gold/30 transition-all text-white placeholder-white/20';
const LABEL = 'text-xs font-bold tracking-widest text-white/50 uppercase';

interface Creator {
  id: number;
  name: string;
  code: string;
  commission_per_registration: number;
  total_registrations?: number;
  total_earned?: number;
}

interface Registration {
  id: number;
  name: string;
  batch_date: string;
  sharing_type: string;
  payment_status: string;
  created_at: string;
}

export const CreatorLogin = () => {
  const [step, setStep] = useState<'login' | 'dashboard'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [credentials, setCredentials] = useState({ code: '', password: '' });
  const [creator, setCreator] = useState<Creator | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch creator by code + password
      const { data, error: fetchError } = await supabase
        .from('creator_codes')
        .select('*')
        .eq('code', credentials.code.trim().toUpperCase())
        .eq('password', credentials.password.trim())
        .single();

      if (fetchError || !data) {
        setError('Invalid creator code or password. Please try again.');
        setLoading(false);
        return;
      }

      // Fetch registrations using this code
      const { data: regs, error: regsError } = await supabase
        .from('registrations')
        .select('id, name, batch_date, sharing_type, payment_status, created_at')
        .eq('referral_code', data.code)
        .order('created_at', { ascending: false });

      const paidRegs = (regs || []).filter(r => r.payment_status === 'paid');

      setCreator({
        ...data,
        total_registrations: paidRegs.length,
        total_earned: paidRegs.length * (data.commission_per_registration ?? 500),
      });
      setRegistrations(regs || []);
      setStep('dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!creator) return;
    navigator.clipboard.writeText(creator.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    const url = `https://choptatungnathtrek.vercel.app/book?ref=${creator?.code}`;
    if (navigator.share) {
      navigator.share({ title: 'Book Chopta Tungnath Trek', url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (step === 'dashboard' && creator) {
    const paidCount = registrations.filter(r => r.payment_status === 'paid').length;
    const pendingCount = registrations.filter(r => r.payment_status !== 'paid').length;
    const totalEarned = paidCount * (creator.commission_per_registration ?? 500);

    return (
      <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />

        {/* Top Bar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 glass">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold">choptatungnathtrek.vercel.app</span>
          </Link>
          <div className="text-xs font-bold tracking-widest text-sunrise-gold uppercase">Creator Portal</div>
          <button
            onClick={() => { setStep('login'); setCreator(null); setRegistrations([]); }}
            className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <p className="text-sunrise-gold text-xs font-bold tracking-[0.3em] uppercase">Creator Dashboard</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Welcome, <span className="text-sunrise-gold">{creator.name.split(' ')[0]}! 👋</span>
            </h1>
            <p className="text-white/50 text-sm">Track your referrals and earnings in real time.</p>
          </motion.div>

          {/* Referral Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-dark p-6 rounded-3xl border border-sunrise-gold/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
            <p className={LABEL + ' mb-2'}>Your Unique Referral Code</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-4xl md:text-6xl font-black tracking-[0.15em] text-sunrise-gold font-mono">
                {creator.code}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-bold hover:bg-white/15 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={shareLink}
                  className="flex items-center gap-2 bg-sunrise-gold text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-3">
              Your customers get <strong className="text-green-400">₹500 off</strong> and you earn{' '}
              <strong className="text-sunrise-gold">₹{creator.commission_per_registration ?? 500} commission</strong> per successful registration.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Paid Registrations',
                value: paidCount,
                icon: Users,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
              },
              {
                label: 'Total Earned',
                value: `₹${totalEarned.toLocaleString('en-IN')}`,
                icon: IndianRupee,
                color: 'text-sunrise-gold',
                bg: 'bg-sunrise-gold/10',
                border: 'border-sunrise-gold/20',
              },
              {
                label: 'Pending / Incomplete',
                value: pendingCount,
                icon: BarChart3,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/20',
              },
            ].map(({ label, value, icon: Icon, color, bg, border }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className={`glass-dark p-6 rounded-2xl border ${border} relative overflow-hidden`}
              >
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-3xl font-black tracking-tight">{value}</p>
                <p className="text-white/40 text-xs mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Registrations Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-dark rounded-3xl border border-white/5 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-sunrise-gold" />
              <h2 className="font-bold text-lg">All Referral Registrations</h2>
              <span className="ml-auto bg-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full">
                {registrations.length} total
              </span>
            </div>

            {registrations.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-white/30 text-4xl mb-4">🏔️</p>
                <p className="text-white/40 font-medium">No registrations yet.</p>
                <p className="text-white/25 text-sm mt-1">Share your code and start earning!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Traveler</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Batch</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Sharing</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Commission</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, i) => {
                      const isPaid = reg.payment_status === 'paid';
                      return (
                        <tr
                          key={reg.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium">{reg.name}</td>
                          <td className="px-6 py-4 text-white/60">{reg.batch_date}</td>
                          <td className="px-6 py-4 text-white/60 capitalize">{reg.sharing_type}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isPaid
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {isPaid ? '✓ Paid' : '⏳ Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {isPaid ? (
                              <span className="text-sunrise-gold font-bold">
                                ₹{(creator.commission_per_registration ?? 500).toLocaleString('en-IN')}
                              </span>
                            ) : (
                              <span className="text-white/25">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-white/40 text-xs">
                            {new Date(reg.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Payout Note */}
          <p className="text-center text-xs text-white/25 pb-4">
            Commission payouts are processed within 7 business days after trip completion. For queries, reach us on WhatsApp at{' '}
            <a href="https://wa.me/919266910290" className="text-sunrise-gold hover:underline">
              +91 92669 10290
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  // ── LOGIN FORM ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-himalaya-black via-himalaya-black to-black/90" />

      {/* Glowing orb */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sunrise-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sunrise-gold/10 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

          <div className="relative z-10">
            {/* Logo area */}
            <div className="w-14 h-14 rounded-2xl bg-sunrise-gold/20 border border-sunrise-gold/30 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-sunrise-gold" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight mb-1">Creator Login</h1>
            <p className="text-white/40 text-sm mb-8">
              Access your referral dashboard to track registrations & earnings.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="code" className={LABEL}>
                  Your Referral Code
                </label>
                <input
                  id="code"
                  type="text"
                  required
                  value={credentials.code}
                  onChange={e => setCredentials(p => ({ ...p, code: e.target.value }))}
                  className={INPUT + ' uppercase tracking-[0.2em] font-bold'}
                  placeholder="E.g. RAHUL500"
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className={LABEL}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={credentials.password}
                    onChange={e => setCredentials(p => ({ ...p, password: e.target.value }))}
                    className={INPUT + ' pr-12'}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 font-bold text-lg py-4 rounded-xl transition-all ${
                  loading
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-sunrise-gold text-black hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    View My Dashboard
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center text-xs text-white/25 mt-6">
              Don't have a creator account?{' '}
              <a
                href="https://wa.me/919266910290?text=Hi!%20I%20want%20to%20become%20a%20creator%20for%20the%20Chopta%20Tungnath%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sunrise-gold hover:underline"
              >
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
