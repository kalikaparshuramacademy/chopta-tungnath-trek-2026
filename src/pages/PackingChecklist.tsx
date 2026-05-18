import { Footer } from '../components/Footer';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Printer, Download, CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BATCHES = [
  '6th June 2026 (June 6–10)',
  '11th June 2026 (June 11–15)',
  '14th June 2026 (June 14–18)',
  '20th June 2026 (June 20–24)',
  '23rd June 2026 (June 23–27)',
  '26th June 2026 (June 26–30)',
  '28th June 2026 (June 28–Jul 2)',
  '30th June 2026 (June 30–Jul 4)',
  '3rd July 2026 (July 3–7)',
  '6th July 2026 (July 6–10)',
];

interface Item { label: string; checked?: boolean; tip?: string; }
interface Category { title: string; icon: string; items: Item[]; }

const BASE_CHECKLIST: Category[] = [
  {
    title: 'Clothing & Warmth', icon: '🧥',
    items: [
      { label: 'Warm thermal inner wear (2 pairs)', tip: 'Temperature at summit can drop to 0°C' },
      { label: 'Fleece jacket / mid-layer', tip: 'Essential for Tungnath climb' },
      { label: 'Waterproof windcheater / rain jacket' },
      { label: 'Quick-dry trekking pants (2 pairs)' },
      { label: 'Cotton t-shirts (2)', tip: 'For warm lower areas like Rishikesh' },
      { label: 'Woollen cap / beanie' },
      { label: 'Gloves (lightweight)' },
      { label: 'Sunglasses (UV protection)' },
      { label: 'Undergarments & socks (4–5 pairs)' },
    ]
  },
  {
    title: 'Footwear', icon: '👟',
    items: [
      { label: 'Trekking / hiking shoes (ankle support)', tip: 'Most critical item for the trek' },
      { label: 'Waterproof gaiters (optional)' },
      { label: 'Flip flops / sandals for camp', tip: 'Rest your feet after trek' },
      { label: 'Extra pair of socks inside your day bag' },
    ]
  },
  {
    title: 'Backpack & Gear', icon: '🎒',
    items: [
      { label: '40–50L trekking backpack (waterproof)' },
      { label: '10–15L day pack (for trek day)', tip: 'Keep this light on summit day' },
      { label: 'Rain cover for backpack' },
      { label: 'Trekking poles (optional)' },
      { label: 'Headlamp + spare batteries' },
      { label: 'Sleeping bag liner (optional)' },
    ]
  },
  {
    title: 'Health & Safety', icon: '💊',
    items: [
      { label: 'Personal prescription medicines' },
      { label: 'Basic first aid (bandages, antiseptic)' },
      { label: 'Pain relievers (Disprin / Crocin)' },
      { label: 'Anti-diarrhea medication' },
      { label: 'Diamox (altitude sickness — consult doctor)', tip: 'May be needed at 3,680m+' },
      { label: 'SPF 50+ sunscreen (tube)', tip: 'UV is intense at high altitude' },
      { label: 'Lip balm (SPF preferred)' },
      { label: 'Personal oximeter (optional)' },
    ]
  },
  {
    title: 'Essentials & Documents', icon: '📄',
    items: [
      { label: 'Government Photo ID (Aadhar / Passport)' },
      { label: 'Booking confirmation / receipt' },
      { label: 'Emergency contact card (written, not just phone)' },
      { label: 'Cash (₹2,000–3,000 minimum)', tip: 'ATMs rare after Ukhimath' },
      { label: 'Power bank (10,000 mAh+)' },
      { label: 'Phone charging cable' },
    ]
  },
  {
    title: 'Food & Hydration', icon: '🧃',
    items: [
      { label: 'Refillable water bottle / hydration pack (2L)' },
      { label: 'Electrolyte sachets / ORS packets', tip: 'Crucial for summit day' },
      { label: 'Energy bars / dry fruits / nuts (trail mix)' },
      { label: 'Glucose / energy gels' },
      { label: 'Chocolates for summit celebration 🍫' },
    ]
  },
  {
    title: 'Toiletries', icon: '🧴',
    items: [
      { label: 'Biodegradable soap & shampoo' },
      { label: 'Toothbrush & toothpaste' },
      { label: 'Wet wipes / tissues (important!)' },
      { label: 'Hand sanitizer' },
      { label: 'Quick-dry towel' },
      { label: 'Personal hygiene items' },
    ]
  },
];

