import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const WELCOME_LINES: TerminalLine[] = [
  { type: "system", text: "sachin@portfolio:~$ welcome" },
  { type: "output", text: "" },
  {
    type: "output",
    text: "  Full Stack Developer · Building at scale for 13.8M users",
  },
  {
    type: "output",
    text: '  Type "help" for commands, or just browse the tabs above.',
  },
  { type: "output", text: "" },
];

const HELP_TEXT = `available commands:

  whoami          — about me
  skills          — technical stack
  ls projects     — list projects
  ls experience   — list work history
  cat <name>      — view project/experience details
  achievements    — hackathons & awards
  contact         — reach me
  now             — what I'm working on
  open <section>  — navigate to a page
  clear           — clear terminal`;

function processCommand(
  raw: string,
  navigate: (path: string) => void
): TerminalLine[] {
  const cmd = raw.trim().toLowerCase();

  if (!cmd) return [];

  if (cmd === "help" || cmd === "?") {
    return [{ type: "output", text: HELP_TEXT }];
  }

  if (cmd === "whoami") {
    return [
      {
        type: "output",
        text: `Sachin Verma
BTech Information Technology · MITS Gwalior · CGPA 8.09/10

Software engineer focused on building scalable systems and
developer tools. Currently building payment infrastructure
and content architecture at TalkFever (13.8M users).

Previously: SWE Intern @ Drippr · Dev Lead @ Spedee
Founder @ Acadable Labs · Open source on npm`,
      },
    ];
  }

  if (cmd === "skills") {
    return [
      {
        type: "output",
        text: `fundamentals : DSA, System Design, Design Patterns, OOP
languages    : TypeScript, JavaScript, Python, Java, C++, SQL
backend      : Node.js, Express, Fastify, REST, GraphQL, OAuth 2.0
frontend     : React, Next.js, React Native, Vite, Redux, Tailwind
databases    : PostgreSQL, MySQL, MongoDB, Firebase, Firestore
cloud        : AWS, GCP, Docker, Vercel, CI/CD
security     : AES-256-GCM, RSA-OAEP, HMAC-SHA256
tools        : Git, GitHub, Linux/Bash, JGit`,
      },
    ];
  }

  if (cmd === "ls projects") {
    const lines = projects
      .map((p) => `  ${p.id.padEnd(24)} ${p.date.padEnd(10)} ${p.summary.slice(0, 60)}…`)
      .join("\n");
    return [
      {
        type: "output",
        text: `${lines}\n\n  use "cat <id>" to view details, or "open projects" to navigate`,
      },
    ];
  }

  if (cmd === "ls experience" || cmd === "ls work") {
    const lines = experiences
      .map(
        (e) =>
          `  ${e.id.padEnd(20)} ${e.date.padEnd(22)} ${e.company}`
      )
      .join("\n");
    return [
      {
        type: "output",
        text: `${lines}\n\n  use "cat <id>" to view details, or "open experience" to navigate`,
      },
    ];
  }

  if (cmd.startsWith("cat ")) {
    const name = cmd.slice(4).trim();
    const project = projects.find((p) => p.id === name);
    if (project) {
      const detail = [
        `# ${project.title}`,
        `  ${project.role || ""}  ·  ${project.date}`,
        "",
        `  ${project.summary}`,
        "",
        `  stack: ${project.techStack.join(", ")}`,
      ];
      if (project.links?.length) {
        detail.push(
          `  links: ${project.links.map((l) => `${l.label}`).join(", ")}`
        );
      }
      return [{ type: "output", text: detail.join("\n") }];
    }

    const exp = experiences.find((e) => e.id === name);
    if (exp) {
      return [
        {
          type: "output",
          text: [
            `# ${exp.title} — ${exp.company}`,
            `  ${exp.date}  ·  ${exp.location}`,
            "",
            `  ${exp.summary}`,
            "",
            `  stack: ${exp.techStack.join(", ")}`,
          ].join("\n"),
        },
      ];
    }

    return [
      {
        type: "error",
        text: `cat: ${name}: not found. Try "ls projects" or "ls experience"`,
      },
    ];
  }

  if (cmd === "achievements") {
    return [
      {
        type: "output",
        text: `  🏆  1st Runner-up — Symbiosis Skill Hackathon '26 (National Level)
  🏆  Finalist — Hackatron (powered by GitHub)
  🏆  4th Position — Code Coalescence 2025 (MITSDU Hackathon)
  🏆  1st Position — Book Strokes by Querencia (MITS Literary Club)`,
      },
    ];
  }

  if (cmd === "contact") {
    return [
      {
        type: "output",
        text: `  email    : ramasyasachin@gmail.com
  github   : github.com/sachinwhocodes
  linkedin : linkedin.com/in/sachinwhocodes
  resume   : /Sachin_Verma_Resume.pdf`,
      },
    ];
  }

  if (cmd === "now") {
    navigate("/now");
    return [{ type: "system", text: "→ navigating to /now" }];
  }

  if (cmd.startsWith("open ")) {
    const target = cmd.slice(5).trim();
    const routes: Record<string, string> = {
      home: "/",
      projects: "/projects",
      builds: "/projects",
      experience: "/experience",
      work: "/experience",
      now: "/now",
    };
    if (routes[target]) {
      navigate(routes[target]);
      return [{ type: "system", text: `→ navigating to ${routes[target]}` }];
    }
    return [
      {
        type: "error",
        text: `open: unknown section "${target}". Try: home, projects, experience, now`,
      },
    ];
  }

  if (cmd === "clear") {
    return [];
  }

  if (cmd === "sudo" || cmd.startsWith("sudo ")) {
    return [
      {
        type: "output",
        text: "nice try. no root for you.",
      },
    ];
  }

  if (cmd === "exit") {
    return [
      {
        type: "output",
        text: "you can check out any time you like, but you can never leave.",
      },
    ];
  }

  return [
    {
      type: "error",
      text: `command not found: ${cmd}. Type "help" for available commands.`,
    },
  ];
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const inputLine: TerminalLine = {
      type: "input",
      text: `sachin@portfolio:~$ ${cmd}`,
    };

    const output = processCommand(cmd, navigate);

    setLines((prev) => [...prev, inputLine, ...output]);
    setInput("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  if (isCollapsed) {
    return (
      <div className="terminal-window terminal-collapsed">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="terminal-title">terminal — sachin@portfolio</span>
          <button
            className="terminal-toggle"
            onClick={() => setIsCollapsed(false)}
            aria-label="Expand terminal"
          >
            ▲
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-window" onClick={focusInput}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="terminal-title">terminal — sachin@portfolio</span>
        <button
          className="terminal-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(true);
          }}
          aria-label="Collapse terminal"
        >
          ▼
        </button>
      </div>

      <div className="terminal-body" ref={scrollRef}>
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line terminal-${line.type}`}>
            <pre>{line.text}</pre>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-prompt">
          <span className="terminal-prompt-prefix">sachin@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
