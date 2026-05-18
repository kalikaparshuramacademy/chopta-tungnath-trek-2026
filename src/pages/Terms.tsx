import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { TRIP_NAME } from '../constants';
import { Shield, FileText, Scale, Info } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-himalaya-black text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-sunrise-gold/10 text-sunrise-gold rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
                Terms & <span className="text-sunrise-gold">Conditions</span>
              </h1>
              <p className="text-white/50 mt-1 uppercase tracking-widest text-xs font-bold">Last Updated: May 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-12">
            <section className="glass-dark p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-sunrise-gold" />
                1. Acceptance of Terms
              </h2>
              <p className="text-white/70 leading-relaxed">
                By booking a trek with Peak & River Travels for the {TRIP_NAME}, you agree to be bound by these Terms and Conditions. Please read them carefully before making a reservation.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">2. Booking & Payments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-dark p-6 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-sunrise-gold mb-2">Token Amount</h3>
                  <p className="text-sm text-white/60 italic">The initial token amount of ₹999 is strictly non-refundable and serves as a commitment to secure your slot.</p>
                </div>
                <div className="glass-dark p-6 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-sunrise-gold mb-2">Final Payment</h3>
                  <p className="text-sm text-white/60">The remaining balance must be paid at least 15 days prior to the departure date. Failure to do so may result in cancellation of your booking without refund.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">3. Health & Fitness</h2>
              <p className="text-white/70 leading-relaxed">
                Participants must be in good physical and mental health. High-altitude trekking involves physical exertion. It is your responsibility to consult a doctor if you have any pre-existing medical conditions.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                <p className="text-sm text-red-400 font-medium">Peak & River Travels reserves the right to decline any participant if their health status is deemed a risk to themselves or the group.</p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">4. Conduct & Safety</h2>
              <ul className="space-y-4 text-white/70 list-disc pl-6">
                <li>The decision of the trek leader will be final in all matters of safety and route changes.</li>
                <li>Consumption of alcohol or narcotics during the trek is strictly prohibited.</li>
                <li>Littering is a punishable offence. We follow a "Leave No Trace" policy.</li>
                <li>Peak & River Travels is not responsible for any loss or damage to personal belongings.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">5. Cancellations</h2>
              <p className="text-white/70">
                All cancellations are subject to our formal <a href="/refund-policy" className="text-sunrise-gold hover:underline">Refund Policy</a>. By agreeing to these terms, you acknowledge and accept the refund tiers and timelines specified therein.
              </p>
            </section>

            <div className="pt-12 border-t border-white/5 text-center">
              <p className="text-white/40 text-sm">For any legal inquiries, please contact us at <span className="text-white/60">peakandrivertravels@gmail.com</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
};
