import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Users } from 'lucide-react';

const BATCHES = [
  { date: '6th June 2026', label: 'June 6–10', capacity: 60 },
  { date: '11th June 2026', label: 'June 11–15', capacity: 60 },
  { date: '14th June 2026', label: 'June 14–18', capacity: 60 },
  { date: '28th June 2026', label: 'June 28–Jul 2', capacity: 60 },
];

export const BatchCapacityBar = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('registrations')
        .select('batch_date, group_size, payment_status');

      const c: Record<string, number> = {};
      (data || []).forEach(r => {
        if (!c[r.batch_date]) c[r.batch_date] = 0;
        if (r.payment_status === 'paid') c[r.batch_date] += (r.group_size || 1);
      });
      setCounts(c);
    };
    fetch();
  }, []);

  return (
    <section className="py-20 px-6 bg-himalaya-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold"
          >
            SEAT AVAILABILITY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-glow"
          >
            Batch <span className="text-sunrise-gold font-serif italic">Capacity</span>
          </motion.h2>
        </div>

        <div className="space-y-5">
          {BATCHES.map((batch, i) => {
            const filled = counts[batch.date] ?? 0;
            const pct = Math.min(100, (filled / batch.capacity) * 100);
            const remaining = Math.max(0, batch.capacity - filled);
            const isCritical = pct >= 80;
            const isFull = pct >= 100;

            return (
              <motion.div
                key={batch.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-6 rounded-2xl border border-white/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-bold text-lg">{batch.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-3 h-3 text-white/40" />
                      <span className="text-white/50 text-sm">{filled} / {batch.capacity} seats filled</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isFull
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : isCritical
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    {isFull ? '🔴 Sold Out' : isCritical ? `⚡ Only ${remaining} left!` : `✓ ${remaining} seats available`}
                  </div>
                </div>

                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                    className={`h-full rounded-full ${
                      isFull ? 'bg-red-500' : isCritical ? 'bg-amber-500' : 'bg-sunrise-gold'
                    }`}
                  />
                </div>
                <p className="text-right text-white/30 text-xs mt-1">{Math.round(pct)}% booked</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
