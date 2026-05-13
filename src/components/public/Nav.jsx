import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', id: 'home' },
  { label: 'ABOUT', id: 'about' },
  { label: 'WHY ME', id: 'why-me' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'REVIEWS', id: 'reviews' },
  { label: 'CONTACT', id: 'contact' },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <polygon points="13,2 24,22 2,22" fill="#7c3aed" />
        <polygon points="13,7 20,20 6,20" fill="#0a0a1a" opacity="0.6" />
      </svg>
      <span className="font-heading font-bold text-[11px] uppercase tracking-widest text-white leading-tight hidden sm:block">
        Modesty Designs & Prints
      </span>
    </div>
  );
}

export default function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.35, rootMargin: '-64px 0px 0px 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-md border-b border-violet-600/15 shadow-lg shadow-violet-900/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="relative px-4 py-1.5 text-[11px] font-heading font-semibold tracking-widest transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-violet-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-violet-300 hover:text-white'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="md:hidden text-violet-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 38 }}
              className="fixed top-0 right-0 h-full w-72 bg-navy-950 border-l border-violet-600/20 z-[70] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-violet-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="space-y-2">
                {NAV_ITEMS.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-heading font-semibold text-sm tracking-widest transition-all duration-200 ${
                        active === id
                          ? 'bg-violet-600 text-white'
                          : 'text-violet-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
