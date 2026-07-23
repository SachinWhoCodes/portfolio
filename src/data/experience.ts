export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  location: string;
  summary: string;
  details: string[];
  techStack: string[];
  hardPart?: {
    problem: string;
    solution: string;
  };
  links?: { label: string; href: string }[];
}

export const experiences: Experience[] = [
  {
    id: "talkfever-fsd",
    title: "Full Stack Developer Intern",
    company: "TalkFever Social Media Ltd",
    date: "Mar 2026 – Present",
    location: "Gwalior, India",
    summary:
      "Building core backend infrastructure for a social platform serving 13.8M users — payment systems, content architecture, and real-time engagement pipelines.",
    details: [
      "Built a creator monetization subsystem with idempotent Razorpay flows, HMAC-SHA256 verification, row locking, transactional wallet transfers, and an append-style double-entry ledger guaranteeing zero duplicate charges.",
      "Engineered an 8-service Node.js/Express backend serving 13.8M users behind a path-based API gateway, backed by a 41-table PostgreSQL schema with 63 indexes including partial, GIN, and compound cursor indexes.",
      "Architected a polymorphic publishing model with relational lifecycle/privacy/paid-content columns and extensible JSONB subtype payloads (blogs, polls, media, check-ins), supporting 6+ content types without table-per-type overhead.",
      "Built the Next.js 16 / React 19 frontend with TanStack Query infinite cursor pagination, Redux Toolkit state management, and database-enforced engagement deduplication for accurate activation metrics.",
    ],
    techStack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Next.js 16",
      "React 19",
      "Redux Toolkit",
      "Razorpay",
      "TanStack Query",
    ],
    hardPart: {
      problem:
        "A creator payment system can't have duplicate charges — but in a distributed system with webhooks, network retries, and concurrent requests, ensuring exactly-once payment processing is notoriously difficult.",
      solution:
        "I made every payment flow idempotent using a combination of Razorpay's idempotency keys, HMAC-SHA256 webhook signature verification, and PostgreSQL row-level locking on wallet rows. The wallet uses an append-only double-entry ledger: every transfer is a pair of debit/credit entries rather than a mutable balance field. This means the balance is always derivable from the log, and concurrent writes can't corrupt state. The trade-off is slightly slower reads (aggregate vs. single field), but for a payment system, correctness wins over speed.",
    },
  },
  {
    id: "drippr",
    title: "Software Engineer Intern",
    company: "Drippr Technologies",
    date: "Oct 2025 – Jan 2026",
    location: "New Delhi, India",
    summary:
      "Built the core infrastructure for Drippr Seller, a merchant dashboard used by 500+ merchants that bridges operations with the Shopify ecosystem.",
    details: [
      "Built the Drippr Seller merchant dashboard end-to-end with a Vite + React + Tailwind UI, a stateless serverless API on Vercel, and Firestore onSnapshot live data sync.",
      "Engineered the order-routing pipeline that ingests Shopify webhooks, groups line items by merchant, and mirrors them into Firestore, handling thousands of orders daily in real time.",
      "Built stateless HTTP endpoints using Vercel Serverless Functions that verify Firebase ID tokens for every request, ensuring zero-trust API access.",
      "Identified and mitigated a critical SKU-collision data-integrity risk by designing a global uniqueness strategy for accurate multi-merchant order routing.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Shopify GraphQL API",
      "Vercel Serverless",
      "Tailwind CSS",
    ],
  },
  {
    id: "spedee",
    title: "Software Development Lead",
    company: "Spedee (Rivaem Technologies)",
    date: "May 2025 – Jul 2025",
    location: "Delhi, India",
    summary:
      "Led a team of 6 for end-to-end development of a multi-phase, contract-based software project, delivering a scalable and modular application.",
    details: [
      "Architected and implemented robust frontend (React Native, React.js) and backend (Appwrite, Node.js) systems with a focus on performance and maintainability.",
      "Drove technical planning, system architecture, and phase-wise delivery, consistently meeting or exceeding timelines.",
      "Collaborated closely with stakeholders to define, iterate, and validate key requirements and technical deliverables.",
      "Integrated geolocation logic and intelligent API-based automation for real-time decision-making.",
    ],
    techStack: [
      "React Native",
      "React.js",
      "Appwrite",
      "Node.js",
      "TypeScript",
    ],
  },
  {
    id: "upwork-hotel",
    title: "React Native Developer",
    company: "Upwork (Freelance)",
    date: "Jun 2025",
    location: "Remote",
    summary:
      "Developed a cross-platform mobile application for a hotel client with real-time room booking and food ordering across multiple branches.",
    details: [
      "Designed and implemented complete frontend and backend architecture using React Native, Expo Router, and Firebase Firestore.",
      "Developed real-time room reservation and food delivery workflows, including status updates and timestamped actions.",
      "Built a custom admin panel to manage room availability, food menu items, and live order statuses.",
      "Integrated Google Maps API for dynamic delivery location input with offline-friendly state handling.",
    ],
    techStack: [
      "React Native",
      "Expo SDK 53",
      "Firebase",
      "Google Maps API",
      "NativeWind",
      "TypeScript",
    ],
  },
  {
    id: "acadable",
    title: "Founder & Engineer",
    company: "Acadable Labs",
    date: "Dec 2023 – Present",
    location: "India",
    summary:
      "Building a small infrastructure & applied AI company shipping developer tools (LazyServe, QueryMesh) and research prototypes (Assembly AI Lab).",
    details: [
      "Evolved from an edtech platform (3,000+ users, 12-member team) into an infrastructure company shipping open-source developer tools.",
      "Published LazyServe on npm (v1.0.3, MIT, 1,000+ downloads) — a CLI that wakes local dev servers on demand and sleeps them on idle.",
      "Building QueryMesh (private alpha) — a wire-protocol-level Postgres proxy that rewrites N+1 patterns into JOINs and caches reads with row-level invalidation.",
      "Research: Assembly AI Lab — a multi-agent constitutional deliberation platform orchestrating LLM delegates through a deterministic five-phase workflow.",
    ],
    techStack: [
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Node.js",
      "React Native",
      "Firebase",
    ],
    links: [
      { label: "LazyServe", href: "https://www.npmjs.com/package/lazyserve" },
    ],
  },
  {
    id: "talkfever-web",
    title: "Web Development Intern",
    company: "TalkFever",
    date: "Jun 2024 – Aug 2024",
    location: "Gwalior, India",
    summary:
      "Designed and implemented 17 fully responsive web pages with a 25% reduction in average load times.",
    details: [
      "Built 17 responsive and interactive web pages, optimizing performance and resource loading for a 25% reduction in load times (1.2 seconds faster).",
      "Enhanced cross-device responsiveness, delivering seamless experience across mobile and tablet viewports.",
      "Achieved a 15% improvement in user satisfaction feedback scores (3.4 → 4.0).",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
];
