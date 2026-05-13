import { motion } from 'framer-motion';
import SectionLayout from './SectionLayout';

export default function HeroSection({ photoUrl }) {
  return (
    <SectionLayout id="home" photoUrl={photoUrl} nextSection="about" mobileBg={true}>
      <div className="flex flex-col items-start md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-8"
        >
          <div
            className="font-heading font-black text-white leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
          >
            My
          </div>
          <div
            className="font-heading font-black text-violet-500 leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}
          >
            Portfolio
          </div>
        </motion.div>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-heading uppercase tracking-[0.2em] text-xs text-violet-300 mt-2"
        >
          Creative Designer &bull; Brand &amp; Event Consultant
        </motion.p>
      </div>
    </SectionLayout>
  );
}