export const PackingChecklist = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [categories, setCategories] = useState<Category[]>(BASE_CHECKLIST);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const [name, setName] = useState('');

  const toggle = (catIdx: number, itemIdx: number) => {
    setCategories(cats => cats.map((cat, ci) =>
      ci !== catIdx ? cat : {
        ...cat,
        items: cat.items.map((item, ii) =>
          ii !== itemIdx ? item : { ...item, checked: !item.checked }
        )
      }
    ));
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedItems = categories.reduce((sum, c) => sum + c.items.filter(i => i.checked).length, 0);
  const pct = Math.round((checkedItems / totalItems) * 100);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-himalaya-black text-white selection:bg-sunrise-gold selection:text-black pt-24 px-4 pb-16">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/hero_bg_1778044589465.webp')] bg-cover bg-center mix-blend-overlay" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="inline-block glass px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-sunrise-gold mb-4">
            PACK SMART
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow mb-3">
            Packing <span className="text-sunrise-gold font-serif italic">Checklist</span>
          </h1>
          <p className="text-white/50">Your complete gear list for the Chopta Tungnath Trek 2026</p>
        </div>

        {/* Config */}
        <div className="glass-dark p-6 rounded-3xl border border-white/10 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest text-white/50 uppercase block mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="E.g. Rahul Sharma"
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sunrise-gold/50 transition-all placeholder-white/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-white/50 uppercase block mb-2">Your Batch</label>
              <select
                value={selectedBatch}
                onChange={e => setSelectedBatch(e.target.value)}
                className="w-full bg-himalaya-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sunrise-gold/50 transition-all"
              >
                <option value="">Select your batch</option>
                {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Packing Progress</span>
              <span className="font-bold text-sunrise-gold">{checkedItems} / {totalItems} items</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${pct === 100 ? 'bg-green-500' : 'bg-sunrise-gold'}`}
              />
            </div>
            {pct === 100 && (
              <p className="text-green-400 text-sm font-bold mt-2 text-center">🎉 You're fully packed and ready to trek!</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 glass py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              <Printer className="w-4 h-4" /> Print Checklist
            </button>
            <button
              onClick={() => setCategories(BASE_CHECKLIST)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((cat, ci) => {
            const catChecked = cat.items.filter(i => i.checked).length;
            const isCollapsed = collapsed[ci];

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.05 }}
                className="glass-dark rounded-2xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setCollapsed(c => ({ ...c, [ci]: !c[ci] }))}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="text-left">
                      <p className="font-bold">{cat.title}</p>
                      <p className="text-white/40 text-xs">{catChecked} / {cat.items.length} packed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sunrise-gold rounded-full transition-all"
                        style={{ width: `${(catChecked / cat.items.length) * 100}%` }}
                      />
                    </div>
                    {isCollapsed ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronUp className="w-4 h-4 text-white/40" />}
                  </div>
                </button>

                {!isCollapsed && (
                  <div className="px-5 pb-5 space-y-2">
                    {cat.items.map((item, ii) => (
                      <button
                        key={ii}
                        onClick={() => toggle(ci, ii)}
                        className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                      >
                        {item.checked
                          ? <CheckSquare className="w-5 h-5 text-sunrise-gold shrink-0 mt-0.5" />
                          : <Square className="w-5 h-5 text-white/20 shrink-0 mt-0.5 group-hover:text-white/40 transition-colors" />
                        }
                        <div>
                          <p className={`text-sm ${item.checked ? 'line-through text-white/30' : 'text-white/80'}`}>
                            {item.label}
                          </p>
                          {item.tip && !item.checked && (
                            <p className="text-xs text-sunrise-gold/60 mt-0.5">💡 {item.tip}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-white/20 text-xs mt-10">
          Peak & River Travels · Chopta Tungnath Trek 2026 · Packing Guide
        </p>
      </div>
    <Footer />
    </div>
  );
};
