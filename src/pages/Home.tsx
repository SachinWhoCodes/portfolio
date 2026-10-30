import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

const sections = [
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "About", to: "/about" },
];

export default function Home() {
  return (
    <Layout className="pt-[20vh]">
      <h1 className="text-2xl font-medium">{profile.name}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{profile.description}</p>
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
    </Layout>
  );
}
