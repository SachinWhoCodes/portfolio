import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderAt } from "./render";
import { projects } from "@/data/projects";

describe("list pages", () => {
  it("projects list shows every entry with highlights and read more", () => {
    renderAt("/projects");
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
    for (const p of projects) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
      expect(screen.getByText(p.highlights[0])).toBeInTheDocument();
      expect(screen.getByText(p.highlights[1])).toBeInTheDocument();
    }
    const readMore = screen.getAllByRole("link", { name: /read more/i });
    expect(readMore.map((a) => a.getAttribute("href"))).toEqual([
      "/projects/packshell",
      "/projects/sagit",
      "/projects/lazyserve",
      "/projects/assessment-platform",
      "/projects/hotel-saas",
    ]);
    expect(screen.getByRole("link", { name: "← Sachin Verma" })).toHaveAttribute("href", "/");
  });

  it("experience list shows role and company", () => {
    renderAt("/experience");
    expect(screen.getByText("Full Stack Developer Intern")).toBeInTheDocument();
    expect(screen.getByText("TalkFever Social Media Ltd")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /read more/i })[0]).toHaveAttribute(
      "href",
      "/experience/talkfever-fsd",
    );
  });
});

describe("detail pages", () => {
  it("project detail shows summary, details, hard part, tech and links", () => {
    renderAt("/projects/packshell");
    const packshell = projects.find((p) => p.id === "packshell")!;
    expect(screen.getByRole("heading", { level: 1, name: "PackShell" })).toBeInTheDocument();
    expect(screen.getByText(/^A CLI tool that synchronizes environment variables/)).toBeInTheDocument();
    for (const detail of packshell.details) {
      expect(screen.getByText(detail)).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "What I built" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The hard part" })).toBeInTheDocument();
    expect(screen.getByText(/^The core challenge was key distribution/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript · Commander\.js/)).toBeInTheDocument();
    expect(screen.getByText(/Solo Developer · 2025/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "npm" })).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/packshell",
    );
    expect(screen.getByRole("link", { name: "← Projects" })).toHaveAttribute("href", "/projects");
  });

  it("detail omits the hard part when there is none", () => {
    renderAt("/projects/hotel-saas");
    expect(screen.getByRole("heading", { name: "What I built" })).toBeInTheDocument();
    expect(screen.queryByText("The hard part")).toBeNull();
  });

  it("detail omits links when there are none", () => {
    renderAt("/projects/assessment-platform");
    expect(screen.getByRole("heading", { level: 1, name: "Assessment Platform" })).toBeInTheDocument();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/projects"]);
  });

  it("experience detail shows company and location", () => {
    renderAt("/experience/drippr");
    expect(screen.getByText(/Drippr Technologies · Oct 2025 – Jan 2026 · New Delhi, India/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Experience" })).toHaveAttribute("href", "/experience");
  });

  it.each(["/projects/nope", "/experience/nope"])("unknown id %s renders not found", (path) => {
    renderAt(path);
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});
