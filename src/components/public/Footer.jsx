export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-violet-600/15 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="11,2 20,19 2,19" fill="#7c3aed" />
            <polygon points="11,6 17,18 5,18" fill="#0a0a1a" opacity="0.6" />
          </svg>
          <span className="font-heading font-bold text-[11px] uppercase tracking-widest text-white">
            Modesty Designs & Prints
          </span>
        </div>
        <p className="text-violet-400/60 text-xs font-heading">
          &copy; {year} Modesty Oluwagbemileke. All rights reserved.
        </p>
        <a
          href="https://www.instagram.com/modesty_designs_and_prints"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400/60 hover:text-violet-300 text-xs font-heading transition-colors"
        >
          African Creative Visionary Awards Founder
        </a>
      </div>
    </footer>
  );
}
