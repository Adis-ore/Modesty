import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';
import { DUMMY_SKILLS } from '../../lib/dummyData';

function RingProgress({ label, pct, color = '#7c3aed', size = 90 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="6" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-black text-white text-sm">{pct}%</span>
        </div>
      </div>
      <span className="font-heading text-[10px] text-violet-300 tracking-widest uppercase text-center">{label}</span>
    </div>
  );
}

function SkillsDecor() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 px-6">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="absolute opacity-[0.04]">
        <polygon points="100,8 192,188 8,188" fill="#7c3aed" />
      </svg>

      <p className="font-heading text-[10px] text-violet-400 tracking-[0.25em] uppercase relative z-10">Proficiency</p>

      <div className="flex gap-6 relative z-10">
        <RingProgress label="Design" pct={92} color="#7c3aed" />
        <RingProgress label="Consulting" pct={86} color="#a78bfa" size={90} />
      </div>
      <div className="flex gap-6 relative z-10">
        <RingProgress label="Creative" pct={89} color="#c4b5fd" />
        <RingProgress label="Strategy" pct={83} color="#8b5cf6" />
      </div>

      <div className="w-full bg-violet-900/30 border border-violet-500/20 rounded-xl px-4 py-3 relative z-10 backdrop-blur-sm text-center">
        <div className="font-heading font-black text-white text-lg">13+</div>
        <div className="font-heading text-[10px] text-violet-300 tracking-widest uppercase mt-0.5">Skills & Competencies</div>
      </div>

      <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute bottom-10 left-8 w-1.5 h-1.5 rounded-full bg-violet-500/25" />
    </div>
  );
}

export default function SkillsSection({ skills }) {
  const list = skills?.length ? skills : DUMMY_SKILLS;
  const categories = [...new Set(list.map((s) => s.category).filter(Boolean))];
  const [activeTab, setActiveTab] = useState(categories[0] || '');

  const filtered = activeTab ? list.filter((s) => s.category === activeTab) : list;

  return (
    <SectionLayout id="skills" nextSection="projects" rightDecor={<SkillsDecor />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="font-heading font-black leading-none mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
          <span className="text-violet-400">My</span>
          <br />
          <span className="text-white">Skills</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all ${
                activeTab === cat
                  ? 'bg-violet-600 text-white'
                  : 'border border-violet-600/40 text-violet-300 hover:border-violet-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden p-5 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-heading font-semibold">{item.skill}</span>
                <span className="text-violet-400 text-xs font-heading font-bold">{item.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-violet-900/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.2, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile-only ring row */}
        <div className="md:hidden flex justify-around mt-5 bg-white/[0.03] border border-violet-500/30 rounded-2xl py-4">
          <RingProgress label="Design" pct={92} color="#7c3aed" size={72} />
          <RingProgress label="Consulting" pct={86} color="#a78bfa" size={72} />
          <RingProgress label="Creative" pct={89} color="#c4b5fd" size={72} />
        </div>
      </motion.div>
    </SectionLayout>
  );
}
