import { motion } from 'motion/react';
import { Phone, MessageSquare, CreditCard } from 'lucide-react';
import { CONTACT_PHONE, PAYMENT_LINK } from '../constants';
import { Link } from 'react-router-dom';

export const MobileStickyBar = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4"
    >
      <div className="glass-dark border-white/10 rounded-3xl p-2 flex items-center gap-2 shadow-2xl shadow-black">
        <a 
          href={`tel:${CONTACT_PHONE}`}
          className="flex-1 bg-white/5 h-14 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <Phone className="w-5 h-5 text-sunrise-gold" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">Call</span>
        </a>
        <a 
          href={`https://wa.me/${CONTACT_PHONE}`}
          className="flex-1 bg-white/5 h-14 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-sunrise-gold" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">WhatsApp</span>
        </a>
        <Link to="/book" className="flex-[2] bg-sunrise-gold h-14 rounded-2xl flex items-center justify-center gap-2 text-black font-black uppercase tracking-widest text-xs shadow-lg shadow-sunrise-gold/20 hover:scale-105 transition-transform">
          <CreditCard className="w-5 h-5" />
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};
