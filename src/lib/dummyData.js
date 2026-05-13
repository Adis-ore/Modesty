export const DUMMY_ABOUT = {
  bio_paragraph_1:
    'I am Modesty Oluwagbemileke, a creative designer, brand and event consultant, and the founder of the African Creative Visionary Awards. With over 12 years of experience in both print and digital design, I have built a strong passion for helping brands, businesses, and individuals bring their ideas to life through creative visuals and strategic branding.',
  bio_paragraph_2:
    'I specialize in brand identity design, social media creatives, and captivating movie poster designs that not only communicate effectively but also attract and engage prospective clients. Over the years, I have had the privilege of working with organizations, companies, business owners, and creative individuals across different industries, delivering designs that are purposeful, professional, and visually compelling.',
  bio_paragraph_3:
    'Beyond design, I am also passionate about empowering the next generation of creatives. I have trained and mentored students who are genuinely passionate about learning graphic design, helping them grow both creatively and professionally.',
  bio_paragraph_4:
    'My goal is to consistently transform ideas into clean, attractive, and engaging designs that serve meaningful purposes. I focus on quality, clarity, creativity, and visuals that leave lasting impressions while contributing to brand visibility, audience engagement, and business growth.',
  photo_url: '/modesty-photo.jpg',
};

export const DUMMY_WHY_ME = [
  {
    id: '1',
    headline: 'Creative designs that speak for your brand',
    description:
      "I don't just make designs look good — I create visuals that communicate clearly, attract attention, and connect with the right audience.",
  },
  {
    id: '2',
    headline: 'Reliable and easy to work with',
    description:
      'I value communication, professionalism, and delivering projects on time while maintaining a smooth working relationship with clients.',
  },
  {
    id: '3',
    headline: 'Strong understanding of branding',
    description:
      'I help businesses build a unique identity that stands out and stays memorable across every platform.',
  },
  {
    id: '4',
    headline: 'Versatility across creative projects',
    description:
      'From brand identity designs to social media graphics, event consulting, and movie posters, I bring creativity and flexibility to every project.',
  },
  {
    id: '5',
    headline: 'Passionate about helping brands grow',
    description:
      'Your success matters to me. I focus on creating designs that not only look attractive but also help increase visibility and engagement.',
  },
  {
    id: '6',
    headline: 'A visionary creative leader',
    description:
      "As the founder of the African Creative Visionary Awards, I'm deeply connected to the creative industry and committed to inspiring and elevating creatives through impactful work.",
  },
];

export const DUMMY_TOOLS = [
  { id: '1', tool_name: 'Corel Draw' },
  { id: '2', tool_name: 'Adobe Photoshop' },
  { id: '3', tool_name: 'Adobe Illustrator' },
  { id: '4', tool_name: 'Figma' },
  { id: '5', tool_name: 'Canva' },
];

// Placeholder gradient tiles — swapped for real Cloudinary URLs via admin
const makeColor = (h, s, l) => `hsl(${h},${s}%,${l}%)`;

function svgPlaceholder(label, bg1, bg2) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${bg1}'/><stop offset='1' stop-color='${bg2}'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='22' font-weight='bold' fill='rgba(255,255,255,0.85)'>${label}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

export const DUMMY_PROJECTS = [
  {
    id: '1',
    category: 'Brand Logo Designs',
    image_url: svgPlaceholder('AuraVibes Brand', '%237c3aed', '%23a3e635'),
    title: 'AuraVibes Brand Identity',
    order: '1',
  },
  {
    id: '2',
    category: 'Brand Logo Designs',
    image_url: svgPlaceholder('Yard Fixers Logo', '%231a0a3a', '%2316a34a'),
    title: 'Yard Fixers Logo Design',
    order: '2',
  },
  {
    id: '3',
    category: 'Brand Logo Designs',
    image_url: svgPlaceholder('Brand Identity', '%230a0a1a', '%237c3aed'),
    title: 'Full Brand Identity',
    order: '3',
  },
  {
    id: '4',
    category: 'Brand Logo Designs',
    image_url: svgPlaceholder('Logo Concept', '%23581c87', '%23a3e635'),
    title: 'Logo Concept Design',
    order: '4',
  },
  {
    id: '5',
    category: 'Business Flyer Designs',
    image_url: svgPlaceholder('Aso & Aroma', '%23831843', '%23f97316'),
    title: 'Aso & Aroma Flyer',
    order: '5',
  },
  {
    id: '6',
    category: 'Business Flyer Designs',
    image_url: svgPlaceholder("Didi's Beauty", '%230f172a', '%23ec4899'),
    title: "Didi's Beauty Touch",
    order: '6',
  },
  {
    id: '7',
    category: 'Business Flyer Designs',
    image_url: svgPlaceholder('Vee Cocinera', '%23422006', '%23f59e0b'),
    title: 'Vee Cocinera — Small Chops',
    order: '7',
  },
  {
    id: '8',
    category: 'Business Flyer Designs',
    image_url: svgPlaceholder('Valentine Pkg', '%234c0519', '%23f43f5e'),
    title: 'Valentine Signature Packages',
    order: '8',
  },
  {
    id: '9',
    category: 'Poster Designs',
    image_url: svgPlaceholder('The Last Guardian', '%23172554', '%23f97316'),
    title: 'The Last Guardian — Netflix',
    order: '9',
  },
  {
    id: '10',
    category: 'Poster Designs',
    image_url: svgPlaceholder('Broken Hope', '%231c1917', '%23a16207'),
    title: 'Broken Hope — Film Poster',
    order: '10',
  },
  {
    id: '11',
    category: 'Poster Designs',
    image_url: svgPlaceholder('House Party', '%234c1d95', '%23f97316'),
    title: 'House Party — 4th Edition',
    order: '11',
  },
  {
    id: '12',
    category: 'Poster Designs',
    image_url: svgPlaceholder('Fair Ayle', '%23450a0a', '%23fbbf24'),
    title: 'Fair Ayle Event Poster',
    order: '12',
  },
];

