import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "home", path: "/" }, { label: "builds" }]} />

      <article className="max-w-3xl page-fade-in">
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Projects & Builds
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Selected work — system design, developer tools, and infrastructure.
          </p>
        </header>

        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border p-6 hover:bg-muted/30 transition-colors card-hover"
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

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-tag">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {project.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link inline-flex items-center gap-1 link-hover"
                    >
                      <ExternalLink size={11} />
                      {link.label}
                    </a>
                  ))}
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-link link-hover"
                  >
                    case study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
