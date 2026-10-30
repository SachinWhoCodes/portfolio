import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderAt } from "./render";

describe("about", () => {
  it("shows currently, education, achievements and stack", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
    for (const name of ["Currently", "Education", "Achievements", "Stack"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getByText(/^At TalkFever I'm building the creator monetization system/)).toBeInTheDocument();
    expect(screen.getByText("Madhav Institute of Technology and Science")).toBeInTheDocument();
    expect(screen.getByText("BTech, Information Technology · Aug 2023 – Jun 2027 · CGPA 8.09")).toBeInTheDocument();
    expect(screen.getByText("1st Runner-up — Symbiosis Skill Hackathon '26 (National Level)")).toBeInTheDocument();
    expect(screen.getByText("Finalist — Hackatron (powered by GitHub)")).toBeInTheDocument();
    expect(screen.getByText("4th Position — Code Coalescence 2025 (MITSDU Official Hackathon)")).toBeInTheDocument();
    expect(screen.getByText("languages")).toBeInTheDocument();
    expect(screen.getByText("TypeScript, JavaScript, Java, Python, C++, SQL")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Sachin Verma" })).toHaveAttribute("href", "/");
  });

  it("/now redirects to about", () => {
    renderAt("/now");
    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
  });
});
