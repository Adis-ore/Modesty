import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Zap, Briefcase, Layers } from 'lucide-react';
import SectionLayout from './SectionLayout';
import { DUMMY_WHY_ME, DUMMY_TOOLS } from '../../lib/dummyData';

function WhyMeDecor() {
  const cards = [
    { Icon: Palette, title: 'Creative', sub: 'Bold visuals that communicate' },
    { Icon: Zap, title: 'Reliable', sub: 'On-time, every time' },
    { Icon: Briefcase, title: 'Strategic', sub: 'Design with purpose' },
    { Icon: Layers, title: 'Versatile', sub: 'Any format, any brief' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 gap-4">
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className="absolute opacity-[0.04]">
        <circle cx="120" cy="120" r="110" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="120" cy="120" r="70" stroke="#a78bfa" strokeWidth="1" />
      </svg>

      <p className="font-heading text-[10px] text-violet-400 tracking-[0.25em] uppercase relative z-10">Why choose me</p>

      <div className="grid grid-cols-2 gap-3 w-full relative z-10">
        {cards.map((card) => (
          <div key={card.title} className="bg-violet-950/60 border border-violet-500/20 rounded-2xl p-4 backdrop-blur-sm">
            <card.Icon size={18} className="text-violet-400 mb-2" />
            <div className="font-heading font-black text-white text-sm leading-none">{card.title}</div>
            <div className="font-heading text-[9px] text-violet-300/70 tracking-wider mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="w-full bg-violet-900/30 border border-violet-500/20 rounded-xl px-4 py-3 text-center relative z-10 backdrop-blur-sm">
        <div className="font-heading font-black text-white text-sm">Trusted by brands across industries</div>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#a78bfa">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="absolute top-10 left-6 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute bottom-14 right-6 w-1.5 h-1.5 rounded-full bg-violet-500/25" />
    </div>
  );
}

export default function WhyMeSection({ whyMe, tools }) {
  const [tab, setTab] = useState('props');
  const props = whyMe?.length ? whyMe : DUMMY_WHY_ME;
  const toolList = tools?.length ? tools : DUMMY_TOOLS;

  return (
    <SectionLayout id="why-me" nextSection="skills" rightDecor={<WhyMeDecor />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading font-black leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
          <span className="text-violet-400">Design</span>
          <br />
          <span className="text-white">Tools</span>
        </h2>

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('props')}
            className={`px-4 py-1.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all ${
              tab === 'props' ? 'bg-violet-600 text-white' : 'border border-violet-600/40 text-violet-300 hover:border-violet-500'
            }`}
          >
            Why Me
          </button>
          <button
            onClick={() => setTab('tools')}
            className={`px-4 py-1.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all ${
              tab === 'tools' ? 'bg-violet-600 text-white' : 'border border-violet-600/40 text-violet-300 hover:border-violet-500'
            }`}
          >
            Software Tools
          </button>
        </div>

        {tab === 'props' && (
          <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
            {props.map((item, i) => (
              <div key={item.id || i}>
                <div className="px-5 py-3.5 flex gap-3">
                  <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold text-white text-sm leading-snug">{item.headline}</p>
                    {item.description && (
                      <p className="text-violet-200/65 text-xs leading-relaxed mt-0.5">{item.description}</p>
                    )}
                  </div>
                </div>
                {i < props.length - 1 && <div className="h-px bg-violet-600/20 mx-5" />}
              </div>
            ))}
          </div>
        )}

        {tab === 'tools' && (
          <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
            {toolList.map((t, i) => (
              <div key={t.id || i}>
                <div className="px-5 py-4 flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 shrink-0" />
                  <span className="text-white font-medium text-sm">{t.tool_name}</span>
                </div>
                {i < toolList.length - 1 && <div className="h-px bg-violet-600/20 mx-5" />}
              </div>
            ))}
          </div>
        )}

        {/* Mobile-only value cards */}
        <div className="md:hidden grid grid-cols-2 gap-2 mt-4">
          {[{ Icon: Palette, label: 'Creative' }, { Icon: Zap, label: 'Reliable' }, { Icon: Briefcase, label: 'Strategic' }, { Icon: Layers, label: 'Versatile' }].map(({ Icon, label }) => (
            <div key={label} className="bg-violet-950/50 border border-violet-600/20 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <Icon size={14} className="text-violet-400 shrink-0" />
              <span className="font-heading font-bold text-white text-xs">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionLayout>
  );
}
