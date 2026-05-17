import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

const BATCHES = [
  { label: '6th June',  date: new Date('2026-06-06T06:00:00+05:30') },
  { label: '11th June', date: new Date('2026-06-11T06:00:00+05:30') },
  { label: '14th June', date: new Date('2026-06-14T06:00:00+05:30') },
  { label: '20th June', date: new Date('2026-06-20T06:00:00+05:30') },
  { label: '23rd June', date: new Date('2026-06-23T06:00:00+05:30') },
  { label: '26th June', date: new Date('2026-06-26T06:00:00+05:30') },
  { label: '28th June', date: new Date('2026-06-28T06:00:00+05:30') },
  { label: '30th June', date: new Date('2026-06-30T06:00:00+05:30') },
  { label: '3rd July',  date: new Date('2026-07-03T06:00:00+05:30') },
  { label: '6th July',  date: new Date('2026-07-06T06:00:00+05:30') },
];

function getNextBatch() {
  const now = new Date();
  return BATCHES.find(b => b.date > now) ?? BATCHES[BATCHES.length - 1];
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const CountdownTimer = () => {
  const batch = getNextBatch();
  const [time, setTime] = useState(getTimeLeft(batch.date));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(batch.date)), 1000);
    return () => clearInterval(id);
  }, [batch.date]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Mins', value: time.minutes },
    { label: 'Secs', value: time.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 px-4 sm:px-6 bg-black/40 backdrop-blur-sm border-t border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <Clock className="w-4 h-4 text-sunrise-gold animate-pulse shrink-0" />
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-sunrise-gold uppercase">
            Next Batch Departs · {batch.label} 2026
          </p>
        </div>

        {/* Responsive flip clock */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6">
          {units.map(({ label, value }, i) => (
            <div key={label} className="flex items-end gap-2 sm:gap-4 md:gap-6">
              <div className="text-center">
                <motion.div
                  key={value}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="glass-dark w-[68px] h-[68px] sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10"
                >
                  <span className="text-[28px] sm:text-3xl md:text-5xl font-black tabular-nums text-white leading-none">
                    {String(value).padStart(2, '0')}
                  </span>
                </motion.div>
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white/40 uppercase mt-1.5">{label}</p>
              </div>
              {i < 3 && (
                <span className="text-xl sm:text-2xl md:text-4xl font-black text-sunrise-gold/40 mb-6 sm:mb-7 md:mb-8 select-none leading-none">:</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-white/30 text-[11px] sm:text-xs mt-4">Seats filling up fast · Book now to secure your spot</p>
      </div>
    </motion.div>
  );
};
