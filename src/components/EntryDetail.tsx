import { Layout } from "@/components/layout/Layout";
import type { Entry } from "@/lib/entries";

interface EntryDetailProps {
  entry: Entry;
  back: { to: string; label: string };
}

export function EntryDetail({ entry, back }: EntryDetailProps) {
  return (
    <Layout back={back}>
      <h1 className="text-xl font-medium">{entry.title}</h1>
      <p className="mt-2 font-mono text-[0.8125rem] text-meta">
        {entry.facts.join(" · ")}
        {entry.links?.map((link) => (
          <span key={link.href}>
            {" · "}
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="link">
              {link.label}
            </a>
          </span>
        ))}
      </p>

      <p className="mt-6 leading-relaxed text-muted-foreground">{entry.summary}</p>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium">What I built</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          {entry.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>

      {entry.hardPart && (
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-medium">The hard part</h2>
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>{entry.hardPart.problem}</p>
            <p>{entry.hardPart.solution}</p>
          </div>
        </section>
      )}

      <p className="mt-10 font-mono text-[0.8125rem] text-meta">{entry.techStack.join(" · ")}</p>
    </Layout>
  );
}
