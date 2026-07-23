import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Terminal } from "@/components/Terminal";
import { GitHubActivity } from "@/components/GitHubActivity";

const techStack = {
  languages: ["TypeScript", "JavaScript", "Java", "Python", "C++", "SQL"],
  backend: [
    "Node.js",
    "Express",
    "Fastify",
    "GraphQL",
    "REST",
    "OAuth 2.0",
  ],
  frontend: ["React", "Next.js", "React Native", "Vite", "Redux", "Tailwind CSS"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Firestore"],
  cloud: ["AWS", "GCP", "Docker", "Vercel", "CI/CD"],
  tools: ["Git", "GitHub", "Linux/Bash", "JGit", "AES-256-GCM", "RSA-OAEP"],
};

const contacts = [
  { label: "[email]", href: "mailto:ramasyasachin@gmail.com" },
  { label: "[linkedin]", href: "https://linkedin.com/in/sachinwhocodes" },
  { label: "[github]", href: "https://github.com/sachinwhocodes" },
  { label: "[resume]", href: "/Sachin_Verma_Resume.pdf", download: true },
];

const achievements = [
  "1st Runner-up — Symbiosis Skill Hackathon '26 (National Level)",
  "Finalist — Hackatron (powered by GitHub)",
  "4th Position — Code Coalescence 2025 (MITSDU Official Hackathon)",
];

export default function Home() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home" }]} />

      <article className="max-w-3xl page-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Sachin Verma
            <span className="cursor-blink" />
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Full Stack Developer Intern @ TalkFever · Founder @ Acadable Labs ·
            BTech IT '27
          </p>
        </header>

        {/* About */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // about
          </h2>
          <div className="font-sans text-foreground/90 leading-relaxed space-y-4">
            <p>
              Software engineer building backend infrastructure at TalkFever for
              13.8M users — payment systems, content architecture, and real-time
              data pipelines on PostgreSQL. Previously built merchant dashboards
              at Drippr, led a 6-person dev team at Spedee, and shipped freelance
              apps on Upwork.
            </p>
            <p>
              Outside of work, I run Acadable Labs where I build and publish
              developer tools — LazyServe and PackShell are live on npm. My
              research background is in semantic code analysis (SAGIT), bridging
              the gap between what Git tracks and what code actually means.
            </p>
          </div>
        </section>

        {/* Terminal */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // terminal
          </h2>
          <Terminal />
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // stack
          </h2>
          <div className="border border-border p-6 font-mono text-sm space-y-3">
            {Object.entries(techStack).map(([key, values]) => (
              <div key={key} className="flex flex-wrap">
                <span className="text-muted-foreground w-24 shrink-0">
                  {key}:
                </span>
                <span className="text-foreground">{values.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // achievements
          </h2>
          <ul className="space-y-3 font-sans text-foreground/90">
            {achievements.map((a, i) => (
              <li key={i} className="flex">
                <span className="font-mono text-muted-foreground mr-3">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // education
          </h2>
          <div className="border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <p className="font-mono text-base text-foreground">
                  Madhav Institute of Technology and Science
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  Bachelor of Technology — Information Technology
                </p>
              </div>
              <div className="font-mono text-xs text-muted-foreground text-right whitespace-nowrap">
                <p>Aug 2023 – Jun 2027</p>
                <p className="text-foreground mt-1">CGPA: 8.09 / 10.0</p>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Activity */}
        <section className="mb-12">
          <GitHubActivity />
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // contact
          </h2>
          <div className="flex gap-6 font-mono text-sm flex-wrap">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                {...(contact.download
                  ? { download: "Sachin_Verma_Resume.pdf" }
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-primary hover:underline link-hover"
              >
                {contact.label}
              </a>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}
