import { motion } from 'framer-motion';
import { Mail, Zap } from 'lucide-react';
import SectionLayout from './SectionLayout';
import { DUMMY_CONTACT } from '../../lib/dummyData';

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}

const PLATFORM_CONFIG = {
  whatsapp: { Icon: WhatsAppIcon, label: 'WhatsApp', getHref: (v) => `https://wa.me/${v.replace(/\D/g, '')}` },
  linkedin: { Icon: LinkedInIcon, label: 'LinkedIn', getHref: (v) => `https://linkedin.com/in/${v}` },
  facebook: { Icon: FacebookIcon, label: 'Facebook', getHref: (v) => `https://facebook.com/${v}` },
  tiktok: { Icon: TikTokIcon, label: 'TikTok', getHref: (v) => `https://tiktok.com/@${v}` },
  email: { Icon: Mail, label: 'Email', getHref: (v) => `mailto:${v}` },
};

function ContactDecor({ list }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-6">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="absolute opacity-[0.04]">
        <polygon points="100,8 192,188 8,188" fill="#7c3aed" />
      </svg>

      <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 rounded-full px-4 py-2 relative z-10">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-300 text-[11px] font-heading font-semibold tracking-widest uppercase">Available for Work</span>
      </div>

      <div className="w-full bg-violet-950/60 border border-violet-500/20 rounded-2xl p-4 relative z-10 backdrop-blur-sm text-center">
        <Zap size={22} className="text-violet-400 mb-1" />
        <div className="font-heading font-black text-white text-sm">Fast Response</div>
        <div className="font-heading text-[10px] text-violet-300/70 mt-0.5">Usually within 24 hours</div>
      </div>

      <div className="flex flex-col gap-2 w-full relative z-10">
        {list.slice(0, 4).map((item, i) => {
          const key = item.platform?.toLowerCase();
          const config = PLATFORM_CONFIG[key];
          if (!config) return null;
          const { Icon, label } = config;
          return (
            <div key={i} className="bg-violet-950/50 border border-violet-500/15 rounded-xl px-3 py-2 flex items-center gap-3 backdrop-blur-sm">
              <div className="w-6 h-6 rounded-full border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0" style={{ fontSize: 11 }}>
                <Icon />
              </div>
              <span className="font-heading font-semibold text-violet-200 text-[11px]">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute bottom-12 left-6 w-1.5 h-1.5 rounded-full bg-violet-500/25" />
    </div>
  );
}

export default function ContactSection({ contact }) {
  const list = contact?.length ? contact : DUMMY_CONTACT;

  return (
    <SectionLayout id="contact" nextSection={null} rightDecor={<ContactDecor list={list} />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="font-heading font-black leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
          <span className="text-violet-400">Let&apos;s</span>
          <br />
          <span className="text-white">Connect</span>
        </h2>

        {/* Mobile-only availability badge */}
        <div className="md:hidden flex items-center gap-2 mb-4 w-fit bg-emerald-950/60 border border-emerald-500/30 rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-xs font-heading font-semibold">Available for Work</span>
        </div>

        <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
          {list.map((item, i) => {
            const key = item.platform?.toLowerCase();
            const config = PLATFORM_CONFIG[key];
            if (!config) return null;
            const { Icon, label, getHref } = config;
            return (
              <div key={i}>
                <a
                  href={getHref(item.handle_or_value)}
                  target={key !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 px-6 py-4 hover:bg-violet-600/10 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-violet-500/50 flex items-center justify-center text-violet-300 shrink-0 group-hover:border-violet-400 group-hover:text-white transition-colors">
                    <Icon />
                  </div>
                  <div>
                    <div className="text-[10px] font-heading text-violet-400 tracking-wider uppercase">{label}</div>
                    <div className="text-white font-medium text-sm">{item.handle_or_value}</div>
                  </div>
                </a>
                {i < list.length - 1 && <div className="h-px bg-violet-600/20 mx-6" />}
              </div>
            );
          })}
        </div>
      </motion.div>
    </SectionLayout>
  );
}
