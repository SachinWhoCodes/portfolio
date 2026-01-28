export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  location: string;
  summary: string;
  details: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "drippr",
    title: "Software Engineer Intern",
    company: "Drippr Marketplace",
    date: "Oct 2025 - Jan 2026",
    location: "New Delhi",
    summary: "Built core infrastructure for Drippr Seller, bridging merchant operations with the Shopify ecosystem.",
    details: [
      "End-to-End Development: Built a responsive UI with Vite, React, and Tailwind CSS powered by a Stateless Serverless API on Vercel.",
      "Secure API Architecture: Built stateless HTTP endpoints using Vercel Serverless Functions that verify Firebase ID tokens for every request.",
      "Order Routing Logic: Developed the logic to ingest Shopify webhooks, group line items by merchant, and mirror them into Firestore for real-time dashboard updates.",
      "Technical Problem Solving: Identified and mitigated a critical data integrity risk regarding SKU collisions, proposing a global uniqueness strategy.",
      "Live Data Sync: Implemented real-time subscriptions using Firestore onSnapshot, providing merchants with instant updates on sales KPIs and inventory status.",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Firebase", "Shopify GraphQL API", "Vercel Serverless", "Tailwind CSS"],
  },
  {
    id: "spedee",
    title: "Software Development Lead",
    company: "Spedee (Rivaem Technologies)",
    date: "May 2025 - Jul 2025",
    location: "Delhi, India",
    summary: "Led a team of 6 for end-to-end development of a multi-phase, contract-based software project.",
    details: [
      "Architectured and implemented robust frontend (React Native, React.js) and backend (Appwrite, Node.js) systems with a focus on performance and maintainability.",
      "Drove technical planning, system architecture, and phase-wise delivery, consistently meeting or exceeding timelines.",
      "Collaborated closely with stakeholders to define, iterate, and validate key requirements and technical deliverables.",
      "Integrated geolocation logic and intelligent API-based automation for real-time decision-making.",
    ],
    techStack: ["React Native", "React.js", "Appwrite", "Node.js", "TypeScript"],
  },
  {
    id: "upwork-hotel",
    title: "React Native Developer",
    company: "Upwork (Freelance)",
    date: "Jun 2025",
    location: "Remote",
    summary: "Developed a cross-platform mobile application for a hotel client with real-time room booking and food ordering.",
    details: [
      "Designed and implemented complete frontend and backend architecture using React Native, Expo Router, and Firebase Firestore.",
      "Developed real-time room reservation and food delivery workflows, including status updates and timestamped actions.",
      "Built a custom admin panel to manage room availability, food menu items, and live order statuses (CRUD operations).",
      "Integrated Google Maps API for dynamic delivery location input.",
      "Implemented modular routing, responsive UI using NativeWind, and offline-friendly state handling.",
    ],
    techStack: ["React Native", "Expo SDK 53", "Firebase", "Google Maps API", "NativeWind", "TypeScript"],
  },
  {
    id: "acadable",
    title: "Full Stack Developer & Founder",
    company: "Acadable",
    date: "Dec 2023 - Present",
    location: "India",
    summary: "Founded an edtech platform offering technical courses and mentorship; scaled to 3,000+ active users.",
    details: [
      "Built and lead a 12-member team, managing content creation, marketing, tech development, and operations.",
      "Increased student engagement by 40% and scaled quarterly revenue from INR 1.6L to INR 2.24L.",
      "Improved course rating from 4.2 star to 4.7 star through optimized course delivery and project-based learning.",
      "Grew the 'Programming++' community across 3 campuses, engaging 2000+ students through events and workshops.",
      "Launched a project incubation model to fund and mentor top student projects.",
    ],
    techStack: ["React", "React Native", "Firebase", "Node.js", "TypeScript"],
  },
  {
    id: "talkfever",
    title: "Web Development Intern",
    company: "TalkFever",
    date: "Jun 2024 - Aug 2024",
    location: "Gwalior, MP",
    summary: "Designed and implemented 17 fully responsive and interactive web pages.",
    details: [
      "Optimized performance and resource loading, resulting in a 25% reduction in average load times (1.2 seconds faster).",
      "Achieved a 15% improvement in user satisfaction, reflected in feedback scores increasing from 3.4 to 4.0.",
      "Enhanced cross-device responsiveness, delivering seamless experience across mobile and tablet.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
];
