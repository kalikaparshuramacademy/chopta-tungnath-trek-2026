import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

const CITIES = ['Delhi', 'Noida', 'Gurugram', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Jaipur', 'Lucknow', 'Chandigarh'];

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface Booking { id: number; name: string; batch_date: string; created_at: string; }

export const SocialProofTicker = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    supabase
      .from('registrations')
      .select('id, name, batch_date, created_at')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => { if (data?.length) setBookings(data); });
  }, []);

  useEffect(() => {
    if (bookings.length < 2) return;
    timerRef.current = setTimeout(() => {
      setCurrent(c => (c + 1) % bookings.length);
    }, 4000);
    return () => clearTimeout(timerRef.current);
  }, [current, bookings.length]);

  if (!bookings.length) return null;

  const b = bookings[current];
  const firstName = b.name.split(' ')[0];
  const lastInitial = b.name.split(' ')[1]?.[0] ? b.name.split(' ')[1][0] + '.' : '';
  const city = CITIES[b.id % CITIES.length];

  return (
    <div className="fixed bottom-24 left-4 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: -20 }}
          transition={{ duration: 0.4 }}
          className="glass-dark border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 max-w-[260px] shadow-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-sunrise-gold flex items-center justify-center text-black font-black text-sm shrink-0">
            {firstName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">
              {firstName} {lastInitial} from {city}
            </p>
            <p className="text-white/50 text-[10px]">
              Just booked for {b.batch_date} · {timeAgo(b.created_at)}
            </p>
          </div>
          <span className="text-green-400 text-lg shrink-0">✓</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