export const DUMMY_REVIEWS = [
  {
    id: '1',
    review_text:
      "You always burst my head with these your designs honestly… every single time you drop a project, it carries something unique and outstanding. The level of creativity, attention to detail, and professionalism you put into your work is truly exceptional. Your designs are not just beautiful, they communicate perfectly and leave a lasting impression. It's obvious that you really understand what you're doing because the quality always stands out effortlessly. What you do at Yard Fixers is truly amazing. The creativity, branding, and overall standard of work you keep putting out deserve so much recognition. Thank you to our amazing Creative Director, you are really doing an incredible job and it does not go unnoticed at all. You are genuinely talented",
    reviewer_name: 'Yard Fixers Client',
    timestamp: '6:41 AM',
    visible: 'TRUE',
  },
  {
    id: '2',
    review_text:
      "There's honestly something so unique and exceptional about your skill — the way you handle your craft is on another level entirely. Every detail, every concept, and every creative decision you make always comes out with so much excellence and professionalism. You don't just design; you bring ideas to life in a way that captures attention and leaves a lasting impression.\n\nI genuinely love this brand project so much. The creativity, color combination, layout, and overall presentation are absolutely outstanding. It perfectly communicates the brand's identity in such a clean, attractive, and engaging way.\n\nHonestly, you're doing an amazing job with this talent, and I have no doubt that your creativity will continue opening bigger doors for you. Keep pushing, keep creating, and keep giving us designs like this because this is truly impressive work.",
    reviewer_name: 'Brand Client',
    timestamp: '2:34 AM',
    visible: 'TRUE',
  },
];

export const DUMMY_SKILLS = [
  { id: '1', category: 'Design', skill: 'Brand Identity Design', level: 95 },
  { id: '2', category: 'Design', skill: 'Social Media Graphics', level: 90 },
  { id: '3', category: 'Design', skill: 'Movie Poster Design', level: 88 },
  { id: '4', category: 'Design', skill: 'Print Design', level: 92 },
  { id: '5', category: 'Design', skill: 'Typography & Layout', level: 89 },
  { id: '6', category: 'Consulting', skill: 'Event Consulting', level: 85 },
  { id: '7', category: 'Consulting', skill: 'Brand Strategy', level: 82 },
  { id: '8', category: 'Consulting', skill: 'Client Management', level: 90 },
  { id: '9', category: 'Consulting', skill: 'Creative Direction', level: 87 },
  { id: '10', category: 'Creative', skill: 'Color Theory', level: 94 },
  { id: '11', category: 'Creative', skill: 'Visual Storytelling', level: 86 },
  { id: '12', category: 'Creative', skill: 'Concept Development', level: 88 },
  { id: '13', category: 'Creative', skill: 'Photo Editing', level: 83 },
];

export const DUMMY_CONTACT = [
  { platform: 'whatsapp', handle_or_value: '+2349121218751' },
  { platform: 'linkedin', handle_or_value: 'modesty oluwagbemileke' },
  { platform: 'facebook', handle_or_value: 'modesty oluwagbemileke' },
  { platform: 'tiktok', handle_or_value: 'modesty oluwagbemileke' },
  { platform: 'email', handle_or_value: 'modestyart23@gmail.com' },
];
