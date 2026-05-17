import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';

const WAYPOINTS = [
  { id: 'delhi', label: 'Delhi', sub: 'Departure (Night)', x: 150, y: 420, color: '#FFD700', day: 'Day 1' },
  { id: 'rishikesh', label: 'Rishikesh', sub: 'Gateway to Himalayas', x: 230, y: 320, color: '#60a5fa', day: 'Day 2' },
  { id: 'devprayag', label: 'Devprayag', sub: 'Sacred Confluence', x: 280, y: 260, color: '#a78bfa', day: 'Day 2' },
  { id: 'deoriatal', label: 'Deoria Tal', sub: '2,438m • Mirror Lake', x: 350, y: 200, color: '#34d399', day: 'Day 2' },
  { id: 'chopta', label: 'Chopta', sub: '2,680m • Mini Switzerland', x: 410, y: 150, color: '#f59e0b', day: 'Day 3' },
  { id: 'tungnath', label: 'Tungnath', sub: '3,680m • Highest Shiva Temple', x: 460, y: 100, color: '#f97316', day: 'Day 3' },
  { id: 'chandrashila', label: 'Chandrashila', sub: '4,000m • Summit 360°', x: 500, y: 85, color: '#ef4444', day: 'Day 3' },
];

// Build SVG path from waypoints
const pathD = WAYPOINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

export const TrekRouteMap = () => {
  const ref = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black/30 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold"
          >
            JOURNEY MAP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-glow"
          >
            Your <span className="text-sunrise-gold font-serif italic">Trek Route</span>
          </motion.h2>
          <p className="text-white/40">From Delhi plains to Himalayan summits — 5 epic days</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* SVG Map */}
            <div className="relative">
              <svg viewBox="0 20 650 420" className="w-full h-auto" aria-label="Trek route map">
                {/* Background hills */}
                <defs>
                  <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Background fill area */}
                <path
                  d={`${pathD} L 500 450 L 150 450 Z`}
                  fill="url(#routeGrad)"
                  opacity="0.1"
                />

                {/* Static dotted trail */}
                <path d={pathD} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="3" strokeDasharray="6 4" />

                {/* Animated route line */}
                <motion.path
                  ref={ref}
                  d={pathD}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />

                {/* Waypoints */}
                {WAYPOINTS.map((pt, i) => (
                  <motion.g
                    key={pt.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.3 + i * 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Pulse ring */}
                    <circle cx={pt.x} cy={pt.y} r="14" fill={pt.color} opacity="0.15" />
                    <circle cx={pt.x} cy={pt.y} r="8" fill={pt.color} opacity="0.3" />
                    {/* Dot */}
                    <circle cx={pt.x} cy={pt.y} r="5" fill={pt.color} filter="url(#glow)" />
                    {/* Label */}
                    <text
                      x={pt.id === 'chandrashila' ? pt.x - 8 : pt.x + 14}
                      y={pt.y + 4}
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor={pt.id === 'chandrashila' ? 'end' : 'start'}
                    >
                      {pt.label}
                    </text>
                    <text
                      x={pt.id === 'chandrashila' ? pt.x - 8 : pt.x + 14}
                      y={pt.y + 16}
                      fill={pt.color}
                      fontSize="7.5"
                      textAnchor={pt.id === 'chandrashila' ? 'end' : 'start'}
                      opacity="0.8"
                    >
                      {pt.sub}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>

            {/* Waypoint Cards */}
            <div className="space-y-3">
              {WAYPOINTS.map((pt, i) => (
                <motion.div
                  key={pt.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="flex items-center gap-4 glass-dark p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: pt.color + '20', border: `1px solid ${pt.color}40` }}>
                    <MapPin className="w-5 h-5" style={{ color: pt.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{pt.label}</p>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: pt.color + '20', color: pt.color }}>
                        {pt.day}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">{pt.sub}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pt.color }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
