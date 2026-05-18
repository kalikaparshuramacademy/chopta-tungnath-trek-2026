import { motion } from 'motion/react';
import { CONTACT_PHONE, CONTACT_EMAIL } from '../constants';
import { MapPin, Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="pt-32 pb-12 px-6 bg-himalaya-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-himalaya-emerald/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Link to="/" className="shrink-0">
                <img
                  src="/images/logo_circular.png"
                  alt="Peak & River Travels"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                />
              </Link>
              <span className="font-display font-bold text-xl tracking-tighter">
                PEAK & RIVER <span className="text-sunrise-gold">TRAVELS</span>
              </span>
            </div>
            <p className="text-white/40 max-w-md leading-relaxed text-sm mb-8">
              Journeys That Stay Forever.<br />
              Operated by Peak & River Travels · Delhi NCT, India.<br />
              Founded in 2025. We curate premium Himalayan experiences for the modern explorer.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="https://instagram.com/peakandrivertravels" 
                target="_blank"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-sunrise-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href={`mailto:${CONTACT_EMAIL}`} 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-sunrise-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href={`tel:${CONTACT_PHONE}`}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-sunrise-gold transition-colors"
              >
                <Phone className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-sunrise-gold">Explore</h4>
            <div className="space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-4">Trip</div>
                <ul className="space-y-3">
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Book Now', href: '/book' },
                    { label: 'Packing List', href: '/packing-checklist' },
                    { label: 'Find My Booking', href: '/find-booking' },
                  ].map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-4">Legal</div>
                <ul className="space-y-3">
                  {[
                    { label: 'Refund Policy', href: '/refund-policy' },
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy' },
                    { label: 'Cancel / Reschedule', href: '/cancel-reschedule' },
                  ].map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-sm text-white/60 hover:text-sunrise-gold transition-colors flex items-center gap-2 group">
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-sunrise-gold">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-white/5 border border-white/10 shrink-0">
                  <MapPin className="w-4 h-4 text-sunrise-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Registered Office</div>
                  <div className="text-sm text-white/50 leading-relaxed">
                    H.No. 18, KH No. 62/18, Block D1, 1st Floor, Phase 1, Budh Vihar, North West Delhi, Delhi, India - 110086
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-white/5 border border-white/10 shrink-0">
                  <Mail className="w-4 h-4 text-sunrise-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Email Us</div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-white/50 hover:text-sunrise-gold transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="p-2 h-fit rounded-lg bg-white/5 border border-white/10 shrink-0">
                  <Phone className="w-4 h-4 text-sunrise-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1">Call / WhatsApp</div>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-sm text-white/50 hover:text-sunrise-gold transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">
            © 2026 PEAK & RIVER TRAVELS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-white/20">
            <span>Our other trips:</span>
            <a href="https://manalikasol.in" target="_blank" rel="noopener noreferrer" className="hover:text-sunrise-gold transition-colors">manalikasol.in</a>
            <a href="https://jibhitirthan.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-sunrise-gold transition-colors">Jibhi Tirthan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
