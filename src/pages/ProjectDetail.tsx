import { useParams, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
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

      <article className="max-w-3xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {project.title}
          </h1>
          <div className="font-mono text-sm text-muted-foreground space-y-1">
            {project.role && <p>{project.role}</p>}
            <p>{project.date}</p>
          </div>
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
            // technical challenges & solutions
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
