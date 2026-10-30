import { useRef } from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";
import { useParallax } from "@/hooks/use-parallax";
import haze from "@/assets/hero/haze.webp";
import planet from "@/assets/hero/planet.webp";
import portrait from "@/assets/hero/portrait.webp";

const sections = [
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "About", to: "/about" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  useParallax(heroRef);

  return (
    <section ref={heroRef} aria-labelledby="hero-name" className="hero">
      <img src={haze} alt="" className="hero-haze" />
      <div className="hero-scrim" />

      <div className="hero-text">
        <h1 id="hero-name" className="text-2xl font-medium">
          {profile.name}
        </h1>
        <p className="mt-3 max-w-[26rem] leading-relaxed text-muted-foreground">
          {profile.description}
        </p>
        <p className="mt-2 font-mono text-[0.8125rem] text-meta">{profile.location}</p>
        <div className="mt-8">
          <SocialLinks />
        </div>
        <nav className="mt-10 flex gap-6">
          {sections.map(({ label, to }) => (
            <Link key={to} to={to} className="link">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="hero-figures">
        <img src={planet} alt="" className="hero-planet" />
        <img src={portrait} alt="" className="hero-portrait" />
      </div>
    </section>
  );
}
