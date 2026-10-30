import { EntryList } from "@/components/EntryList";
import { experienceEntries } from "@/lib/entries";

export default function Experience() {
  return <EntryList title="Experience" basePath="/experience" entries={experienceEntries} />;
}
