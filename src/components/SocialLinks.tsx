import { FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { socials, type SocialIcon } from "@/data/profile";

const icons: Record<SocialIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  resume: FileText,
};

export function SocialLinks() {
  return (
    <ul className="flex gap-5">
      {socials.map(({ label, href, icon, download }) => {
        const Icon = icons[icon];
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              download={download}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
