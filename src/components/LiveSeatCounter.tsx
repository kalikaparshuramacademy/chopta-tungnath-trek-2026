import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

const TOTAL_SEATS = 60;

export const LiveSeatCounter = () => {
  const remaining = 24;
  const booked = TOTAL_SEATS - remaining;
  const pct = (booked / TOTAL_SEATS) * 100;
  const urgency = true;

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
      <span>
        Only <strong>{remaining}</strong> seats left out of {TOTAL_SEATS}!
      </span>
      <span className="ml-1 text-[10px] font-normal opacity-60">
        ({Math.round(pct)}% filled)
      </span>
    </motion.div>
  );
};
