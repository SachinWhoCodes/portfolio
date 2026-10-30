import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderAt } from "./render";

describe("app shell", () => {
  it("unknown route renders not found with a link home", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
  });
});
