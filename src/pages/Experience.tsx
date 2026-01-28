import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home", path: "/" }, { label: "work" }]} />

      <article className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Work Experience
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Chronological history of professional roles and contributions.
          </p>
        </header>

        <div className="space-y-1">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="border border-border p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-mono text-base text-foreground">
                    {exp.title}
                  </h2>
                  <p className="font-mono text-sm text-muted-foreground">
                    {exp.company}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {exp.date}
                </span>
              </div>

              <p className="font-sans text-sm text-foreground/80 mb-4 leading-relaxed">
                {exp.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {exp.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {exp.techStack.length > 4 && (
                    <span className="tech-tag">+{exp.techStack.length - 4}</span>
                  )}
                </div>
                <Link
                  to={`/experience/${exp.id}`}
                  className="text-link shrink-0"
                >
                  view details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
