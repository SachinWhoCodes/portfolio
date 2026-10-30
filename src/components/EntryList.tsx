import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import type { Entry } from "@/lib/entries";

interface EntryListProps {
  title: string;
  basePath: "/projects" | "/experience";
  entries: Entry[];
}

export function EntryList({ title, basePath, entries }: EntryListProps) {
  return (
    <Layout back={{ to: "/", label: "Sachin Verma" }}>
      <h1 className="mb-8 text-xl font-medium">{title}</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className="border-t border-border py-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium">{entry.title}</h2>
              <span className="shrink-0 font-mono text-[0.8125rem] text-meta">{entry.date}</span>
            </div>
            {entry.subtitle && <p className="text-muted-foreground">{entry.subtitle}</p>}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link to={`${basePath}/${entry.id}`} className="link mt-3 inline-block text-sm">
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
