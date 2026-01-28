import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const techStack = {
  languages: ["Java", "TypeScript", "JavaScript", "SQL", "Python", "C++"],
  backend: ["Node.js", "GraphQL", "REST APIs", "Firebase", "AWS", "Vercel"],
  tools: ["Git", "Docker", "Linux", "JGit", "Picocli", "Tailwind CSS"],
};

const contacts = [
  { label: "[email]", href: "mailto:ramasyasachin@gmail.com" },
  { label: "[linkedin]", href: "https://linkedin.com/in/sachinwhocodes" },
  { label: "[github]", href: "https://github.com/sachinwhocodes" },
  { label: "[resume]", href: "/resume.pdf", download: true },
];

export default function Home() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home" }]} />

      <article className="max-w-3xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Sachin Verma
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            He/Him • Software Engineer Intern @ Drippr • Lead @ SAGIT Research
          </p>
        </header>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // about
          </h2>
          <div className="font-sans text-foreground/90 leading-relaxed space-y-4">
            <p>
              I am a Software Engineer and Researcher focused on building scalable, 
              local-first systems and high-performance full-stack applications. 
              Currently, I am a Software Engineer Intern at Drippr, where I architect 
              real-time dashboard solutions and financial integrity systems for merchant operations.
            </p>
            <p>
              My technical background is rooted in bridging the "semantic gap" in software 
              development. As the Project Lead for SAGIT, a research initiative under the 
              HOD of Information Technology at MITS, I engineered a lightweight Java CLI 
              that extends Git with AST-based semantic analysis to automate documentation 
              and ensure 100% data integrity.
            </p>
          </div>
        </section>

        {/* Key Strengths */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // capabilities
          </h2>
          <ul className="space-y-3 font-sans text-foreground/90">
            <li className="flex">
              <span className="font-mono text-muted-foreground mr-3">→</span>
              <span>
                <strong className="text-foreground">Full-Stack & Mobile:</strong>{" "}
                Founder of Acadable.com (3,000+ users), multi-tenant SaaS platforms with React, React Native, Firebase.
              </span>
            </li>
            <li className="flex">
              <span className="font-mono text-muted-foreground mr-3">→</span>
              <span>
                <strong className="text-foreground">System Reliability:</strong>{" "}
                0% duplicate transaction rates, 100% exam recovery success in high-concurrency environments.
              </span>
            </li>
            <li className="flex">
              <span className="font-mono text-muted-foreground mr-3">→</span>
              <span>
                <strong className="text-foreground">Optimization:</strong>{" "}
                30% API latency reduction, 40% documentation time reduction through automation.
              </span>
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // stack
          </h2>
          <div className="border border-border p-6 font-mono text-sm">
            <div className="mb-4">
              <span className="text-muted-foreground">languages:</span>{" "}
              <span className="text-foreground">{techStack.languages.join(", ")}</span>
            </div>
            <div className="mb-4">
              <span className="text-muted-foreground">backend:</span>{" "}
              <span className="text-foreground">{techStack.backend.join(", ")}</span>
            </div>
            <div>
              <span className="text-muted-foreground">tools:</span>{" "}
              <span className="text-foreground">{techStack.tools.join(", ")}</span>
            </div>
          </div>
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
                {...(contact.download ? { download: "Sachin_Verma_Resume.pdf" } : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-primary hover:underline"
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
