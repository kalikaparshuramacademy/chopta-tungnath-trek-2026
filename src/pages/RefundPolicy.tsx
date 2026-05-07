import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Shield, Clock, AlertTriangle, CheckCircle,
  XCircle, Info, RefreshCw, Phone, Mail, FileText
} from 'lucide-react';

// ── Smooth fade-in for each section ─────────────────────────────────────────
const Section = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
  >
    {children}
  </motion.div>
);

// ── Refund tier card ─────────────────────────────────────────────────────────
interface TierProps {
  timeline: string;
  refundPct: number;
  deduction: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  icon: React.ReactNode;
}

const TIER_COLORS = {
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/25',  text: 'text-green-400',  bar: 'bg-green-400'  },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/25', text: 'text-yellow-400', bar: 'bg-yellow-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/25', text: 'text-orange-400', bar: 'bg-orange-400' },
  red:    { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-400',    bar: 'bg-red-400'    },
};

const RefundTier = ({ timeline, refundPct, deduction, color, icon }: TierProps) => {
  const c = TIER_COLORS[color];
  return (
    <div className={`p-6 rounded-2xl border ${c.bg} ${c.border} flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 font-bold ${c.text}`}>
          {icon}
          <span>{timeline}</span>
        </div>
        <span className={`text-3xl font-bold ${c.text}`}>{refundPct}%</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${refundPct}%` }} />
      </div>
      <p className="text-white/60 text-sm">{deduction}</p>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
export const RefundPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const lastUpdated = 'May 7, 2026';

  return (
    <div className="min-h-screen bg-himalaya-black text-white pt-24 pb-20 px-4 relative">
      {/* Background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-himalaya-emerald/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sunrise-gold/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Back link ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-10 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-sunrise-gold/10 flex items-center justify-center text-sunrise-gold">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Refund <span className="text-sunrise-gold">Policy</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            We want you on the mountain with us. But if plans change, here's exactly how we handle cancellations and refunds — transparently, fairly, and without the fine print maze.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-white/30">
            <Clock className="w-3 h-3" />
            Last updated: {lastUpdated} &nbsp;|&nbsp; Effective from booking date
          </div>
        </motion.div>

        {/* ── Important notice banner ── */}
        <Section>
          <div className="flex gap-4 p-5 rounded-2xl bg-sunrise-gold/5 border border-sunrise-gold/20 mb-14">
            <Info className="w-5 h-5 text-sunrise-gold shrink-0 mt-0.5" />
            <div className="text-sm text-white/80 leading-relaxed">
              <strong className="text-sunrise-gold">Important:</strong> All cancellations must be communicated in writing via <strong>WhatsApp or Email</strong> to our team. Verbal cancellations are not accepted. The date of written communication is treated as the cancellation date. The ₹999 booking token is <strong>non-refundable</strong> in all scenarios.
            </div>
          </div>
        </Section>

        {/* ── Refund Schedule ── */}
        <Section>
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-2">Cancellation & Refund Schedule</h2>
            <p className="text-white/50 text-sm mb-8">Calculated from the trek departure date of your confirmed batch.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RefundTier
                timeline="30+ days before departure"
                refundPct={90}
                deduction="₹999 token + 10% processing fee deducted"
                color="green"
                icon={<CheckCircle className="w-4 h-4" />}
              />
              <RefundTier
                timeline="15–29 days before departure"
                refundPct={60}
                deduction="40% of total amount forfeited"
                color="yellow"
                icon={<Clock className="w-4 h-4" />}
              />
              <RefundTier
                timeline="7–14 days before departure"
                refundPct={25}
                deduction="75% of total amount forfeited"
                color="orange"
                icon={<AlertTriangle className="w-4 h-4" />}
              />
              <RefundTier
                timeline="Less than 7 days / No-show"
                refundPct={0}
                deduction="No refund applicable"
                color="red"
                icon={<XCircle className="w-4 h-4" />}
              />
            </div>
          </div>
        </Section>

        {/* ── Divider ── */}
        <div className="border-t border-white/5 mb-14" />

        {/* ── Sections ── */}
        <div className="space-y-14">

          {/* Token booking */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-sunrise-gold/10 flex items-center justify-center text-sunrise-gold shrink-0 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">₹999 Booking Token — Non-Refundable</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  The ₹999 token paid at the time of booking is a <strong className="text-white">seat-holding fee</strong> and is strictly non-refundable under any circumstance, including personal emergencies, medical reasons, or government advisories — unless the trek itself is cancelled by Peak & River Travels (see Section 6).
                </p>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  This token is deducted from your total trek cost and is not an additional charge.
                </p>
              </div>
            </div>
          </Section>

          {/* Group bookings */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Group Booking Cancellations</h2>
                <div className="space-y-3 text-sm text-white/60 leading-relaxed">
                  <p>For group bookings (3 or more travelers), refund calculations apply <strong className="text-white">per person individually</strong> based on when each cancellation is received.</p>
                  <ul className="space-y-2 pl-4">
                    {[
                      'If only some members of a group cancel, the remaining members retain their spots and group discount (if still meeting the minimum).',
                      'If group size drops below the minimum for a discount tier (e.g., from 4 to 2), the remaining members are moved to the standard rate and the difference is payable.',
                      'A group leader cancelling does not cancel the entire group unless explicitly stated in writing.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-purple-400 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Transfer */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Seat Transfer & Batch Change</h2>
                <div className="space-y-3 text-sm text-white/60 leading-relaxed">
                  <p>We understand plans change. As an alternative to cancellation, you may:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
                      <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">Batch Transfer</p>
                      <p>Transfer your seat to another available batch (same year) — free of charge if requested 14+ days before departure. ₹500 admin fee applies within 7–14 days.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
                      <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">Name Transfer</p>
                      <p>Transfer your confirmed seat to another person — free of charge. New traveler details must be provided 5+ days before departure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Campus Ambassador */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 mt-1">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Campus Ambassador — Free Trip Cancellation</h2>
                <div className="space-y-3 text-sm text-white/60 leading-relaxed">
                  <p>Campus Ambassadors who have earned a free trip through 8+ confirmed referrals are subject to the following:</p>
                  <ul className="space-y-2 pl-4">
                    {[
                      'If the Ambassador cancels their own participation, the free trip benefit is forfeited and cannot be transferred or monetized.',
                      'If the group of referrals generated by the Ambassador falls below 8 confirmed bookings before departure, the free trip benefit is revoked and the Ambassador will be charged the standard trek rate.',
                      'No cash equivalent is payable in lieu of the free trip benefit under any circumstance.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-400 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Trek cancelled by us */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-sunrise-gold/10 flex items-center justify-center text-sunrise-gold shrink-0 mt-1">
                <span className="text-sm font-bold">5</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Trek Cancelled by Peak & River Travels</h2>
                <div className="p-4 rounded-xl bg-sunrise-gold/5 border border-sunrise-gold/20 mb-4">
                  <p className="text-sunrise-gold font-bold text-sm mb-1">Full Refund — No Deduction</p>
                  <p className="text-white/60 text-sm">If Peak & River Travels cancels the trek for any reason (natural disaster, government order, insufficient enrollment, logistics failure), <strong className="text-white">100% of all amounts paid</strong> — including the ₹999 token — will be refunded within 7 working days.</p>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  We will notify all registered travelers via WhatsApp and Email at least 5 days before the departure date wherever possible. In force majeure situations, notification will be immediate.
                </p>
              </div>
            </div>
          </Section>

          {/* Force majeure */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 mt-1">
                <span className="text-sm font-bold">6</span>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Force Majeure & Natural Events</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  Trekking in the Himalayas carries inherent natural risks. In the event of unforeseen circumstances beyond our control — including but not limited to:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  {['Extreme weather', 'Natural disasters', 'Landslides', 'Road blockages', 'Government curfew', 'Pandemic restrictions'].map(ev => (
                    <div key={ev} className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center">
                      {ev}
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  — if the trek cannot be completed after departure, <strong className="text-white">no refund is applicable for amounts already utilised</strong> (transport, accommodation, permits). A partial credit toward a future trek may be offered at Peak & River Travels' discretion.
                </p>
              </div>
            </div>
          </Section>

          {/* Refund process */}
          <Section>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 mt-1">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">How to Request a Refund</h2>
                <ol className="space-y-4">
                  {[
                    { step: 'Send a written cancellation request via WhatsApp to +91-9266910290 or email us at peakandrivertravels@gmail.com', label: 'Step 1 — Notify Us' },
                    { step: 'Include your full name, registered phone number, batch date, and reason for cancellation.', label: 'Step 2 — Provide Details' },
                    { step: 'Our team will confirm the cancellation within 24 hours and calculate the applicable refund amount as per the schedule above.', label: 'Step 3 — Confirmation' },
                    { step: 'Approved refunds are processed within 7–10 working days to the original payment method (Razorpay/UPI/Bank).', label: 'Step 4 — Receive Refund' },
                  ].map(({ step, label }, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-1">{label}</p>
                        <p className="text-sm text-white/60 leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>

          {/* Disclaimer */}
          <Section>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sunrise-gold" />
                General Disclaimer
              </h2>
              <div className="space-y-2 text-xs text-white/50 leading-relaxed">
                <p>Peak & River Travels reserves the right to amend this refund policy at any time. Changes will be reflected on this page with an updated date.</p>
                <p>By completing the booking and submitting the declaration form, you confirm that you have read, understood, and agreed to this Refund Policy in full.</p>
                <p>This policy constitutes the entire agreement between the traveler and Peak & River Travels with respect to cancellations and refunds. No verbal or other written representations will override this policy.</p>
                <p>Disputes arising from this policy are subject to the jurisdiction of courts in New Delhi, India.</p>
              </div>
            </div>
          </Section>

        </div>

        {/* ── Contact CTA ── */}
        <Section delay={0.1}>
          <div className="mt-16 p-8 rounded-3xl glass border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-3">Have Questions?</h3>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Our team is available to help you understand the policy or process your request.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919266910290" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500/20 transition-colors">
                <Phone className="w-4 h-4" />
                WhatsApp: +91-9266910290
              </a>
              <a href="mailto:peakandrivertravels@gmail.com"
                className="flex items-center justify-center gap-2 glass px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4 text-sunrise-gold" />
                peakandrivertravels@gmail.com
              </a>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};
