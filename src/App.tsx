/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
import { PAYMENT_LINK } from './constants';
import { Routes, Route, Link } from 'react-router-dom';
import { BookNow } from './pages/BookNow';
import { Admin } from './pages/Admin';
import { AmbassadorApply } from './pages/AmbassadorApply';
import { InfluencerApply } from './pages/InfluencerApply';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sunrise-gold origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Why DU Batch Section */}
        <section className="py-24 px-6 bg-himalaya-black text-center relative">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block glass px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-sunrise-gold"
            >
              EXCLUSIVELY FOR DU BATCH OF 2026
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow">
              Why this trek for your <br/>
              <span className="text-sunrise-gold">Graduating Summer?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Last Core Memory", desc: "One final adventure with your batch before life happens." },
                { title: "Spiritual Reset", desc: "Calm your mind at the highest Shiva temple after exams." },
                { title: "Elite Community", desc: "Travel with students from Hindu, Hansraj, SRCC & more." }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark p-8 rounded-3xl border-white/5"
                >
                  <h3 className="font-bold mb-3">{card.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{card.desc}</p>
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
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <img 
            src="/images/testimonials_bg_1778044744815.png" 
            alt="Chandrashila Sunrise" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-himalaya-black/60 backdrop-blur-[2px]" />
          
          <div className="relative z-10 text-center px-6">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-glow"
            >
              Your Himalayan Story <br/>
              <span className="text-sunrise-gold font-serif italic">Starts Here</span>
            </motion.h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto">
              Seats are filling fast for the DU June Batch. Don't let your last college summer pass without a summit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="bg-sunrise-gold text-black px-12 py-5 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3">
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-widest opacity-80 leading-none mb-1 font-bold">Total: ₹5,499</span>
                  <span className="text-xl font-bold leading-none">Book Now at ₹999</span>
                </div>
              </Link>
              <button className="glass px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-colors">
                Connect on WhatsApp
              </button>
            </div>
            <p className="mt-8 text-xs font-bold tracking-widest text-white/30 uppercase">60 Seats • 39 Days to Departure • Locked</p>
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookNow />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/ambassador-apply" element={<AmbassadorApply />} />
      <Route path="/influencer-apply" element={<InfluencerApply />} />
    </Routes>
  );
}
