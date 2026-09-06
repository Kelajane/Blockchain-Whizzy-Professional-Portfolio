export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: 'linkedin' | 'github' | 'x' | 'mail' | 'message';
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  impact: string;
  stack: string[];
  featured?: boolean;
  href?: string;
  repo?: string;
  image: string;
};

export type JourneyItem = {
  period: string;
  title: string;
  company: string;
  details: string[];
};

export const personalInfo = {
  name: 'David Anthony Chinonyerem',
  shortName: 'David Anthony',
  title: 'Frontend Developer • Product-minded builder',
  headline: 'I design and build thoughtful digital products with clarity, speed, and technical depth.',
  summary:
    'I work across frontend engineering, interface design, and product thinking to build experiences that are clean, responsive, and easy to trust. My focus is creating software that feels polished, performs well, and solves real user problems.',
  email: 'kelajane6@gmail.com',
  location: 'Nigeria',
  availability: 'Available for select frontend and product collaborations',
  resumePath: '/resume/david-anthony-resume.pdf',
  github: 'https://github.com/Kelajane6',
  linkedin: 'https://linkedin.com/in/david-ajaraogu',
  x: 'https://twitter.com/blockchainwhizy',
  whatsapp: 'https://wa.me/2347015336065',
  telegram: 'https://t.me/blockchainwhizzy',
};

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: personalInfo.linkedin, icon: 'linkedin' },
  { platform: 'GitHub', url: personalInfo.github, icon: 'github' },
  { platform: 'X', url: personalInfo.x, icon: 'x' },
  { platform: 'Email', url: `mailto:${personalInfo.email}`, icon: 'mail' },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    category: 'Design & UX',
    items: ['Figma', 'UI Design', 'Design Systems', 'Wireframing', 'User Flows', 'Visual Design'],
  },
  {
    category: 'Blockchain / Web3',
    items: ['Solidity', 'Smart Contracts', 'Web3.js', 'Ethers.js', 'Decentralized UX', 'Blockchain Concepts'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'Vite', 'VS Code', 'Adobe Photoshop', 'Adobe Illustrator'],
  },
];

export const projects: Project[] = [
  {
    title: 'DeFi Dashboard',
    description: 'A responsive dashboard for surfacing asset data, portfolio movement, and blockchain insights in a clear, trusted interface.',
    impact: 'Focused on making complex on-chain information easier to scan and act on without overwhelming the user.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Web3.js', 'Ethers.js'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
    href: '#',
    repo: '#',
  },
  {
    title: 'NFT Marketplace UI',
    description: 'A premium marketplace concept built around discovery, trust, and a polished collection experience across device sizes.',
    impact: 'Balanced visual presentation with performance-conscious layouts and intuitive browsing patterns.',
    stack: ['Next.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS', 'IPFS'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
    href: '#',
    repo: '#',
  },
  {
    title: 'Brand Identity System',
    description: 'A visual language project covering logos, layouts, and design direction for a tech-focused brand.',
    impact: 'Created a cohesive identity built around clarity, differentiation, and professional confidence.',
    stack: ['Brand Design', 'Figma', 'Illustrator', 'Photoshop'],
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=1200',
    href: '#',
    repo: '#',
  },
];

export const journey: JourneyItem[] = [
  {
    period: 'Current focus',
    title: 'Product-focused frontend development',
    company: 'Independent work',
    details: [
      'Building polished user interfaces with a strong focus on layout quality, accessibility, and maintainable code.',
      'Exploring blockchain and Web3 product experiences while keeping user trust and clarity at the center.',
    ],
  },
  {
    period: 'Technical foundation',
    title: 'Digital systems, design, and support',
    company: 'IT and creative work',
    details: [
      'Worked across troubleshooting, systems thinking, and visual execution to understand both technical stability and user experience.',
      'Combined design sensibility with development practices to create interfaces that are useful and distinctive.',
    ],
  },
  {
    period: 'Learning path',
    title: 'Frontend, blockchain, and design exploration',
    company: 'Self-directed growth',
    details: [
      'Built practical experience with modern web tools, responsive UI work, and product-oriented implementation decisions.',
      'Continued developing expertise in the intersection of front-end engineering, branding, and decentralized products.',
    ],
  },
];

export const capabilities = [
  'Frontend development',
  'Responsive web interfaces',
  'UI implementation from design to code',
  'Web3 product exploration',
  'Product-minded prototyping',
  'Design system thinking',
];
