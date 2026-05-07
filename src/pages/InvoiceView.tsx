import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Printer, ArrowLeft, Download, CheckCircle, MapPin, Clock, ShieldCheck, Mail, Phone } from 'lucide-react';

const TRIP_NAME = 'Chopta Tungnath Trek 2026';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  batch_date: string;
  registration_type: string;
  group_size: number;
  discount_per_person: number;
  total_discount: number;
  payment_id: string;
  payment_status: string;
  created_at: string;
}

export const InvoiceView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: reg, error: regError } = await supabase
          .from('registrations')
          .select('*')
          .eq('id', id)
          .single();

        if (regError) throw regError;
        setData(reg);
      } catch (err: any) {
        setError(err.message || 'Invoice not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return (
    <div className="min-h-screen bg-himalaya-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-sunrise-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen bg-himalaya-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
        <ShieldCheck className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Invoice Not Found</h1>
      <p className="text-white/50 mb-8 max-w-md">The receipt you are looking for could not be found or there was an error fetching it.</p>
      <Link to="/" className="bg-sunrise-gold text-black px-8 py-3 rounded-full font-bold">Back to Home</Link>
    </div>
  );

  const BASE_PRICE = 5499;
  const TOKEN_AMOUNT = 999;
  const totalAmount = (BASE_PRICE - data.discount_per_person) * data.group_size;
  const paidAmount = TOKEN_AMOUNT * data.group_size;
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-4 print:p-0 print:bg-white">
      {/* ── TOP ACTIONS (HIDDEN IN PRINT) ────────────────────────────────── */}
      <div className="max-w-[850px] mx-auto mb-8 flex justify-between items-center print:hidden">
        <Link to="/" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors font-bold text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-black/20"
          >
            <Download className="w-4 h-4" />
            Download PDF / Print
          </button>
        </div>
      </div>

      {/* ── INVOICE CONTAINER ────────────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[850px] mx-auto bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-neutral-200 print:shadow-none print:border-none print:rounded-none relative"
      >
        {/* Accent Bar */}
        <div className="h-4 bg-sunrise-gold w-full" />

        <div className="p-12 md:p-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16 pb-12 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/logo_circular.png" alt="Logo" className="w-16 h-16 rounded-full border border-neutral-100" />
                <div className="leading-tight">
                  <h1 className="text-2xl font-black tracking-tighter text-neutral-900">PEAK & RIVER <span className="text-sunrise-gold">TRAVELS</span></h1>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">Premium Himalayan Expeditions</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-neutral-500">
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sunrise-gold" /> H.no 18, Block D-1, Phase 1, Budh Vihar, Delhi - 110086</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sunrise-gold" /> +91 9266910290</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sunrise-gold" /> peakandrivertravels@gmail.com</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-5xl font-black text-neutral-100 absolute top-20 right-16 pointer-events-none uppercase tracking-tighter">INVOICE</h2>
              <div className="relative z-10">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Invoice Number</p>
                <p className="text-2xl font-black tracking-tight mb-6 text-neutral-800">#PRT-2026-{data.id.toString().padStart(4, '0')}</p>
                
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Booking Date</p>
                <p className="text-sm font-bold text-neutral-800">{new Date(data.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Booking Status Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-green-50 p-8 rounded-[2.5rem] mb-12 border border-green-100 relative overflow-hidden print:bg-green-50 print:border-green-200" style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 blur-3xl rounded-full print:hidden" />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="relative">
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-green-600/20 rotate-3 print:bg-green-600" style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}>
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <img 
                  src="/images/logo_circular.png" 
                  alt="Peak & River" 
                  className="w-8 h-8 rounded-full border-2 border-white absolute -bottom-1 -right-1 shadow-md print:border-white"
                />
              </div>
              <div>
                <p className="font-black text-green-700 uppercase tracking-widest text-xs mb-1">Payment Confirmed</p>
                <p className="text-green-600 font-bold text-base">Your seat for the {TRIP_NAME} is successfully secured.</p>
                <p className="text-[10px] text-green-600/60 uppercase tracking-widest font-black mt-1 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> 100% Secure Transaction
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl border border-green-100">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Powered by</span>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay" 
                  className="h-4 opacity-70"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {/* Traveler Info */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sunrise-gold" /> Traveler Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Name</p>
                  <p className="font-bold text-lg text-neutral-800">{data.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Contact</p>
                  <p className="font-medium text-neutral-600">{data.phone}</p>
                  <p className="font-medium text-neutral-600">{data.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Gender</p>
                  <p className="font-bold text-neutral-700">{data.gender || '—'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Registration Type</p>
                  <p className="font-bold text-neutral-700">{data.registration_type === 'group' ? `Group Booking (${data.group_size} Person)` : 'Individual Solo Booking'}</p>
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sunrise-gold" /> Trip Information
              </h3>
              <div className="space-y-4 bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Expedition</p>
                  <p className="font-bold text-neutral-800">Chopta Tungnath Trek 2026</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Batch Dates</p>
                  <p className="font-bold text-sunrise-gold">{data.batch_date}</p>
                </div>
                <div className="pt-2 flex gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Seat No.</p>
                    <p className="font-black text-lg text-neutral-800">S-{data.id.toString().padStart(3, '0')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Batch Code</p>
                    <p className="font-black text-lg text-neutral-800">DU26-B1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boarding Info Card */}
          <div className="bg-black text-white p-8 rounded-[2rem] mb-16 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-gold/10 blur-[80px] rounded-full" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-sunrise-gold" />
              </div>
              <div>
                <p className="text-[10px] font-black text-sunrise-gold uppercase tracking-[0.3em] mb-1">Boarding Point</p>
                <p className="text-lg font-bold text-white">Majnu Ka Tila, Delhi</p>
                <p className="text-xs text-white/50 italic">Standard pickup for all North Campus batches</p>
              </div>
            </div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-sunrise-gold" />
              </div>
              <div>
                <p className="text-[10px] font-black text-sunrise-gold uppercase tracking-[0.3em] mb-1">Reporting Time</p>
                <p className="text-lg font-bold text-white">10:00 PM Sharp</p>
                <p className="text-xs text-white/50">Departure scheduled for 10:30 PM</p>
              </div>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mb-16">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-100">
                  <th className="pb-4 px-2">Description</th>
                  <th className="pb-4 px-2 text-right">Rate</th>
                  <th className="pb-4 px-2 text-center">Qty</th>
                  <th className="pb-4 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                <tr className="text-sm">
                  <td className="py-6 px-2">
                    <p className="font-bold text-neutral-800">Trek Package (Full Itinerary)</p>
                    <p className="text-xs text-neutral-500">Includes stays, meals, guide & T-shirt</p>
                  </td>
                  <td className="py-6 px-2 text-right font-medium text-neutral-700">₹{BASE_PRICE.toLocaleString('en-IN')}</td>
                  <td className="py-6 px-2 text-center font-medium text-neutral-700">x{data.group_size}</td>
                  <td className="py-6 px-2 text-right font-bold text-neutral-900">₹{(BASE_PRICE * data.group_size).toLocaleString('en-IN')}</td>
                </tr>
                {data.discount_per_person > 0 && (
                  <tr className="text-sm text-green-600">
                    <td className="py-6 px-2 font-bold italic">Group Discount Applied</td>
                    <td className="py-6 px-2 text-right">-₹{data.discount_per_person.toLocaleString('en-IN')}</td>
                    <td className="py-6 px-2 text-center">x{data.group_size}</td>
                    <td className="py-6 px-2 text-right font-bold">-₹{(data.discount_per_person * data.group_size).toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-xs">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">Payment Terms</h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                The token amount secures your seat. The remaining balance must be cleared 7 days before the departure date. Payments are subject to our standard refund policy.
              </p>
            </div>
            
            <div className="w-full md:w-80 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-bold text-neutral-800">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Grand Total</span>
                <span className="text-3xl font-black text-neutral-900">₹{(BASE_PRICE * data.group_size - (data.discount_per_person * data.group_size)).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Token Paid (Secure)</span>
                <span className="text-lg font-black text-neutral-900">₹{paidAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center p-6 bg-sunrise-gold text-black rounded-3xl shadow-xl shadow-sunrise-gold/20 ring-4 ring-sunrise-gold/10">
                <span className="text-sm font-black uppercase tracking-widest">Balance Due</span>
                <span className="text-2xl font-black">₹{pendingAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-24 pt-12 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-12 text-[10px] text-neutral-400 font-medium">
            <div>
              <p className="font-black text-neutral-800 uppercase tracking-widest mb-3">Important Guidelines</p>
              <ul className="space-y-2 list-disc pl-4">
                <li>Original Government ID proof is mandatory for permit verification.</li>
                <li>Reach Majnu Ka Tila 30 mins before reporting time.</li>
                <li>Pack light but carry essential winter layering (Temperature: -2° to 10°).</li>
                <li>Balance amount must be paid via the portal or Bank Transfer.</li>
              </ul>
            </div>
            <div className="md:text-right flex flex-col items-end">
              <div className="w-24 h-24 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center mb-4 opacity-50">
                <p className="text-[8px] text-center px-2">Official Stamp Area</p>
              </div>
              <p className="font-black text-neutral-800 mb-1">Digitally Generated Invoice</p>
              <p>Peak & River Travels Expedition Team</p>
              <p className="mt-4 text-[8px] italic">This is a system generated document and does not require a physical signature.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── FOOTER ACTIONS (HIDDEN IN PRINT) ─────────────────────────────── */}
      <div className="max-w-[850px] mx-auto mt-12 text-center print:hidden">
        <p className="text-neutral-500 text-sm mb-6 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sunrise-gold" />
          Verified Booking by Peak & River Travels
        </p>
        <button 
          onClick={handlePrint}
          className="text-sunrise-gold font-bold hover:underline"
        >
          Need a copy for your records? Print this page.
        </button>
      </div>
    </div>
  );
};
