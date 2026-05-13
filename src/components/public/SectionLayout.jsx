function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,2 33,32 3,32" fill="#7c3aed" />
        <polygon points="18,10 27,30 9,30" fill="transparent" stroke="#c4b5fd" strokeWidth="0.8" />
        <text x="18" y="26" textAnchor="middle" fontSize="6" fill="#c4b5fd" fontFamily="sans-serif">MDP</text>
      </svg>
      <div className="leading-tight">
        <div className="font-heading font-black text-base text-white uppercase tracking-widest">MODESTY</div>
        <div className="font-heading font-medium text-[10px] text-violet-300 uppercase tracking-[0.2em]">
          DESIGNS &amp; PRINTS
        </div>
      </div>
    </div>
  );
}

function MobileDecor() {
  return (
    <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Blurred glow orbs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="absolute bottom-20 -left-16 w-56 h-56 rounded-full bg-violet-700/12 blur-3xl" />
      <div className="absolute top-1/2 right-4 w-28 h-28 rounded-full bg-violet-500/10 blur-2xl" />

      {/* Floating triangle accents */}
      <svg className="absolute top-12 right-8 opacity-10" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,2 30,28 2,28" fill="#a78bfa" />
      </svg>
      <svg className="absolute bottom-28 right-16 opacity-8" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polygon points="10,1 19,18 1,18" fill="#7c3aed" />
      </svg>
      <svg className="absolute top-1/3 left-3 opacity-8" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,1 15,14 1,14" fill="#c4b5fd" />
      </svg>

      {/* Sharp accent dots */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-violet-400/50" />
      <div className="absolute top-32 right-6 w-1.5 h-1.5 rounded-full bg-violet-500/40" />
      <div className="absolute top-2/3 right-12 w-2.5 h-2.5 rounded-full bg-violet-600/35" />
      <div className="absolute bottom-40 left-8 w-2 h-2 rounded-full bg-violet-400/40" />
      <div className="absolute bottom-56 right-4 w-1.5 h-1.5 rounded-full bg-violet-300/35" />
      <div className="absolute top-1/4 left-6 w-1 h-1 rounded-full bg-violet-500/50" />
      <div className="absolute top-16 left-1/2 w-1 h-1 rounded-full bg-violet-400/30" />

      {/* Small decorative lines */}
      <div className="absolute top-24 right-10 w-8 h-px bg-violet-500/20 rotate-45" />
      <div className="absolute bottom-32 left-10 w-12 h-px bg-violet-400/15 -rotate-12" />
      <div className="absolute top-1/2 right-8 w-6 h-px bg-violet-600/25 rotate-30" />

      {/* Corner decorative rings */}
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-violet-500/10" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full border border-violet-600/8" />
      <div className="absolute top-8 right-24 w-10 h-10 rounded-full border border-violet-400/12" />
    </div>
  );
}

export default function SectionLayout({ id, photoUrl, nextSection, mobileBg = false, rightDecor, children }) {
  return (
    <section id={id} className="relative min-h-screen flex flex-col overflow-hidden">
      <MobileDecor />

      <div className="flex-1 flex relative">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-10 relative z-10 md:max-w-[62%]">
          {children}
        </div>

        {photoUrl ? (
          <>
            {mobileBg && (
              <div className="md:hidden absolute inset-0 pointer-events-none select-none z-0">
                <img
                  src={photoUrl}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  style={{ mixBlendMode: 'lighten', opacity: 0.13 }}
                  draggable={false}
                />
              </div>
            )}
            <div className="hidden md:block absolute right-0 top-0 h-full w-[36%] pointer-events-none select-none">
              <div
                className="absolute inset-y-0 left-0 w-3/5 z-10"
                style={{ background: 'linear-gradient(to right, #08031a 0%, transparent 100%)' }}
              />
              <img
                src={photoUrl}
                alt="Modesty Oluwagbemileke"
                className="w-full h-full object-cover object-top"
                style={{ mixBlendMode: 'lighten' }}
                draggable={false}
              />
            </div>
          </>
        ) : (
          <div className="hidden md:flex absolute right-0 top-0 h-full w-[36%] items-center justify-center pointer-events-none select-none overflow-hidden">
            {rightDecor}
          </div>
        )}
      </div>

      <div className="flex items-center px-6 md:px-12 lg:px-16 py-4 border-t border-violet-800/30 relative z-10 shrink-0">
        <BrandLogo />
      </div>
    </section>
  );
}
