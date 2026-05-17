import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Flame } from 'lucide-react';

const TOTAL_SEATS = 60;

export const LiveSeatCounter = () => {
  const [booked, setBooked] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'paid');
      setBooked(count ?? 0);
    };
    fetch();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('seat-counter')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'registrations' }, fetch)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'registrations' }, fetch)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const remaining = booked !== null ? Math.max(0, TOTAL_SEATS - booked) : null;
  const pct = booked !== null ? Math.min(100, (booked / TOTAL_SEATS) * 100) : 0;
  const urgency = remaining !== null && remaining <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold ${
        urgency
          ? 'bg-red-500/15 border-red-500/30 text-red-400'
          : 'bg-sunrise-gold/10 border-sunrise-gold/30 text-sunrise-gold'
      }`}
    >
      <Flame className={`w-4 h-4 ${urgency ? 'animate-pulse' : ''}`} />
      <AnimatePresence mode="wait">
        {remaining === null ? (
          <span key="loading" className="opacity-50">Loading seats...</span>
        ) : (
          <motion.span
            key={remaining}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            Only <strong>{remaining}</strong> seats left out of {TOTAL_SEATS}!
          </motion.span>
        )}
      </AnimatePresence>
      <span className="ml-1 text-[10px] font-normal opacity-60">
        ({Math.round(pct)}% filled)
      </span>
    </motion.div>
  );
};
