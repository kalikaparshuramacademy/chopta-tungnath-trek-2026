import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { TRIP_NAME } from '../constants';
import { Shield, Eye, Lock, Database, Mail } from 'lucide-react';

export const Privacy = () => {
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
                Privacy <span className="text-sunrise-gold">Policy</span>
              </h1>
              <p className="text-white/50 mt-1 uppercase tracking-widest text-xs font-bold">Last Updated: May 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-12">
            <section className="glass-dark p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-sunrise-gold" />
                Our Commitment
              </h2>
              <p className="text-white/70 leading-relaxed">
                At Peak & River Travels, we value your trust and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard the data you provide during your registration for the {TRIP_NAME}.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div className="glass-dark p-6 rounded-2xl border border-white/5 flex gap-4">
                  <div className="w-10 h-10 shrink-0 bg-white/5 rounded-lg flex items-center justify-center text-sunrise-gold">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Registration Data</h3>
                    <p className="text-sm text-white/60">Name, email, phone number, occupation, and college/organisation info required for logistics and communication.</p>
                  </div>
                </div>
                <div className="glass-dark p-6 rounded-2xl border border-white/5 flex gap-4">
                  <div className="w-10 h-10 shrink-0 bg-white/5 rounded-lg flex items-center justify-center text-sunrise-gold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Traveler Details</h3>
                    <p className="text-sm text-white/60">Gender distribution and individual names for group bookings to ensure proper accommodation and forest permits.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">2. How We Use Your Data</h2>
              <ul className="space-y-4 text-white/70 list-disc pl-6">
                <li>To process your booking and confirm your trek slot.</li>
                <li>To coordinate logistics such as transport, food, and accommodation.</li>
                <li>To send important trip updates via email, WhatsApp, or phone.</li>
                <li>To verify eligibility for Campus Ambassador or Influencer programs.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">3. Data Security</h2>
              <p className="text-white/70 leading-relaxed italic">
                "We treat your data like our own trekking gear: secure, organized, and never shared with unauthorized parties."
              </p>
              <div className="glass-dark p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                <Lock className="text-green-400 w-6 h-6" />
                <p className="text-sm text-white/60">All data is stored securely using Supabase with row-level security protocols. We do not sell or trade your personal information to third parties.</p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold border-l-4 border-sunrise-gold pl-4">4. Third-Party Services</h2>
              <p className="text-white/70">
                We may share minimal required data with local logistics partners (campsite owners, forest department for permits) to ensure a smooth trekking experience.
              </p>
            </section>

            <div className="pt-12 border-t border-white/5 text-center">
              <div className="inline-flex items-center gap-2 text-sunrise-gold font-bold mb-4">
                <Mail className="w-4 h-4" />
                peakandrivertravels@gmail.com
              </div>
              <p className="text-white/40 text-sm">If you wish to have your data removed from our records, please contact us.</p>
            </div>
          </div>
        </motion.div>
      </div>
    <Footer />
    </div>
  );
};
