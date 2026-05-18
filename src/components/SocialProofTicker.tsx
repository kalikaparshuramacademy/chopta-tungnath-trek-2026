import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FIRST_NAMES = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Neha', 'Rohan', 'Anjali', 'Karan', 'Pooja', 'Aditya', 'Shruti', 'Siddharth', 'Riya', 'Arjun', 'Kritika', 'Manish', 'Kavita', 'Sanjay', 'Megha'];
const CITIES = ['Delhi', 'Noida', 'Gurugram', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Ahmedabad', 'Surat', 'Bhopal'];
const BATCHES = ['11th June 2026', '14th June 2026', '20th June 2026', '23rd June 2026', '26th June 2026', '6th June 2026', '28th June 2026'];

interface LiveNotification {
  id: number;
  name: string;
  city: string;
  batch: string;
  timeAgo: string;
}

function generateRandomNotification(): LiveNotification {
  const isJustNow = Math.random() > 0.5;
  const minutes = Math.floor(Math.random() * 59) + 1;
  
  return {
    id: Date.now(),
    name: FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
    city: CITIES[Math.floor(Math.random() * CITIES.length)],
    batch: BATCHES[Math.floor(Math.random() * BATCHES.length)],
    timeAgo: isJustNow ? 'Just now' : `${minutes}m ago`
  };
}

export const SocialProofTicker = () => {
  const [notification, setNotification] = useState<LiveNotification | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const triggerNext = () => {
      // Hide current notification
      setNotification(null);
      
      // Wait for 2-6 seconds, then show a new one
      const waitTime = Math.random() * 4000 + 2000;
      
      timeoutId = setTimeout(() => {
        setNotification(generateRandomNotification());
        
        // Keep it visible for 5-8 seconds
        const visibleTime = Math.random() * 3000 + 5000;
        timeoutId = setTimeout(triggerNext, visibleTime);
      }, waitTime);
    };

    // Start the first one after 2 seconds
    timeoutId = setTimeout(() => {
      setNotification(generateRandomNotification());
      timeoutId = setTimeout(triggerNext, 5000);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed bottom-24 left-4 z-40 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-dark border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 max-w-[260px] shadow-2xl backdrop-blur-md bg-black/60"
          >
            <div className="w-8 h-8 rounded-full bg-sunrise-gold flex items-center justify-center text-black font-black text-sm shrink-0">
              {notification.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">
                {notification.name} from {notification.city}
              </p>
              <p className="text-white/50 text-[10px] mt-0.5">
                Just booked for {notification.batch} · <span className="text-sunrise-gold/80 font-medium">{notification.timeAgo}</span>
              </p>
            </div>
            <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
              <span className="text-green-400 text-sm relative z-10">✓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
