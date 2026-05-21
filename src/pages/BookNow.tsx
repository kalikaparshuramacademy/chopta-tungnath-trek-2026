import { Footer } from '../components/Footer';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, Shield, Users, User, AlertTriangle, Info, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// ── Razorpay Type Definition ──────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: any;
  }
}

// ── Pricing constants ────────────────────────────────────────────────────────
const BASE_PRICE = 5999;
const TOKEN_AMOUNT = 999;
const TRIP_NAME = 'Chopta Tungnath Trip 2026';

const GROUP_DISCOUNTS: Record<number, number> = { 3: 200, 4: 300, 6: 400, 8: 500 };
function getGroupDiscount(size: number): number {
  if (size >= 8) return GROUP_DISCOUNTS[8];
  if (size >= 6) return GROUP_DISCOUNTS[6];
  if (size >= 4) return GROUP_DISCOUNTS[4];
  if (size >= 3) return GROUP_DISCOUNTS[3];
  return 0;
}

const ALL_BATCHES = [
  { value: '6th June 2026',  label: '6th June – 10th June 2026' },
  { value: '11th June 2026', label: '11th June – 15th June 2026' },
  { value: '14th June 2026', label: '14th June – 18th June 2026' },
  { value: '20th June 2026', label: '20th June – 24th June 2026' },
  { value: '23rd June 2026', label: '23rd June – 27th June 2026' },
  { value: '26th June 2026', label: '26th June – 30th June 2026' },
  { value: '28th June 2026', label: '28th June – 2nd July 2026' },
  { value: '30th June 2026', label: '30th June – 4th July 2026' },
  { value: '3rd July 2026',  label: '3rd July – 7th July 2026' },
  { value: '6th July 2026',  label: '6th July – 10th July 2026' },
];

// ── Input style ───────────────────────────────────────────────────────────────
const INPUT = 'w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sunrise-gold/50 focus:ring-1 focus:ring-sunrise-gold/50 transition-all text-white placeholder-white/20';
const LABEL = 'text-xs font-bold tracking-widest text-white/50 uppercase';

