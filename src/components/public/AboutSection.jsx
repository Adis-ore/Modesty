import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';
import { DUMMY_ABOUT } from '../../lib/dummyData';

function AboutDecor() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-6">
      <svg width="260" height="260" viewBox="0 0 260 260" fill="none" className="absolute opacity-[0.04]">
        <polygon points="130,10 248,240 12,240" fill="#7c3aed" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <div className="bg-violet-950/70 border border-violet-500/25 rounded-2xl px-5 py-3.5 text-center w-full backdrop-blur-sm">
          <div className="font-heading font-black text-4xl text-white leading-none">12+</div>
          <div className="font-heading text-[10px] text-violet-300 tracking-widest mt-1 uppercase">Years of Experience</div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="bg-violet-950/60 border border-violet-500/20 rounded-xl px-3 py-3 text-center backdrop-blur-sm">
            <div className="font-heading font-black text-2xl text-violet-400 leading-none">200+</div>
            <div className="font-heading text-[9px] text-violet-300/70 tracking-wider mt-1 uppercase">Projects</div>
          </div>
          <div className="bg-violet-950/60 border border-violet-500/20 rounded-xl px-3 py-3 text-center backdrop-blur-sm">
            <div className="font-heading font-black text-2xl text-violet-400 leading-none">50+</div>
            <div className="font-heading text-[9px] text-violet-300/70 tracking-wider mt-1 uppercase">Clients</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {['Creative Designer', 'Lagos, NG', 'ACVA Founder', 'Brand Consultant'].map((tag) => (
            <span key={tag} className="bg-violet-900/40 border border-violet-600/25 text-violet-200 text-[10px] font-heading font-semibold tracking-wider px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 rounded-full px-4 py-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-[10px] font-heading font-semibold tracking-widest uppercase">Available for Projects</span>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-violet-500/30" />
      <div className="absolute bottom-12 right-8 w-3 h-3 rounded-full bg-violet-400/20" />
      <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-violet-300/25" />
    </div>
  );
}

export default function AboutSection({ data }) {
  const about = (data && Object.keys(data).length > 0) ? data : DUMMY_ABOUT;

  const paragraphs = [
    about.bio_paragraph_1,
    about.bio_paragraph_2,
    about.bio_paragraph_3,
    about.bio_paragraph_4,
  ].filter(Boolean);

  return (
    <SectionLayout id="about" nextSection="why-me" rightDecor={<AboutDecor />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading font-black leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
          <span className="text-violet-400">About </span>
          <span className="text-white">Me</span>
        </h2>

        <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
          {paragraphs.map((p, i) => (
            <div key={i}>
              <div className="px-6 py-4">
                <p className="text-white/85 text-sm leading-relaxed">{p}</p>
              </div>
              {i < paragraphs.length - 1 && <div className="h-px bg-violet-600/25 mx-6" />}
            </div>
          ))}
          {paragraphs.length === 0 && (
            <div className="p-6 space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 rounded-full bg-violet-800/30 animate-pulse" style={{ width: `${90 - i * 8}%` }} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile-only stat chips */}
        <div className="md:hidden flex flex-wrap gap-2 mt-4">
          <span className="bg-violet-900/50 border border-violet-600/30 text-violet-200 text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full">12+ Yrs Experience</span>
          <span className="bg-violet-900/50 border border-violet-600/30 text-violet-200 text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full">200+ Projects</span>
          <span className="bg-violet-900/50 border border-violet-600/30 text-violet-200 text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full">ACVA Founder</span>
          <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 rounded-full px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-[11px] font-heading font-semibold">Available</span>
          </div>
        </div>
      </motion.div>
    </SectionLayout>
  );
}
