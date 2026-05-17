import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export const GALLERY_IMAGES = [
  { src: '/images/chopta_tungnath.png', caption: 'Tungnath Temple & Chopta Valley', tag: 'Tungnath' },
  { src: '/images/deoria_tal.png', caption: 'Deoria Tal — Mirror Lake Reflections', tag: 'Deoria Tal' },
  { src: '/images/rishikesh.png', caption: 'Ganga Aarti at Rishikesh', tag: 'Rishikesh' },
  { src: '/images/haridwar.png', caption: 'Har Ki Pauri Evening Aarti', tag: 'Haridwar' },
  { src: '/images/day2_deoria_tal_1778044472269.webp', caption: 'Trek to Deoria Tal', tag: 'Day 2' },
  { src: '/images/day3_tungnath_1778044489559.webp', caption: 'Tungnath Summit Trek', tag: 'Day 3' },
  { src: '/images/dest_chopta_1778044654935.webp', caption: 'Chopta Meadows at Dusk', tag: 'Chopta' },
  { src: '/images/dest_chandrashila_1778044684173.webp', caption: 'Chandrashila Summit — 4,000m', tag: 'Summit' },
  { src: '/images/dest_rishikesh_1778044611078.webp', caption: 'Rishikesh — Yoga Capital of the World', tag: 'Rishikesh' },
  { src: '/images/testimonials_bg_1778044744815.webp', caption: 'Himalayan Sunrise', tag: 'Views' },
];

interface LightboxProps { index: number; onClose: () => void; onPrev: () => void; onNext: () => void; }

const Lightbox = ({ index, onClose, onPrev, onNext }: LightboxProps) => {
  const img = GALLERY_IMAGES[index];

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/97 flex flex-col items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white/70 hover:text-white z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        aria-label="Previous"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-white z-10"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Next */}
      <button
        aria-label="Next"
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-white z-10"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <motion.div
        key={index}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-5xl max-h-[85dvh] px-14 md:px-20 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.caption}
          className="w-full max-h-[70dvh] object-contain rounded-xl md:rounded-2xl"
        />
        <div className="text-center mt-3 px-4">
          <p className="text-white font-bold text-sm md:text-base">{img.caption}</p>
          <p className="text-white/40 text-xs mt-1">{index + 1} / {GALLERY_IMAGES.length} · swipe to navigate</p>
        </div>
      </motion.div>
    </motion.div>
  );
};


export const PhotoGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openAt = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0), []);
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % GALLERY_IMAGES.length : 0), []);

  return (
    <>
      <section className="py-24 px-6 bg-himalaya-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold"
            >
              TRIP GALLERY
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-glow"
            >
              Through the <span className="text-sunrise-gold font-serif italic">Lens</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 max-w-xl mx-auto"
            >
              Every frame tells the story of peaks, prayers, and priceless memories.
            </motion.p>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openAt(i)}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-bold truncate">{img.caption}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-black/40 backdrop-blur-sm text-white/70 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {img.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  );
};
