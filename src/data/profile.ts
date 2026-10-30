export const profile = {
  name: "Sachin Verma",
  description:
    "Software engineer building backend systems. Currently scaling infrastructure for 13.8M users at TalkFever, and making developer tools at Acadable Labs.",
  location: "Gwalior, India",
};

export type SocialIcon = "github" | "linkedin" | "mail" | "resume";

export const socials: {
  label: string;
  href: string;
  icon: SocialIcon;
  download?: string;
}[] = [
  { label: "GitHub", href: "https://github.com/sachinwhocodes", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sachinwhocodes", icon: "linkedin" },
  { label: "Email", href: "mailto:ramasyasachin@gmail.com", icon: "mail" },
  {
    label: "Résumé",
    href: "/Sachin_Verma_Resume.pdf",
    icon: "resume",
    download: "Sachin_Verma_Resume.pdf",
  },
];

export const currently = [
  "At TalkFever I'm building the creator monetization system: Razorpay payment flows, a double-entry wallet ledger, and a content publishing model on PostgreSQL.",
  "Through Acadable Labs I'm building QueryMesh, a Postgres proxy that rewrites N+1 queries into JOINs (private alpha), and Assembly AI Lab, a research platform for structured multi-agent deliberation. I'm also wrapping up the SAGIT research paper.",
];

export const education = {
  school: "Madhav Institute of Technology and Science",
  degree: "BTech, Information Technology",
  dates: "Aug 2023 – Jun 2027",
  grade: "CGPA 8.09",
};

export const achievements = [
  "1st Runner-up — Symbiosis Skill Hackathon '26 (National Level)",
  "Finalist — Hackatron (powered by GitHub)",
  "4th Position — Code Coalescence 2025 (MITSDU Official Hackathon)",
];

export const stack: Record<string, string[]> = {
  languages: ["TypeScript", "JavaScript", "Java", "Python", "C++", "SQL"],
  backend: ["Node.js", "Express", "Fastify", "GraphQL", "REST", "OAuth 2.0"],
  frontend: ["React", "Next.js", "React Native", "Vite", "Redux", "Tailwind CSS"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Firestore"],
  cloud: ["AWS", "GCP", "Docker", "Vercel", "CI/CD"],
  tools: ["Git", "GitHub", "Linux/Bash", "JGit", "AES-256-GCM", "RSA-OAEP"],
};
