import { projects, type Project } from "@/data/projects";
import { experiences, type Experience } from "@/data/experience";

// One shape for projects and experience, so list and detail pages are shared.
export interface Entry {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  facts: string[];
  summary: string;
  highlights: [string, string];
  details: string[];
  hardPart?: { problem: string; solution: string };
  techStack: string[];
  links?: { label: string; href: string }[];
}

const nonEmpty = (values: (string | undefined)[]) =>
  values.filter((v): v is string => Boolean(v));

export function projectToEntry(p: Project): Entry {
  return {
    id: p.id,
    title: p.title,
    date: p.date,
    facts: nonEmpty([p.role, p.date]),
    summary: p.summary,
    highlights: p.highlights,
    details: p.details,
    hardPart: p.hardPart,
    techStack: p.techStack,
    links: p.links,
  };
}

export function experienceToEntry(e: Experience): Entry {
  return {
    id: e.id,
    title: e.title,
    subtitle: e.company,
    date: e.date,
    facts: nonEmpty([e.company, e.date, e.location]),
    summary: e.summary,
    highlights: e.highlights,
    details: e.details,
    hardPart: e.hardPart,
    techStack: e.techStack,
    links: e.links,
  };
}

export const projectEntries = projects.map(projectToEntry);
export const experienceEntries = experiences.map(experienceToEntry);

export function findEntry(entries: Entry[], id: string | undefined) {
  return entries.find((entry) => entry.id === id);
}
