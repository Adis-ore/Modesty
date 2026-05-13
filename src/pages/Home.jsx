import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/public/Nav';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import WhyMeSection from '../components/public/WhyMeSection';
import SkillsSection from '../components/public/SkillsSection';
import ProjectsSection from '../components/public/ProjectsSection';
import ReviewsSection from '../components/public/ReviewsSection';
import ContactSection from '../components/public/ContactSection';
import { getAbout, getWhyMe, getTools, getProjects, getReviews, getContact } from '../lib/sheets';
import {
  DUMMY_ABOUT,
  DUMMY_WHY_ME,
  DUMMY_TOOLS,
  DUMMY_SKILLS,
  DUMMY_PROJECTS,
  DUMMY_REVIEWS,
  DUMMY_CONTACT,
} from '../lib/dummyData';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAbout().catch(() => ({})),
      getWhyMe().catch(() => []),
      getTools().catch(() => []),
      getProjects().catch(() => []),
      getReviews().catch(() => []),
      getContact().catch(() => []),
    ]).then(([about, whyMe, tools, projects, reviews, contact]) => {
      setData({
        about: (about && Object.keys(about).length > 0) ? about : DUMMY_ABOUT,
        whyMe: whyMe.length ? whyMe : DUMMY_WHY_ME,
        tools: tools.length ? tools : DUMMY_TOOLS,
        projects: projects.length ? projects : DUMMY_PROJECTS,
        reviews: reviews.length ? reviews : DUMMY_REVIEWS,
        contact: contact.length ? contact : DUMMY_CONTACT,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 44,42 4,42" fill="#7c3aed" />
            <polygon points="24,12 36,38 12,38" fill="#0a0a1a" opacity="0.7" />
          </svg>
          <span className="font-heading text-xs uppercase tracking-widest text-violet-400">Loading</span>
        </motion.div>
      </div>
    );
  }

  const photoUrl = data.about?.photo_url || '';

  return (
    <div>
      <Nav />
      <HeroSection photoUrl={photoUrl} />
      <AboutSection data={data.about} />
      <WhyMeSection whyMe={data.whyMe} tools={data.tools} />
      <SkillsSection skills={DUMMY_SKILLS} />
      <ProjectsSection projects={data.projects} />
      <ReviewsSection reviews={data.reviews} />
      <ContactSection contact={data.contact} />
    </div>
  );
}
