import { EntryList } from "@/components/EntryList";
import { projectEntries } from "@/lib/entries";

export default function Projects() {
  return <EntryList title="Projects" basePath="/projects" entries={projectEntries} />;
}