export const BookNow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationType, setRegistrationType] = useState<'individual' | 'group'>('individual');
  const [sharingType, setSharingType] = useState<'quad' | 'triple' | 'double'>('quad');
  const [successId, setSuccessId] = useState<number | null>(null);
  const [members, setMembers] = useState<{ name: string; phone: string }[]>([]);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [validReferral, setValidReferral] = useState<{code: string, discount: number} | null>(null);
  const [referralError, setReferralError] = useState('');

  const [formData, setFormData] = useState({
    // Lead contact
    name: '',
    email: '',
    phone: '',
    gender: '',              // Male | Female | Other
    occupation: '',
    organisation: '',        // college / company / institute
    date: '11th June 2026',

    // Group-specific
    groupSize: 1,
    memberNames: '',         // comma-separated full names
    memberContacts: '',      // comma-separated contact numbers
    maleCount: 0,
    femaleCount: 0,

    // Offer
    referralCode: '',
    discountChoice: 'none' as 'none' | 'group' | 'referral',

    // Declaration
    declarationAccepted: false,
  });

  // ── Computed discount ────────────────────────────────────────────────────
  const effectiveGroupSize = registrationType === 'group' ? 1 + members.length : 1;
  const groupDiscountPerPerson = registrationType === 'group' ? getGroupDiscount(effectiveGroupSize) : 0;

  // Customer chooses EITHER group discount OR referral code — not both
  const referralDiscount = formData.discountChoice === 'referral' && validReferral ? validReferral.discount : 0;
  const appliedDiscount = formData.discountChoice === 'group' ? groupDiscountPerPerson : referralDiscount;

  const currentBasePrice = sharingType === 'quad' ? 5999 : sharingType === 'triple' ? 6499 : 6999;
  const effectivePrice = Math.max(0, currentBasePrice - appliedDiscount);
  const totalGroupSaving = appliedDiscount * effectiveGroupSize;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));

    if (name === 'referralCode') {
      setValidReferral(null);
      setReferralError('');
    }
  };

  const handleApplyCode = async () => {
    const code = formData.referralCode.trim().toUpperCase();
    if (!code) return;
    setIsValidatingCode(true);
    setReferralError('');
    try {
      const { data, error } = await supabase.from('creator_codes').select('*').eq('code', code).single();
      if (error || !data) {
        setReferralError('Invalid referral code');
        setValidReferral(null);
      } else {
        setValidReferral({ code: data.code, discount: 500 });
      }
    } catch(e) {
      setReferralError('Error validating code');
      setValidReferral(null);
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate declaration
    if (!formData.declarationAccepted) {
      alert('Please accept the declaration to proceed.');
      return;
    }

    // Validate gender count for groups
    if (registrationType === 'group') {
      const totalGenderCount = formData.maleCount + formData.femaleCount;
      if (totalGenderCount !== effectiveGroupSize) {
        alert(`Male + Female count must equal group size (${effectiveGroupSize}). Currently: ${totalGenderCount}`);
        return;
      }
    }



    setIsSubmitting(true);

    try {
      // ── Step 0: Check Razorpay Key ──────────────────────────────────────
      const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!rzpKey) {
        console.error('[BookNow] ❌ VITE_RAZORPAY_KEY_ID is missing in environment variables');
        alert('Payment system configuration error. Please contact support.');
        setIsSubmitting(false);
        return;
      }

      // ── Step 1: Create a PENDING registration ───────────────────────────
      const initialPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        occupation: formData.occupation,
        college: formData.organisation,
        batch_date: formData.date,
        registration_type: registrationType,
        sharing_type: sharingType,
        group_size: effectiveGroupSize,
        member_names: registrationType === 'group' ? [formData.name, ...members.map(m => m.name)].filter(Boolean).join(', ') : formData.name,
        group_contacts: registrationType === 'group' ? [`${formData.name}: ${formData.phone}`, ...members.map(m => `${m.name}: ${m.phone}`)].join('\n') : formData.phone,
        male_count: formData.maleCount || (registrationType === 'individual' ? 1 : 0),
        female_count: formData.femaleCount,
        discount_per_person: appliedDiscount,
        total_discount: totalGroupSaving,
        referral_code: formData.referralCode ? formData.referralCode.toUpperCase() : '',
        declaration_accepted: formData.declarationAccepted,
        payment_status: 'pending', // Initially pending
      };

      console.log('[BookNow] 🚀 Creating pending registration...');
      const { data: regData, error: regError } = await supabase
        .from('registrations')
        .insert([initialPayload])
        .select()
        .single();

      if (regError) {
        console.error('[BookNow] ❌ Supabase Insert Error:', regError);
        throw new Error(`Database Error: ${regError.message || 'Unknown error'}`);
      }
      
      const registrationId = regData.id;
      console.log('[BookNow] ✅ Registration created:', registrationId);

      // ── Step 2: Trigger Razorpay ────────────────────────────────────────
      const totalAmount = TOKEN_AMOUNT * effectiveGroupSize;

      const options = {
        key: rzpKey,
        amount: totalAmount * 100, // amount in paisa
        currency: 'INR',
        name: 'Peak & River Travels',
        description: `${TRIP_NAME} - ${registrationType === 'individual' ? 'Individual' : 'Group'} Booking`,
        image: 'https://choptatungnathtrek.vercel.app/images/peak_river_travels_logo_circular_1778134539480.png',
        handler: async function (response: any) {
          console.log('[BookNow] 💳 Razorpay Payment Success:', response.razorpay_payment_id);
          try {
            // Update the pending record to 'paid'
            const { error: updateError } = await supabase
              .from('registrations')
              .update({
                payment_id: response.razorpay_payment_id,
                payment_status: 'paid',
              })
              .eq('id', registrationId);

            if (updateError) throw updateError;

            console.log('[BookNow] 🎉 Payment status updated in database');
            setSuccessId(registrationId);
            setIsSubmitting(false);
          } catch (err: any) {
            console.error('[BookNow] ❌ Post-payment update failed:', err);
            alert('Payment was successful, but we failed to update your record. PLEASE SCREENSHOT YOUR PAYMENT ID and contact us!');
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          registration_id: registrationId, // CRITICAL: Used by Webhook
          trip: TRIP_NAME,
          batch: formData.date,
        },
        theme: {
          color: '#FFD700',
        },
        modal: {
          ondismiss: function () {
            console.log('[BookNow] ℹ️ Razorpay modal dismissed');
            setIsSubmitting(false);
          }
        }
      };

      if (!window.Razorpay) {
        console.error('[BookNow] ❌ Razorpay SDK not found on window object');
        alert('Razorpay SDK not loaded. Please check your internet connection.');
        setIsSubmitting(false);
        return;
      }
      
      console.log('[BookNow] 💳 Opening Razorpay Modal...');
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('[BookNow] ❌ Razorpay Payment Failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error('[BookNow] ❌ Booking process failed:', err);
      alert(err.message || 'Failed to initiate booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (successId) {
    return (
      <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full glass p-12 rounded-[3rem] border border-white/10 text-center relative z-10"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)] ring-8 ring-green-500/10">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Booking <span className="text-sunrise-gold italic font-serif">Confirmed!</span></h1>
          <p className="text-white/60 mb-10 leading-relaxed">
            Your seat for the Chopta Tungnath Trip 2026 is successfully secured. A confirmation receipt has been generated for your records.
          </p>
          
          <div className="space-y-4">
            <Link 
              to={`/invoice/${successId}`}
              className="flex items-center justify-center gap-3 w-full bg-sunrise-gold text-black py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,215,0,0.2)]"
            >
              <Info className="w-5 h-5" />
              Download Receipt
            </Link>
            
            <Link 
              to="/"
              className="flex items-center justify-center gap-2 w-full glass py-5 rounded-2xl font-bold text-white/70 hover:bg-white/10 transition-all"
            >
              Back to Home
            </Link>
          </div>
          
          <div className="mt-12 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Next Steps</p>
            <p className="text-xs text-white/40 italic">Check your WhatsApp for the onboarding guide within 24 hours.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-4 pb-16">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ── LEFT: Pricing Summary ─────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow mb-2">
            Secure Your <span className="text-sunrise-gold">Seat</span>
          </h1>
          
          <p className="text-sunrise-gold font-bold text-sm mb-2 uppercase tracking-widest">
            🔥 Discounts valid till 16th May! Register Fast!
          </p>

          <div className="mb-6">
            <Link to="/find-booking" className="text-white/50 hover:text-sunrise-gold transition-colors text-sm font-medium">
              Already booked? <span className="underline">Find your receipt here</span> →
            </Link>
          </div>

          <div className="glass-dark p-8 rounded-3xl border border-white/10 mb-6 space-y-5">
            <div className="flex justify-between items-end border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-white/50 mb-1">Trek Cost Per Person</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold line-through text-white/30">₹7,499</span>
                  <span className="text-4xl font-bold text-sunrise-gold">₹{effectivePrice.toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-green-400 text-sm mt-1 font-bold">
                    🎉 ₹{appliedDiscount} off per person
                    {registrationType === 'group' && effectiveGroupSize > 1 && ` × ${effectiveGroupSize} = ₹${totalGroupSaving.toLocaleString('en-IN')} total saved`}
                  </p>
                )}
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                {appliedDiscount > 0 ? `₹${appliedDiscount} Discount Applied` : 'Best Price'}
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm text-white/50 mb-1">Book Now — Pay Token</p>
              <p className="text-3xl font-bold text-white">₹{TOKEN_AMOUNT}/- <span className="text-sm font-normal text-white/40">per person</span></p>
              <p className="text-xs text-white/50 italic mt-1">Remaining amount due 7 days before departure.</p>
            </div>

            <ul className="space-y-2 border-t border-white/10 pt-4">
              {['Priority Seating', 'Free Photography Coverage', 'Instant Confirmation', 'Dedicated Trip Support'].map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 text-sunrise-gold shrink-0" />{b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 text-white/40 text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
            <Shield className="w-5 h-5 text-sunrise-gold shrink-0" />
            <p>100% Secure Payment via Razorpay. Encrypted & Safe.</p>
          </div>
        </motion.div>

        {/* ── RIGHT: Form ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/10 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-2xl font-bold mb-2 relative z-10">Traveler Details</h2>
          <p className="text-white/40 text-sm mb-6 relative z-10">Open to students, working professionals & everyone adventurous!</p>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

            {/* ── REGISTRATION TYPE ────────────────────────────────────── */}
            <div className="space-y-2">
              <p className={LABEL}>Registration Type *</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setRegistrationType('individual'); setFormData(p => ({ ...p, groupSize: 1 })); }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all ${
                    registrationType === 'individual' ? 'bg-sunrise-gold text-black border-sunrise-gold' : 'bg-himalaya-black/50 border-white/10 text-white/70 hover:border-white/30'
                  }`}>
                  <User className="w-4 h-4" />
                  Individual
                </button>
                <button type="button" onClick={() => { setRegistrationType('group'); setFormData(p => ({ ...p, groupSize: 3 })); }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all ${
                    registrationType === 'group' ? 'bg-sunrise-gold text-black border-sunrise-gold' : 'bg-himalaya-black/50 border-white/10 text-white/70 hover:border-white/30'
                  }`}>
                  <Users className="w-4 h-4" />
                  Group
                </button>
              </div>
            </div>

            {/* ── SHARING TYPE ────────────────────────────────────────── */}
            <div className="space-y-2">
              <label htmlFor="sharingType" className={LABEL}>Select Sharing *</label>
              <select 
                id="sharingType" 
                name="sharingType" 
                className={INPUT}
                value={sharingType}
                onChange={(e) => setSharingType(e.target.value as 'quad' | 'triple' | 'double')}
              >
                <option value="quad">Quad Sharing (₹5,999)</option>
                <option value="triple">Triple Sharing (₹6,499)</option>
                <option value="double">Double Sharing (₹6,999)</option>
              </select>
            </div>

            {/* ── LEAD CONTACT DETAILS ─────────────────────────────────── */}
            <div className="space-y-2">
              <label htmlFor="name" className={LABEL}>Your Full Name (Lead Contact) *</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                className={INPUT} placeholder="Enter your full name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={LABEL}>Email *</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                className={INPUT} placeholder="you@example.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className={LABEL}>WhatsApp No. *</label>
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  className={INPUT} placeholder="+91" />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className={LABEL}>Gender *</label>
                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}
                  className={INPUT}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Occupation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="occupation" className={LABEL}>Occupation *</label>
                <select id="occupation" name="occupation" required value={formData.occupation} onChange={handleChange}
                  className={INPUT}>
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Self-employed">Self-employed / Freelancer</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="organisation" className={LABEL}>
                  {formData.occupation === 'Student' ? 'College / University' : 'Organisation / Company'} *
                </label>
                <input id="organisation" name="organisation" type="text" required value={formData.organisation} onChange={handleChange}
                  className={INPUT} placeholder={formData.occupation === 'Student' ? 'E.g., Hindu College, DU' : 'E.g., TCS, Google...'} />
              </div>
            </div>

            {/* Batch */}
            <div className="space-y-2">
              <label htmlFor="date" className={LABEL}>Select Batch *</label>
              <select id="date" name="date" required value={formData.date} onChange={handleChange}
                className={INPUT}>
                {ALL_BATCHES.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* ── GROUP SECTION ──────────────────────────────────────────── */}
            <AnimatePresence>
              {registrationType === 'group' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-5 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sunrise-gold">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-bold">Group Details</span>
                    </div>

                    {/* Group Size */}
                    <div className="space-y-2">
                      <label htmlFor="groupSize" className={LABEL}>
                        Total Group Size *
                        <span className="ml-2 text-white/30 normal-case font-normal">(min. 2 people)</span>
                      </label>
                      <div className={INPUT + " bg-white/5 flex items-center justify-between"}>
                        <span className="text-white font-bold">{effectiveGroupSize}</span>
                        <span className="text-white/50 text-xs">(Leader + {members.length} Members)</span>
                      </div>
                      {effectiveGroupSize >= 2 && effectiveGroupSize < 3 && (
                        <p className="text-white/40 text-xs mt-1">Add 1 more for a ₹200/person group discount!</p>
                      )}
                    </div>

                    {/* Dynamic Members List */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className={LABEL}>Group Members Details *</label>
                        <button
                          type="button"
                          onClick={() => setMembers([...members, { name: '', phone: '' }])}
                          className="text-xs font-bold text-sunrise-gold hover:text-white transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Member
                        </button>
                      </div>
                      
                      {members.map((member, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl relative border border-white/10">
                          <button
                            type="button"
                            onClick={() => setMembers(members.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                            aria-label="Remove member"
                          >
                            ×
                          </button>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/50">Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[index].name = e.target.value;
                                setMembers(newMembers);
                              }}
                              className={INPUT}
                              placeholder="Full Name"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/50">Mobile Number</label>
                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[index].phone = e.target.value;
                                setMembers(newMembers);
                              }}
                              className={INPUT}
                              placeholder="Mobile Number"
                              required
                            />
                          </div>
                        </div>
                      ))}
                      {members.length === 0 && (
                        <p className="text-sm text-white/50 text-center py-4 border border-dashed border-white/10 rounded-xl">
                          No additional members added yet. Click "Add Member" to add details.
                        </p>
                      )}
                      <p className="text-xs text-white/30">Add details of all other members in your group.</p>
                    </div>

                    {/* Male / Female count */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="maleCount" className={LABEL}>Male Members *</label>
                        <input id="maleCount" name="maleCount" type="number" min={0} max={effectiveGroupSize}
                          value={formData.maleCount} onChange={handleChange} className={INPUT} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="femaleCount" className={LABEL}>Female Members *</label>
                        <input id="femaleCount" name="femaleCount" type="number" min={0} max={effectiveGroupSize}
                          value={formData.femaleCount} onChange={handleChange} className={INPUT} />
                      </div>
                    </div>
                    {formData.maleCount + formData.femaleCount !== effectiveGroupSize && effectiveGroupSize > 0 && (
                      <p className="text-amber-400 text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Male ({formData.maleCount}) + Female ({formData.femaleCount}) = {formData.maleCount + formData.femaleCount}, should equal {effectiveGroupSize}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── DISCOUNT SECTION ─────────────────────────────────────── */}
            <div className="space-y-3 p-4 rounded-2xl bg-sunrise-gold/5 border border-sunrise-gold/20">
              <p className={LABEL + ' text-sunrise-gold/80'}>Apply a Discount (Choose one)</p>

              {/* Toggle buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'none', label: '🚫 No Discount' },
                  { val: 'group', label: '👥 Group Discount' },
                  { val: 'referral', label: '🎟️ Referral Code' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => {
                      setFormData(p => ({ ...p, discountChoice: opt.val as any, referralCode: opt.val !== 'referral' ? '' : p.referralCode }));
                      if (opt.val !== 'referral') {
                        setValidReferral(null);
                        setReferralError('');
                      }
                    }}
                    className={`py-2.5 rounded-xl border font-bold text-xs transition-all ${
                      formData.discountChoice === opt.val
                        ? 'bg-sunrise-gold text-black border-sunrise-gold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Group discount ladder */}
              <AnimatePresence>
                {formData.discountChoice === 'group' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[{ n: 3, off: 200 }, { n: 4, off: 300 }, { n: 6, off: 400 }, { n: '8+', off: 500 }].map(({ n, off }) => {
                        const isActive = registrationType === 'group' &&
                          (typeof n === 'number' ? effectiveGroupSize === n : effectiveGroupSize >= 8);
                        return (
                          <div key={n} className={`flex justify-between items-center px-3 py-2 rounded-xl border text-xs transition-colors ${
                            isActive ? 'bg-sunrise-gold/10 border-sunrise-gold/40 text-sunrise-gold' : 'bg-white/5 border-white/10 text-white/50'
                          }`}>
                            <span>Group of {n}</span>
                            <span className="font-bold">₹{off} off</span>
                          </div>
                        );
                      })}
                    </div>
                    {registrationType !== 'group' && (
                      <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
                        <Info className="w-3 h-3 shrink-0" />
                        Switch to Group registration above to activate group discounts.
                      </p>
                    )}
                    {registrationType === 'group' && groupDiscountPerPerson > 0 && (
                      <p className="text-green-400 text-xs font-bold">
                        ✓ ₹{groupDiscountPerPerson} off per person × {effectiveGroupSize} = ₹{groupDiscountPerPerson * effectiveGroupSize} total saved!
                      </p>
                    )}
                    {registrationType === 'group' && groupDiscountPerPerson === 0 && (
                      <p className="text-white/40 text-xs">Add at least 2 more members to unlock group discount.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Referral code */}
              <AnimatePresence>
                {formData.discountChoice === 'referral' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-2"
                  >
                    <div className="relative mt-1 flex gap-2">
                      <input
                        id="referralCode"
                        name="referralCode"
                        type="text"
                        value={formData.referralCode}
                        onChange={handleChange}
                        className={INPUT + ' uppercase tracking-widest flex-1'}
                        placeholder="Enter code"
                        maxLength={20}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCode}
                        disabled={isValidatingCode || !formData.referralCode.trim() || !!validReferral}
                        className="px-4 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 disabled:opacity-50 transition-colors border border-white/10"
                      >
                        {isValidatingCode ? 'Checking...' : validReferral ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {validReferral && <p className="text-green-400 text-xs font-bold mt-1">✓ ₹500 OFF applied!</p>}
                    {referralError && <p className="text-red-400 text-xs font-bold mt-1">{referralError}</p>}
                    <p className="text-xs text-white/40 mt-1">Enter a valid creator referral code to get ₹500 off.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            {/* ── DECLARATION ──────────────────────────────────────────── */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Declaration</p>
              <p className="text-xs text-white/60 leading-relaxed">
                I, the undersigned, hereby declare that:
                (1) All information provided is accurate and complete.
                (2) I understand the trek involves physical exertion and undertake it at my own risk.
                (3) I will abide by all guidelines set by the organizer during the trek.
                (4) I understand the cancellation and refund policy.
                (5) I confirm that only one offer/discount shall be availed per registration.
                {registrationType === 'group' && ' (6) I am authorised to register on behalf of all group members listed above and confirm their consent.'}
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="declarationAccepted" checked={formData.declarationAccepted}
                  onChange={handleChange} className="mt-0.5 accent-sunrise-gold w-4 h-4" required />
                <span className="text-sm text-white/80 font-medium">
                  I have read and agree to the above declaration *
                </span>
              </label>
            </div>

            {/* ── SUBMIT ───────────────────────────────────────────────── */}
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting || !formData.declarationAccepted}
              className={`w-full font-bold text-lg py-4 rounded-xl mt-2 shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all ${
                isSubmitting || !formData.declarationAccepted
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-sunrise-gold text-black hover:shadow-[0_0_40px_rgba(255,215,0,0.5)]'
              }`}
            >
              {isSubmitting
                ? 'Securing Seat...'
                : registrationType === 'group'
                  ? `Pay ₹${TOKEN_AMOUNT} × ${effectiveGroupSize} = ₹${(TOKEN_AMOUNT * effectiveGroupSize).toLocaleString('en-IN')} & Book`
                  : `Pay ₹${TOKEN_AMOUNT} & Secure Seat`}
            </motion.button>
            <p className="text-center text-xs text-white/30">You will be redirected to Razorpay securely.</p>

            {/* Dev Test Button */}
            {import.meta.env.DEV && (
              <button
                type="button"
                onClick={async () => {
                  const confirmTest = window.confirm("Bypass Payment? This will create a real database entry but SKIP the Razorpay gateway.");
                  if (!confirmTest) return;

                  setIsSubmitting(true);
                  try {
                    const registrationData = {
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      gender: formData.gender,
                      occupation: formData.occupation,
                      college: formData.organisation,
                      batch_date: formData.date,
                      registration_type: registrationType,
                      group_size: effectiveGroupSize,
                      member_names: registrationType === 'group' ? [formData.name, ...members.map(m => m.name)].filter(Boolean).join(', ') : formData.name,
                      group_contacts: registrationType === 'group' ? [`${formData.name}: ${formData.phone}`, ...members.map(m => `${m.name}: ${m.phone}`)].join('\n') : formData.phone,
                      male_count: Number(formData.maleCount) || (registrationType === 'individual' ? 1 : 0),
                      female_count: Number(formData.femaleCount) || 0,
                      discount_per_person: Number(appliedDiscount) || 0,
                      total_discount: totalGroupSaving,
                      referral_code: formData.referralCode ? formData.referralCode.toUpperCase() : '',
                      declaration_accepted: formData.declarationAccepted,
                      payment_status: 'paid', // Simulate success
                      payment_id: 'TEST_BYPASS_' + Date.now()
                    };

                    const { data: reg, error } = await supabase
                      .from('registrations')
                      .insert([registrationData])
                      .select()
                      .single();

                    if (error) throw error;
                    setSuccessId(reg.id);
                  } catch (err: any) {
                    alert("Test failed: " + err.message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="w-full mt-4 py-2 border border-dashed border-white/20 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-white/30 hover:text-white/60 hover:border-white/40 transition-all"
              >
                Dev: Test Success Flow (Skip Payment)
              </button>
            )}
          </form>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
};
