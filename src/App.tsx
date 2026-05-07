/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JourneyTimeline } from './components/JourneyTimeline';
import { DestinationShowcase } from './components/DestinationShowcase';
import { Pricing } from './components/Pricing';
import { TrustStack } from './components/TrustStack';
import { CreatorProgram } from './components/CreatorProgram';
import { AmbassadorProgram } from './components/AmbassadorProgram';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { motion, useScroll, useSpring } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Lazy load pages
const BookNow = lazy(() => import('./pages/BookNow').then(module => ({ default: module.BookNow })));
const Admin = lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));
const AmbassadorApply = lazy(() => import('./pages/AmbassadorApply').then(module => ({ default: module.AmbassadorApply })));
const InfluencerApply = lazy(() => import('./pages/InfluencerApply').then(module => ({ default: module.InfluencerApply })));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy').then(module => ({ default: module.RefundPolicy })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const Terms = lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));

const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-himalaya-black">
    <div className="w-8 h-8 border-4 border-sunrise-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

// Standard smooth easing for a premium feel
const SMOOTH_EASE = [0.23, 1, 0.32, 1];

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative selection:bg-sunrise-gold selection:text-black">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sunrise-gold origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-screen" />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Why DU Batch Section */}
        <section className="py-32 px-6 bg-himalaya-black text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: SMOOTH_EASE }}
              className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold"
            >
              EXCLUSIVELY FOR DU BATCH OF 2026
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: SMOOTH_EASE, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-glow leading-tight"
            >
              Why this trek for your <br/>
              <span className="text-sunrise-gold italic font-serif">Graduating Summer?</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Last Core Memory", desc: "One final adventure with your batch before life happens.", icon: "🎓" },
                { title: "Spiritual Reset", desc: "Calm your mind at the highest Shiva temple after exams.", icon: "🕉️" },
                { title: "Elite Community", desc: "Travel with students from Hindu, Hansraj, SRCC & more.", icon: "🤝" }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-dark p-10 rounded-[2.5rem] border-white/5 relative group overflow-hidden"
                >
                  <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sunrise-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-sunrise-gold/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <JourneyTimeline />
        <DestinationShowcase />
        <Pricing />
        <AmbassadorProgram />
        <CreatorProgram />
        <TrustStack />
        <FAQ />

        {/* Final CTA Emotional Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: SMOOTH_EASE }}
            className="absolute inset-0"
          >
            <img 
              src="/images/testimonials_bg_1778044744815.webp" 
              alt="Majestic Himalayan peaks at sunrise" 
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-himalaya-black/80 via-himalaya-black/40 to-himalaya-black" />
          </motion.div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: SMOOTH_EASE }}
              className="space-y-8"
            >
              <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-glow leading-[0.85]">
                Your Himalayan Story <br/>
                <span className="text-sunrise-gold font-serif italic">Starts Here</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium">
                Seats are filling fast for the DU June Batch. Don't let your last college summer pass without reaching the summit.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link to="/book" className="group relative">
                  <div className="absolute -inset-1 bg-sunrise-gold rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative bg-sunrise-gold text-black px-12 py-6 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase tracking-widest opacity-70 leading-none mb-1 font-black">Total: ₹5,499</span>
                      <span className="text-2xl font-black leading-none">Book Now at ₹999</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
                
                <a 
                  href="https://wa.me/919266910290?text=Hi!%20I%20want%20to%20know%20more%20about%20the%20Chopta%20Tungnath%20Trek%202026." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass px-12 py-6 rounded-full font-bold text-xl hover:bg-white/15 transition-all duration-300 active:scale-95"
                >
                  Connect on WhatsApp
                </a>
              </div>
              
              <div className="pt-12 space-y-4">
                <p className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">
                  60 Seats • 39 Days to Departure • Limited Availability
                </p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-sunrise-gold/20" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ambassador-apply" element={<AmbassadorApply />} />
        <Route path="/influencer-apply" element={<InfluencerApply />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
