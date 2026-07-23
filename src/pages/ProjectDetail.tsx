import { useParams, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "home", path: "/" },
          { label: "builds", path: "/projects" },
          { label: project.id },
        ]}
      />

      <article className="max-w-3xl page-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {project.title}
          </h1>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            {project.role && <p>{project.role}</p>}
            <p>{project.date}</p>
          </div>

          {/* External Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex gap-4 mt-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex items-center gap-1.5 link-hover"
                >
                  <ExternalLink size={12} />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // overview
          </h2>
          <p className="font-sans text-foreground/90 leading-relaxed">
            {project.summary}
          </p>
        </section>

        {/* Technical Details */}
        <section className="mb-10">
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // technical details
          </h2>
          <div className="border border-border p-6">
            <ul className="space-y-4">
              {project.details.map((detail, index) => (
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

        {/* The Hard Part — Case Study */}
        {project.hardPart && (
          <section className="mb-10">
            <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              // the hard part
            </h2>
            <div className="border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Problem
                </h3>
                <p className="font-sans text-foreground/90 leading-relaxed">
                  {project.hardPart.problem}
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Solution
                </h3>
                <p className="font-sans text-foreground/90 leading-relaxed">
                  {project.hardPart.solution}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section>
          <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            // tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
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
