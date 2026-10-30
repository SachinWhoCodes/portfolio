import { useParams } from "react-router-dom";
import { EntryDetail } from "@/components/EntryDetail";
import { findEntry, projectEntries } from "@/lib/entries";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { id } = useParams();
  const entry = findEntry(projectEntries, id);
  if (!entry) return <NotFound />;
  return <EntryDetail entry={entry} back={{ to: "/projects", label: "Projects" }} />;
}
