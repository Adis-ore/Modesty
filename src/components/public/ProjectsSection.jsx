import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2 } from 'lucide-react';
import SectionLayout from './SectionLayout';
import Lightbox from './Lightbox';

function ProjectsDecor({ allProjects }) {
  const categories = [...new Set(allProjects.map((p) => p.category).filter(Boolean))];
  const colors = ['from-violet-700 to-violet-500', 'from-purple-700 to-fuchsia-500', 'from-indigo-700 to-violet-500'];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-6">
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="absolute opacity-[0.04]">
        <rect x="20" y="20" width="80" height="80" rx="12" fill="#7c3aed" />
        <rect x="120" y="20" width="80" height="80" rx="12" fill="#a78bfa" />
        <rect x="20" y="120" width="80" height="80" rx="12" fill="#a78bfa" />
        <rect x="120" y="120" width="80" height="80" rx="12" fill="#7c3aed" />
      </svg>

      <p className="font-heading text-[10px] text-violet-400 tracking-[0.25em] uppercase relative z-10">Portfolio Categories</p>

      <div className="flex flex-col gap-2.5 w-full relative z-10">
        {categories.map((cat, i) => {
          const count = allProjects.filter((p) => p.category === cat).length;
          return (
            <div key={cat} className={`bg-gradient-to-r ${colors[i % colors.length]} p-px rounded-xl`}>
              <div className="bg-violet-950/80 rounded-[11px] px-4 py-3 flex items-center justify-between backdrop-blur-sm">
                <span className="font-heading font-bold text-white text-xs">{cat}</span>
                <span className="font-heading font-black text-violet-300 text-lg leading-none">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-violet-900/30 border border-violet-500/20 rounded-xl px-4 py-3 text-center relative z-10 backdrop-blur-sm">
        <div className="font-heading font-black text-white text-xl">{allProjects.length}</div>
        <div className="font-heading text-[10px] text-violet-300 tracking-widest uppercase mt-0.5">Total Works in Portfolio</div>
      </div>

      <div className="absolute top-10 right-8 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute bottom-12 left-6 w-1.5 h-1.5 rounded-full bg-violet-500/25" />
    </div>
  );
}

export default function ProjectsSection({ projects }) {
  const allProjects = projects || [];
  const categories = [...new Set(allProjects.map((p) => p.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === '' || activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const displayCategories = categories.length
    ? categories
    : ['Brand Logo Designs', 'Business Flyer Designs', 'Poster Designs'];

  function splitTitle(cat) {
    const words = cat.split(' ');
    return { first: words[0], rest: words.slice(1).join(' ') };
  }

  const activeCat = activeCategory || displayCategories[0] || 'My';
  const { first, rest } = splitTitle(activeCat);

  return (
    <SectionLayout id="projects" nextSection="reviews" rightDecor={<ProjectsDecor allProjects={allProjects} />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="font-heading font-black leading-none mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
          <span className="text-violet-400">{first}</span>
          <br />
          <span className="text-white">{rest || 'Designs'}</span>
        </h2>

        {displayCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displayCategories.map((cat) => {
              const count = allProjects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-heading font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-violet-600 text-white'
                      : 'border border-violet-600/40 text-violet-300 hover:border-violet-500 hover:text-white'
                  }`}
                >
                  {cat}
                  {count > 0 && (
                    <span className={`rounded-full px-1.5 text-[10px] font-bold ${activeCategory === cat ? 'bg-white/20' : 'bg-violet-600/30'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] p-10 text-center">
            <p className="text-violet-400/60 text-sm font-heading">
              No projects yet — add some from the admin panel.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden p-3">
              <div className="grid grid-cols-2 gap-2.5">
                <AnimatePresence mode="popLayout">
                  {filtered.slice(0, 4).map((project, idx) => (
                    <motion.div
                      key={project.id || idx}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.22, delay: idx * 0.05 }}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3] bg-navy-800"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title || project.category}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-violet-900/30">
                          <span className="text-violet-500/50 text-xs font-heading">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                        {project.title && (
                          <p className="text-white text-xs font-heading font-semibold leading-tight">{project.title}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {filtered.length > 4 && (
              <button
                onClick={() => setLightboxIndex(0)}
                className="mt-3 w-full flex items-center justify-center gap-2 border border-violet-500/40 hover:border-violet-500 hover:bg-violet-600/10 text-violet-300 hover:text-white rounded-xl py-2.5 font-heading font-semibold text-xs tracking-wider transition-all"
              >
                <Grid2X2 size={14} />
                View all {filtered.length} works
              </button>
            )}
          </>
        )}
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
        />
      )}
    </SectionLayout>
  );
}
