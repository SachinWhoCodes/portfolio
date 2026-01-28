import { useParams, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { experiences } from "@/data/experience";

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return <Navigate to="/experience" replace />;
  }

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "home", path: "/" },
          { label: "work", path: "/experience" },
          { label: experience.id },
        ]}
      />

      <article className="max-w-3xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {experience.title}
          </h1>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            <p>{experience.company}</p>
            <p>
              {experience.date} • {experience.location}
            </p>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // overview
          </h2>
          <p className="font-sans text-foreground/90 leading-relaxed">
            {experience.summary}
          </p>
        </section>

        {/* Technical Contributions */}
        <section className="mb-10">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // technical contributions
          </h2>
          <div className="border border-border p-6">
            <ul className="space-y-4">
              {experience.details.map((detail, index) => (
                <li key={index} className="flex">
                  <span className="font-mono text-muted-foreground mr-3 shrink-0">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="font-sans text-foreground/90 leading-relaxed">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}
