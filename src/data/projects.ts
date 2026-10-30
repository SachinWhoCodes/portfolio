export interface Project {
  id: string;
  title: string;
  date: string;
  summary: string;
  highlights: [string, string];
  details: string[];
  techStack: string[];
  role?: string;
  hardPart?: {
    problem: string;
    solution: string;
  };
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "packshell",
    title: "PackShell",
    date: "2025",
    role: "Solo Developer",
    summary:
      "A CLI tool that synchronizes environment variables across teams with client-side AES-256-GCM encryption — the server never sees plaintext secrets.",
    highlights: [
      "Zero-trust .env sync CLI, published on npm",
      "AES-256-GCM in the client, RSA-OAEP key sharing",
    ],
    details: [
      "Designed a zero-trust architecture where all encryption happens client-side with AES-256-GCM authenticated encryption before any data leaves the machine.",
      "Built a hybrid cryptographic key model: a symmetric project key encrypts payloads, and RSA-OAEP-4096 distributes that key to teammates via per-user public-key encryption with fingerprint verification.",
      "Shipped a full CLI surface (init, push, pull, diff, watch, invite, share, join) with immutable versioned snapshots, short-lived hashed-token auth, timing-safe comparison, RBAC, and audit logging.",
      "Backend is a ciphertext-only Next.js + Firebase/Firestore store that never handles plaintext secrets at any point in the pipeline.",
    ],
    techStack: [
      "TypeScript",
      "Commander.js",
      "Firebase",
      "AES-256-GCM",
      "RSA-OAEP",
      "Next.js",
    ],
    hardPart: {
      problem:
        "The core challenge was key distribution — how do you let a new teammate decrypt your .env without ever transmitting the symmetric key in plaintext? A shared password is fragile, and a central key server becomes a single point of trust you're trying to eliminate.",
      solution:
        "I used a hybrid model: each project has a single AES-256-GCM symmetric key for payload encryption. When you invite a teammate, the CLI fetches their RSA-4096 public key, encrypts the project key with RSA-OAEP specifically for them, and stores only the ciphertext. The teammate's CLI decrypts it locally with their private key. The server only ever holds doubly-encrypted blobs. Fingerprint verification on key exchange prevents MITM substitution.",
    },
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/packshell" },
      {
        label: "github",
        href: "https://github.com/sachinwhocodes/packshell",
      },
    ],
  },
  {
    id: "sagit",
    title: "SAGIT",
    date: "2025",
    role: "Project Lead — Research under HOD, Dept. of IT, MITS",
    summary:
      "A Java CLI that extends Git with AST-based semantic diff analysis, detecting structural code changes that text-based diffs miss entirely.",
    highlights: [
      "Git diffs that understand code, not just lines",
      "AST diff engine on JGit, research paper submitted",
    ],
    details: [
      "Built an AST-based diff engine that detects semantic code deltas (renames, signature changes, structural moves) by traversing JGit revision trees and comparing nodes via a custom AST comparator.",
      "Exposed a Picocli CLI and a Git pre-commit hook that auto-generates structured commit documentation from detected deltas, cutting manual documentation effort.",
      "Ensured 100% data integrity across history by building a local-first JSONL metadata engine that handles complex rename and copy events.",
      "Validated the engine across 3 real-world Java repositories; research paper submitted to the university.",
    ],
    techStack: ["Java", "JGit", "Picocli", "AST Parsing", "JSONL"],
    hardPart: {
      problem:
        "Standard Git diffs are line-based — they can tell you that line 42 changed, but not that a method was renamed, or that a parameter was added to a function signature while the body stayed identical. Bridging this 'semantic gap' required building a tree comparison engine on top of Git's object model.",
      solution:
        "I traverse JGit's revision trees to extract Java ASTs for each changed file, then run a custom comparator that matches nodes by structural similarity rather than text equality. A renamed method with the same body scores high similarity; a moved inner class is tracked through parent-node analysis. The output is a structured delta log that the pre-commit hook formats into Conventional Commit messages automatically.",
    },
    links: [
      { label: "github", href: "https://github.com/sachinwhocodes/sagit" },
    ],
  },
  {
    id: "lazyserve",
    title: "LazyServe",
    date: "2025",
    role: "Open Source Maintainer",
    summary:
      "A Fastify proxy that wakes local dev servers on demand and sleeps them on idle, keeping public tunnel URLs alive without burning resources.",
    highlights: [
      "Wakes dev servers on request, sleeps them on idle",
      "Open source on npm, 1,000+ downloads",
    ],
    details: [
      "Published on npm (v1.0.3, MIT license, 1,000+ downloads) as an open-source developer tool.",
      "Uses child process lifecycle control to start dev servers only when incoming requests arrive, and suspends them after a configurable idle timeout.",
      "Sits between ngrok/cloudflare tunnels and your local stack so public URLs stay alive 24/7 without keeping the actual server process running.",
      "Built with Fastify for low-overhead proxying and TypeScript for type safety across the CLI surface.",
    ],
    techStack: ["TypeScript", "Fastify", "Node.js", "child_process"],
    hardPart: {
      problem:
        "When you expose a local dev server through a tunnel (ngrok, Cloudflare), the tunnel URL dies if the server stops. But keeping the server running 24/7 wastes CPU and battery. The challenge is intercepting requests *before* they hit a dead server and transparently booting it just in time.",
      solution:
        "LazyServe acts as a Fastify reverse proxy that sits in front of your actual server. On first request, it spawns the dev server as a child process, holds the HTTP request in a queue, polls the server port until it's responsive, then flushes all queued requests. An idle timer kills the child process after inactivity. The tunnel points to LazyServe (always on, ~2MB RSS), not the actual heavy dev server.",
    },
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lazyserve" },
      {
        label: "github",
        href: "https://github.com/sachinwhocodes/lazyserve",
      },
    ],
  },
  {
    id: "assessment-platform",
    title: "Assessment Platform",
    date: "2025",
    role: "Project Lead",
    summary:
      "A scalable SaaS platform supporting 1,000+ concurrent users with 100% exam resume success rate through dual-layer persistence.",
    highlights: [
      "Exam platform for 1,000+ concurrent users",
      "Dual-layer persistence, 100% exam resume",
    ],
    details: [
      "Architected a sharded Firebase backend with Firestore transactions and optimized React listeners to support 1,000+ concurrent exam takers.",
      "Built a fault-tolerant runtime that eliminated data loss through a dual-layer persistence strategy (Server Sync + Local Storage), achieving 100% exam resume success.",
      "Enforced strict data isolation with zero unauthorized access incidents via Row Level Security through complex Firestore Security Rules.",
    ],
    techStack: ["React", "Firebase", "Firestore", "Shadcn/UI", "TypeScript"],
    hardPart: {
      problem:
        "In a high-stakes exam environment, a browser crash or network drop can't mean losing 30 minutes of answers. But syncing every keystroke to Firestore at scale (1,000+ concurrent users) creates write contention and costs that spiral quickly.",
      solution:
        "I built a dual-layer persistence model: answers write to localStorage on every change (instant, zero network), and batch-sync to Firestore on a debounced interval. On reconnect or page reload, the client diffs local state against the server snapshot and reconciles. The exam resumes from exactly where the student left off. Firestore transactions handle the merge conflict resolution so no answers are ever silently dropped.",
    },
  },
  {
    id: "hotel-saas",
    title: "Hotel Booking App",
    date: "Jun 2025",
    role: "Freelance Developer (Upwork)",
    summary:
      "Mobile SaaS for real-time hotel bookings and food ordering across multi-branch operations, with offline-friendly architecture.",
    highlights: [
      "Room booking and food ordering across branches",
      "React Native app built for an Upwork client",
    ],
    details: [
      "Designed and implemented complete frontend and backend architecture using React Native, Expo Router, and Firebase Firestore.",
      "Developed real-time room reservation and food delivery workflows with status updates and timestamped actions across multiple branches.",
      "Built a custom admin panel for room availability, food menu items, and live order statuses.",
      "Integrated Google Maps API for dynamic delivery location input and implemented offline-friendly state handling with AsyncStorage.",
    ],
    techStack: [
      "React Native",
      "Expo",
      "Firebase",
      "Google Maps API",
      "TypeScript",
      "NativeWind",
    ],
  },
];
