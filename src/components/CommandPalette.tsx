import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import {
  FileText,
  Briefcase,
  FolderGit2,
  Clock,
  Mail,
  Github,
  Linkedin,
  Download,
  Search,
} from "lucide-react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleToggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleToggle]);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-container" onClick={(e) => e.stopPropagation()}>
        <Command label="Command palette" loop>
          <div className="cmd-input-wrapper">
            <Search size={14} className="cmd-input-icon" />
            <Command.Input
              placeholder="Type a command or search…"
              className="cmd-input"
              autoFocus
            />
            <kbd className="cmd-kbd">esc</kbd>
          </div>

          <Command.List className="cmd-list">
            <Command.Empty className="cmd-empty">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="cmd-group">
              <Command.Item className="cmd-item" onSelect={() => go("/")}>
                <FileText size={14} />
                <span>Home — index.md</span>
              </Command.Item>
              <Command.Item
                className="cmd-item"
                onSelect={() => go("/experience")}
              >
                <Briefcase size={14} />
                <span>Experience — work.md</span>
              </Command.Item>
              <Command.Item
                className="cmd-item"
                onSelect={() => go("/projects")}
              >
                <FolderGit2 size={14} />
                <span>Projects — builds.md</span>
              </Command.Item>
              <Command.Item className="cmd-item" onSelect={() => go("/now")}>
                <Clock size={14} />
                <span>Now — now.md</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className="cmd-group">
              {projects.map((p) => (
                <Command.Item
                  key={p.id}
                  className="cmd-item"
                  value={`${p.title} ${p.techStack.join(" ")}`}
                  onSelect={() => go(`/projects/${p.id}`)}
                >
                  <FolderGit2 size={14} />
                  <span>{p.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Experience" className="cmd-group">
              {experiences.map((e) => (
                <Command.Item
                  key={e.id}
                  className="cmd-item"
                  value={`${e.title} ${e.company} ${e.techStack.join(" ")}`}
                  onSelect={() => go(`/experience/${e.id}`)}
                >
                  <Briefcase size={14} />
                  <span>
                    {e.title} — {e.company}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Links" className="cmd-group">
              <Command.Item
                className="cmd-item"
                onSelect={() =>
                  openExternal("mailto:ramasyasachin@gmail.com")
                }
              >
                <Mail size={14} />
                <span>Email — ramasyasachin@gmail.com</span>
              </Command.Item>
              <Command.Item
                className="cmd-item"
                onSelect={() =>
                  openExternal("https://github.com/sachinwhocodes")
                }
              >
                <Github size={14} />
                <span>GitHub — sachinwhocodes</span>
              </Command.Item>
              <Command.Item
                className="cmd-item"
                onSelect={() =>
                  openExternal("https://linkedin.com/in/sachinwhocodes")
                }
              >
                <Linkedin size={14} />
                <span>LinkedIn — sachinwhocodes</span>
              </Command.Item>
              <Command.Item
                className="cmd-item"
                onSelect={() => {
                  const a = document.createElement("a");
                  a.href = "/Sachin_Verma_Resume.pdf";
                  a.download = "Sachin_Verma_Resume.pdf";
                  a.click();
                  setOpen(false);
                }}
              >
                <Download size={14} />
                <span>Download Resume</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
