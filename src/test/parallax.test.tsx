import { afterEach, describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderAt } from "./render";

const originalMatchMedia = window.matchMedia;

function mockMedia({ finePointer, reducedMotion }: { finePointer: boolean; reducedMotion: boolean }) {
  window.matchMedia = ((query: string) => ({
    matches:
      (query.includes("pointer: fine") && finePointer) ||
      (query.includes("prefers-reduced-motion") && reducedMotion),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

// jsdom's window is 1024x768, so (768, 192) is 75% across and 25% down.
function movePointer() {
  window.dispatchEvent(new MouseEvent("pointermove", { clientX: 768, clientY: 192 }));
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("hero parallax", () => {
  it("maps the pointer position to -1..1 offsets on the hero", () => {
    mockMedia({ finePointer: true, reducedMotion: false });
    renderAt("/");
    movePointer();
    const hero = screen.getByRole("region", { name: "Sachin Verma" });
    expect(hero.style.getPropertyValue("--px")).toBe("0.5");
    expect(hero.style.getPropertyValue("--py")).toBe("-0.5");
  });

  it("stays still when reduced motion is requested", () => {
    mockMedia({ finePointer: true, reducedMotion: true });
    renderAt("/");
    movePointer();
    expect(screen.getByRole("region", { name: "Sachin Verma" }).style.getPropertyValue("--px")).toBe("");
  });

  it("stays still on touch screens", () => {
    mockMedia({ finePointer: false, reducedMotion: false });
    renderAt("/");
    movePointer();
    expect(screen.getByRole("region", { name: "Sachin Verma" }).style.getPropertyValue("--px")).toBe("");
  });
});
