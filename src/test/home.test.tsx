import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderAt } from "./render";

describe("home", () => {
  it("shows name, description and location", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1, name: "Sachin Verma" })).toBeInTheDocument();
    expect(
      screen.getByText(/Software engineer building backend systems\. Currently scaling infrastructure/),
    ).toBeInTheDocument();
    expect(screen.getByText("Gwalior, India")).toBeInTheDocument();
  });

  it("social links have names and correct targets", () => {
    renderAt("/");
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/sachinwhocodes");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/sachinwhocodes");
    expect(linkedin).toHaveAttribute("target", "_blank");

    const email = screen.getByRole("link", { name: "Email" });
    expect(email).toHaveAttribute("href", "mailto:ramasyasachin@gmail.com");
    expect(email).not.toHaveAttribute("target");

    const resume = screen.getByRole("link", { name: "Résumé" });
    expect(resume).toHaveAttribute("href", "/Sachin_Verma_Resume.pdf");
    expect(resume).toHaveAttribute("download", "Sachin_Verma_Resume.pdf");
    expect(resume).not.toHaveAttribute("target");
  });

  it("links to the three sections", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/experience");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });
});
