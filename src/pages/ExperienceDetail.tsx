import { useParams } from "react-router-dom";
import { EntryDetail } from "@/components/EntryDetail";
import { experienceEntries, findEntry } from "@/lib/entries";
import NotFound from "./NotFound";

export default function ExperienceDetail() {
  const { id } = useParams();
  const entry = findEntry(experienceEntries, id);
  if (!entry) return <NotFound />;
  return <EntryDetail entry={entry} back={{ to: "/experience", label: "Experience" }} />;
}
