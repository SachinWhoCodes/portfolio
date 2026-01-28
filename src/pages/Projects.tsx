import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home", path: "/" }, { label: "builds" }]} />

      <article className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Projects & Builds
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Selected technical projects with focus on system design and implementation.
          </p>
        </header>

        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-mono text-base text-foreground">
                    {project.title}
                  </h2>
                  {project.role && (
                    <p className="font-mono text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {project.date}
                </span>
              </div>

              <p className="font-sans text-sm text-foreground/80 mb-4 leading-relaxed">
                {project.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-tag">+{project.techStack.length - 4}</span>
                  )}
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-link shrink-0"
                >
                  full case study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
