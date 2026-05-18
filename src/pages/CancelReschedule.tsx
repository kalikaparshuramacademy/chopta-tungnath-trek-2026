import { Footer } from '../components/Footer';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, AlertTriangle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BATCHES = [
  '6th June 2026',
  '11th June 2026',
  '14th June 2026',
  '20th June 2026',
  '23rd June 2026',
  '26th June 2026',
  '28th June 2026',
  '30th June 2026',
  '3rd July 2026',
  '6th July 2026',
];

const INPUT = 'w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/30 transition-all text-white placeholder-white/20';
const LABEL = 'text-xs font-bold tracking-widest text-white/50 uppercase';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch_date: string;
  sharing_type: string;
  payment_status: string;
  registration_type: string;
  group_size: number;
}

export const CancelReschedule = () => {
  const [step, setStep] = useState<'find' | 'confirm' | 'done'>('find');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState<'cancel' | 'reschedule'>('reschedule');
  const [newBatch, setNewBatch] = useState('');
  const [reason, setReason] = useState('');

  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [registration, setRegistration] = useState<Registration | null>(null);

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await supabase
        .from('registrations')
        .select('id, name, email, phone, batch_date, sharing_type, payment_status, registration_type, group_size')
        .eq('email', searchEmail.trim().toLowerCase())
        .eq('phone', searchPhone.trim())
        .single();

      if (err || !data) {
        setError('No booking found with these details. Please check your email and phone number.');
        setLoading(false);
        return;
      }

      if (data.payment_status !== 'paid') {
        setError('Only confirmed (paid) bookings can be managed here. Please complete your payment first.');
        setLoading(false);
        return;
      }

      setRegistration(data);
      setStep('confirm');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration) return;
    if (action === 'reschedule' && !newBatch) { setError('Please select a new batch.'); return; }
    if (!reason.trim()) { setError('Please provide a reason.'); return; }

    setLoading(true);
    setError('');

    try {
      // Insert a cancellation/reschedule request
      const { error: err } = await supabase
        .from('reschedule_requests')
        .insert([{
          registration_id: registration.id,
          name: registration.name,
          email: registration.email,
          phone: registration.phone,
          current_batch: registration.batch_date,
          action_type: action,
          requested_batch: action === 'reschedule' ? newBatch : null,
          reason,
          status: 'pending',
        }]);

      if (err) {
        // Table might not exist yet — send via WhatsApp fallback
        const msg = encodeURIComponent(
          `Hi! I want to ${action} my booking.\nName: ${registration.name}\nEmail: ${registration.email}\nPhone: ${registration.phone}\nCurrent Batch: ${registration.batch_date}${action === 'reschedule' ? `\nRequested Batch: ${newBatch}` : ''}\nReason: ${reason}`
        );
        window.open(`https://wa.me/919266910290?text=${msg}`, '_blank');
      }

      setStep('done');
    } catch {
      setError('Failed to submit request. Please contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-4 pb-16 relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sunrise-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-lg mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold mb-4">
            BOOKING MANAGEMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-glow mb-3">
            Cancel or <span className="text-sunrise-gold font-serif italic">Reschedule</span>
          </h1>
          <p className="text-white/50 text-sm">Manage your Chopta Tungnath Trip booking online.</p>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Find Booking */}
          {step === 'find' && (
            <motion.div key="find" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass-dark p-8 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-sunrise-gold/10 rounded-xl flex items-center justify-center">
                    <Search className="w-5 h-5 text-sunrise-gold" />
                  </div>
                  <div>
                    <p className="font-bold">Find Your Booking</p>
                    <p className="text-white/40 text-xs">Enter your registered email & phone</p>
                  </div>
                </div>

                <form onSubmit={handleFind} className="space-y-5">
                  <div className="space-y-2">
                    <label className={LABEL}>Registered Email *</label>
                    <input type="email" required value={searchEmail} onChange={e => setSearchEmail(e.target.value)}
                      className={INPUT} placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className={LABEL}>WhatsApp Number *</label>
                    <input type="tel" required value={searchPhone} onChange={e => setSearchPhone(e.target.value)}
                      className={INPUT} placeholder="+91XXXXXXXXXX" />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-sunrise-gold text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    {loading ? 'Searching...' : 'Find My Booking'}
                  </button>
                </form>
              </div>

              <div className="mt-4 text-center">
                <p className="text-white/30 text-xs">
                  Can't find it?{' '}
                  <a href="https://wa.me/919266910290" target="_blank" rel="noopener noreferrer"
                    className="text-sunrise-gold hover:underline">Contact us on WhatsApp</a>
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Confirm Action */}
          {step === 'confirm' && registration && (
            <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Booking Summary */}
              <div className="glass-dark p-6 rounded-2xl border border-white/10 mb-6">
                <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">Your Booking</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Name', val: registration.name },
                    { label: 'Batch', val: registration.batch_date },
                    { label: 'Sharing', val: registration.sharing_type + ' sharing' },
                    { label: 'Type', val: registration.registration_type },
                    { label: 'Group Size', val: String(registration.group_size) },
                    { label: 'Status', val: registration.payment_status },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-white/40 text-[10px] uppercase">{label}</p>
                      <p className="font-bold capitalize">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-3xl border border-white/10 space-y-5">
                {/* Action selector */}
                <div className="space-y-2">
                  <p className={LABEL}>What would you like to do? *</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: 'reschedule', label: '📅 Reschedule', desc: 'Move to a different batch' },
                      { val: 'cancel', label: '❌ Cancel', desc: 'Cancel my booking' },
                    ].map(opt => (
                      <button key={opt.val} type="button" onClick={() => setAction(opt.val as any)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          action === opt.val
                            ? 'bg-sunrise-gold/10 border-sunrise-gold/50 text-sunrise-gold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <p className="font-bold text-sm">{opt.label}</p>
                        <p className="text-xs opacity-60 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* New batch selector (reschedule only) */}
                {action === 'reschedule' && (
                  <div className="space-y-2">
                    <label className={LABEL}>Select New Batch *</label>
                    <select value={newBatch} onChange={e => setNewBatch(e.target.value)}
                      className={INPUT} required>
                      <option value="">Choose a batch...</option>
                      {BATCHES.filter(b => b !== registration.batch_date).map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}

                {action === 'cancel' && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">⚠️ Cancellation Policy</p>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Cancellations made 15+ days before departure receive a 75% refund. Less than 7 days: no refund.
                      Please refer to our full <Link to="/refund-policy" className="text-sunrise-gold hover:underline">Refund Policy</Link>.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className={LABEL}>Reason *</label>
                  <textarea value={reason} onChange={e => setReason(e.target.value)} required rows={3}
                    className={INPUT + ' resize-none'} placeholder="Please tell us the reason for your request..." />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-sunrise-gold text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  {loading ? 'Submitting...' : `Submit ${action === 'reschedule' ? 'Reschedule' : 'Cancellation'} Request`}
                </button>

                <button type="button" onClick={() => { setStep('find'); setError(''); }}
                  className="w-full py-3 text-sm text-white/40 hover:text-white transition-colors">
                  ← Go back
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Done */}
          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-10 rounded-3xl border border-white/10 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-500/10">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Request <span className="text-green-400">Submitted!</span></h2>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                Your {action === 'reschedule' ? 'reschedule' : 'cancellation'} request has been submitted.
                Our team will review it and contact you within 24–48 hours on your registered WhatsApp number.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 bg-sunrise-gold text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
                Back to Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    <Footer />
    </div>
  );
};
