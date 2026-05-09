import { motion, useScroll, useTransform } from 'motion/react';
import { TRIP_NAME, PAYMENT_LINK } from '../constants';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(24px)']
  );

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Peak & River Travels circular logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/images/logo_circular.png"
              alt="Peak & River Travels"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 hover:ring-sunrise-gold/40 transition-all duration-300"
              loading="eager"
            />
          </Link>
          <span className="font-display font-bold text-lg tracking-tighter hidden sm:block">
            PEAK & RIVER <span className="text-sunrise-gold">TRAVELS</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-sunrise-gold transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <a 
            href={`tel:9266910290`}
            className="hidden sm:flex items-center gap-2 text-sm font-bold hover:text-sunrise-gold transition-colors"
          >
            <Phone className="w-4 h-4 text-sunrise-gold" />
            9266910290
          </a>
          <Link to="/book" className="bg-sunrise-gold text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-sunrise-gold/20 flex items-center justify-center">
            BOOK NOW
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};
