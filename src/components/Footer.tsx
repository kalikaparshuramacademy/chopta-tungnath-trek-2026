import { motion } from 'motion/react';
import { TRIP_NAME, CONTACT_PHONE } from '../constants';
import { MapPin, Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="pt-32 pb-12 px-6 bg-himalaya-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-himalaya-emerald/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-sunrise-gold rounded-full flex items-center justify-center">
                <MapPin className="text-black w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tighter">
                PEAK & RIVER <span className="text-sunrise-gold">TRAVELS</span>
              </span>
            </div>
            <p className="text-white/40 max-w-md leading-relaxed text-sm mb-8">
              Crafting elite Himalayan experiences for the next generation of explorers. We believe every mountain has a story, and we're here to help you write yours.
            </p>
            <div className="flex gap-4">
              {[Instagram, Mail, Phone].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-sunrise-gold transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-sunrise-gold">Quick Links</h4>
            <ul className="space-y-4">
              {['Journey', 'Destinations', 'Pricing', 'Terms', 'Privacy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-sunrise-gold">Expedition Office</h4>
            <div className="space-y-6 text-sm text-white/60">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-sunrise-gold shrink-0" />
                <p>H.no 18, KH No. 62/18, Block D-1, 1st Floor, Phase 1, Budh Vihar, North West Delhi, Delhi, India - 110086</p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-sunrise-gold shrink-0" />
                <p>{CONTACT_PHONE}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">
            © 2026 PEAK & RIVER TRAVELS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">A PRODUCTION BY</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-sunrise-gold">TRIPME</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
