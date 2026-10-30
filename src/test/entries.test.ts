import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import {
  projectToEntry,
  experienceToEntry,
  projectEntries,
  findEntry,
} from "@/lib/entries";

describe("content data", () => {
  it("every project and role has two non-empty highlights under 60 chars", () => {
    for (const item of [...projects, ...experiences]) {
      expect(item.highlights, item.id).toHaveLength(2);
      for (const h of item.highlights) {
        expect(h, item.id).toBe(h.trim());
        expect(h.length, item.id).toBeGreaterThan(0);
        expect(h.length, item.id).toBeLessThan(60);
      }
    }
  });
});

describe("entries", () => {
  it("projectToEntry uses role and date as facts", () => {
    const entry = projectToEntry(projects.find((p) => p.id === "packshell")!);
    expect(entry.title).toBe("PackShell");
    expect(entry.facts).toEqual(["Solo Developer", "2025"]);
  });

  it("experienceToEntry puts company in subtitle and facts", () => {
    const entry = experienceToEntry(experiences.find((e) => e.id === "drippr")!);
    expect(entry.subtitle).toBe("Drippr Technologies");
    expect(entry.facts).toEqual([
      "Drippr Technologies",
      "Oct 2025 – Jan 2026",
      "New Delhi, India",
    ]);
  });

  it("findEntry returns undefined for unknown or missing ids", () => {
    expect(findEntry(projectEntries, "packshell")?.title).toBe("PackShell");
    expect(findEntry(projectEntries, "nope")).toBeUndefined();
    expect(findEntry(projectEntries, undefined)).toBeUndefined();
  });
});
