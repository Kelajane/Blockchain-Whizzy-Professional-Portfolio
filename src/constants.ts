import { Project, Experience, Skill, SocialLink, Certification } from "./types";

export const PERSONAL_INFO = {
  name: "David Anthony Chinonyerem",
  nickname: "Blockchain Whizzy",
  roles: ["Frontend Developer", "Graphics Designer", "Blockchain Enthusiast", "IT Technician"],
  about: "I am a multi-disciplinary professional with a passion for building decentralized solutions and crafting visually stunning digital experiences. With a background in Frontend Development and Graphics Design, I bridge the gap between aesthetics and functionality. My journey in the blockchain space has fueled my commitment to the future of Web3, while my technical expertise as an IT Technician ensures a solid foundation for all my digital endeavors.",
  story: "My career is a tapestry of technical exploration and creative expression. From troubleshooting complex hardware issues to designing intuitive user interfaces and exploring the intricacies of smart contracts, I've always been driven by a curiosity for how things work—and how they can be improved. Every milestone, from my first successful deployment to my deep dive into the blockchain ecosystem, represents a step toward mastering the digital landscape.",
  resume: "./main.tsx",
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "DeFi Dashboard",
    description: "A comprehensive dashboard for tracking decentralized finance assets across multiple chains.",
    longDescription: "The DeFi Dashboard is a high-performance, real-time application designed to provide users with a unified view of their decentralized finance (DeFi) assets. It aggregates data from various protocols and blockchains, offering insights into portfolio performance, yield farming opportunities, and liquidity pool status.",
    technologies: ["React", "Web3.js", "Tailwind CSS", "Recharts", "Ethers.js", "GraphQL"],
    challenges: [
      "Integrating data from multiple blockchain networks with varying latency.",
      "Ensuring real-time updates without overwhelming the client-side performance.",
      "Designing a user-friendly interface for complex financial data."
    ],
    tags: ["React", "Web3.js", "Tailwind CSS", "Recharts"],
    status: "In Progress",
    image: "https://49ddtie0w7.ucarecd.net/b21d976b-1cbc-4244-941f-b55a4bb9d33d/-/preview/1000x666/",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blockchain-network-4454-large.mp4",
  },
  {
    id: "2",
    title: "NFT Marketplace UI",
    description: "A sleek, high-performance marketplace interface for digital collectibles.",
    longDescription: "This project focuses on creating a premium user experience for NFT collectors and creators. The UI is built with a focus on speed, responsiveness, and visual appeal, incorporating advanced animations and a clean, futuristic aesthetic to match the innovative nature of the NFT space.",
    technologies: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "IPFS"],
    challenges: [
      "Optimizing image loading and rendering for large NFT collections.",
      "Implementing smooth, complex animations that don't compromise performance.",
      "Ensuring a seamless experience across all device types."
    ],
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-lines-and-dots-27574-large.mp4",
  },
  {
    id: "3",
    title: "Brand Identity Design",
    description: "Full visual identity system for a tech startup, including logo, typography, and color palette.",
    longDescription: "A complete branding project for a cutting-edge tech startup. The goal was to create a visual identity that conveys innovation, reliability, and a forward-thinking mindset. This included a custom logo design, a carefully selected typography system, and a vibrant, modern color palette.",
    technologies: ["Graphics Design", "Branding", "Adobe Illustrator", "Adobe Photoshop", "Figma"],
    challenges: [
      "Creating a logo that is both unique and scalable across different mediums.",
      "Developing a color palette that stands out in a crowded tech market.",
      "Ensuring consistency in the brand's visual language across all touchpoints."
    ],
    tags: ["Graphics Design", "Branding", "Adobe Suite"],
    status: "Completed",
    image: "https://49ddtie0w7.ucarecd.net/ed26b6e7-5c10-41c9-92c1-e94ae2ec4347/-/preview/1000x1000/",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-graphic-designer-working-on-a-tablet-41235-large.mp4",
  },
  {
    id: "4",
    title: "Crypto Wallet App",
    description: "A secure and intuitive mobile wallet for managing multiple cryptocurrencies.",
    longDescription: "The Crypto Wallet App is a mobile-first solution designed for security and ease of use. It supports a wide range of cryptocurrencies and features biometric authentication, real-time price tracking, and seamless integration with decentralized exchanges.",
    technologies: ["React Native", "Firebase", "Ethers.js", "Biometrics"],
    challenges: [
      "Implementing robust security measures for private key management.",
      "Ensuring a smooth user experience on both iOS and Android platforms.",
      "Integrating real-time market data from multiple APIs."
    ],
    tags: ["React Native", "Firebase", "Ethers.js"],
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&q=80&w=1600",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-man-using-a-smartphone-with-a-blue-screen-41236-large.mp4",
  },
  {
    id: "5",
    title: "Smart Contract Audit Tool",
    description: "An automated tool for identifying vulnerabilities in Solidity smart contracts.",
    longDescription: "This tool uses static analysis and formal verification techniques to scan Solidity smart contracts for common security pitfalls, such as reentrancy, integer overflow, and unauthorized access. It provides detailed reports and suggestions for remediation.",
    technologies: ["Python", "Solidity", "Slither", "Mythril"],
    challenges: [
      "Reducing false positives in automated security scans.",
      "Keeping up with the latest security vulnerabilities in the Ethereum ecosystem.",
      "Designing a clear and actionable reporting interface for developers."
    ],
    tags: ["Python", "Solidity", "Security"],
    status: "On Hold",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-typing-on-a-keyboard-41237-large.mp4",
  },
  {
    id: "6",
    title: "Professional Portfolio Website",
    description: "A modern, responsive portfolio website showcasing professional achievements and creative works.",
    longDescription: "A high-performance personal portfolio website built with React and Tailwind CSS. It features smooth animations, a responsive design, and a clean aesthetic to highlight professional experience, skills, and projects effectively.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
    challenges: [
      "Designing a unique and memorable user experience.",
      "Ensuring perfect responsiveness across all screen sizes.",
      "Optimizing performance and asset loading for a smooth feel."
    ],
    tags: ["React", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    image: "https://49ddtie0w7.ucarecd.net/b6e2a6bf-012a-46bf-889b-420ea5051ec8/-/preview/1000x562/",
    link: "#",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-a-laptop-41238-large.mp4",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "Tech Solutions Hub",
    role: "Frontend Developer & IT Lead",
    period: "2023 - Present",
    description: [
      "Developing responsive web applications using React and Tailwind CSS.",
      "Managing IT infrastructure and providing technical support for hardware and software.",
      "Leading the transition to modern frontend frameworks to improve performance.",
    ],
    achievements: [
      { icon: "Zap", text: "Improved site load speed by 40%" },
      { icon: "Users", text: "Managed a team of 5 IT staff" },
      { icon: "Shield", text: "Secured 100+ company devices" },
    ],
  },
  {
    id: "2",
    company: "Creative Edge Studio",
    role: "Lead Graphics Designer",
    period: "2021 - 2023",
    description: [
      "Created visual assets for marketing campaigns and digital products.",
      "Collaborated with developers to ensure design fidelity in final products.",
      "Designed logos and branding materials for diverse clients.",
    ],
    achievements: [
      { icon: "Award", text: "Won 'Designer of the Year' 2022" },
      { icon: "Target", text: "Increased brand engagement by 25%" },
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    category: "Frontend Development",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
  },
  {
    category: "Design",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "UI/UX Design"],
  },
  {
    category: "Blockchain",
    items: ["Solidity", "Web3.js", "Ethers.js", "Smart Contracts"],
  },
  {
    category: "IT & Technical",
    items: ["Hardware Troubleshooting", "Network Configuration", "System Maintenance"],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://linkedin.com/in/david-ajaraogu", icon: "Linkedin" },
  { platform: "X/Twitter", url: "https://twitter.com/blockchainwhizy", icon: "Twitter" },
  { platform: "GitHub", url: "https://github.com/Kelajane6", icon: "Github" },
  { platform: "WhatsApp", url: "https://wa.me/2347015336065", icon: "MessageCircle" },
  { platform: "Telegram", url: "https://t.me/blockchainwhizzy", icon: "Send" },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "3",
    title: "Certificate of Completion: Python",
    issuer: "LinkedIn Learning",
    date: "November 2, 2022",
    image: "https://49ddtie0w7.ucarecd.net/ef576738-419d-4897-b3b7-c986fa77f69a/-/preview/720x506/",
    link: "#",
  },
  {
    id: "4",
    title: "Certificate of Completion: JavaScript",
    issuer: "LinkedIn Learning",
    date: "November 1, 2022",
    image: "https://49ddtie0w7.ucarecd.net/e7ee3f41-1869-4c26-b6db-dc1881886199/-/preview/718x498/",
    link: "#",
  },
  {
    id: "5",
    title: "Certificate of Completion: HTML",
    issuer: "LinkedIn Learning",
    date: "October 28, 2022",
    image: "https://49ddtie0w7.ucarecd.net/e7813eeb-eec8-4cb0-ab37-277950959bac/-/preview/720x508/",
    link: "#",
  },
  {
    id: "6",
    title: "Certificate of Completion: CSS",
    issuer: "LinkedIn Learning",
    date: "November 1, 2022",
    image: "https://49ddtie0w7.ucarecd.net/a9ee6919-a754-414f-b48b-e2e72a5319df/-/preview/720x506/",
    link: "#",
  },
];
