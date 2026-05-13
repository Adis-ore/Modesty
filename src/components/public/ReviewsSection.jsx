import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import SectionLayout from './SectionLayout';
import { DUMMY_REVIEWS } from '../../lib/dummyData';

function ReviewsDecor() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-5 px-6">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="absolute opacity-[0.04]">
        <circle cx="100" cy="100" r="90" stroke="#7c3aed" strokeWidth="2" strokeDasharray="8 4" />
      </svg>

      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="relative z-10 opacity-80">
        <text x="0" y="55" fontSize="72" fontFamily="Georgia, serif" fill="#7c3aed" opacity="0.6">&ldquo;</text>
      </svg>

      <div className="w-full bg-violet-950/60 border border-violet-500/20 rounded-2xl p-4 relative z-10 backdrop-blur-sm text-center">
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <div className="font-heading font-black text-white text-3xl">100%</div>
        <div className="font-heading text-[10px] text-violet-300 tracking-widest uppercase mt-1">Client Satisfaction</div>
      </div>

      <div className="flex flex-col gap-2 w-full relative z-10">
        <div className="bg-violet-950/50 border border-violet-500/15 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-7 h-7 rounded-full bg-violet-700/40 flex items-center justify-center text-violet-300"><MessageCircle size={14} /></div>
          <div>
            <div className="font-heading font-bold text-white text-xs">Genuine Testimonials</div>
            <div className="font-heading text-[9px] text-violet-300/70">Real client feedback</div>
          </div>
        </div>
        <div className="bg-violet-950/50 border border-violet-500/15 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-7 h-7 rounded-full bg-violet-700/40 flex items-center justify-center text-violet-300"><Users size={14} /></div>
          <div>
            <div className="font-heading font-bold text-white text-xs">Long-term Clients</div>
            <div className="font-heading text-[9px] text-violet-300/70">Repeat collaborations</div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-6 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute bottom-14 left-8 w-1.5 h-1.5 rounded-full bg-violet-500/25" />
    </div>
  );
}

function WhatsAppBubble({ review }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#111827] border border-white/10">
      <div className="p-5">
        {review.review_text.split('\n\n').map((block, i) => (
          <p key={i} className="text-white text-sm leading-relaxed mb-3 last:mb-0">{block}</p>
        ))}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
          {review.reviewer_name && (
            <span className="text-violet-300 text-xs font-heading font-semibold">{review.reviewer_name}</span>
          )}
          {review.timestamp && (
            <span className="text-white/40 text-xs ml-auto">{review.timestamp}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ reviews }) {
  const list = reviews?.length ? reviews : DUMMY_REVIEWS;

  return (
    <SectionLayout id="reviews" nextSection="contact" rightDecor={<ReviewsDecor />}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <h2 className="font-heading font-black leading-none mb-8" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
          <span className="text-violet-400">Client</span>
          <br />
          <span className="text-white">Reviews</span>
        </h2>

        {/* Mobile-only rating strip */}
        <div className="md:hidden flex items-center gap-3 mb-4 bg-white/[0.03] border border-violet-500/30 rounded-xl px-4 py-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="font-heading font-black text-white text-sm">100%</span>
          <span className="font-heading text-xs text-violet-300">Client Satisfaction</span>
        </div>

        <div className="rounded-2xl border border-violet-500/50 bg-white/[0.04] backdrop-blur-sm overflow-hidden p-5 space-y-4 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-transparent">
          {list.map((review, i) => (
            <motion.div
              key={review.id || i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <WhatsAppBubble review={review} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionLayout>
  );
}
