import { useState, useEffect } from "react";
import { GitCommit, GitPullRequest, Star, GitBranch } from "lucide-react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: { message: string }[];
    pull_request?: { title: string };
  };
}

interface ActivityItem {
  icon: React.ReactNode;
  text: string;
  repo: string;
  time: string;
}

function formatEvent(event: GitHubEvent): ActivityItem | null {
  const repo = event.repo.name.replace("SachinWhoCodes/", "");
  const time = formatRelativeTime(event.created_at);

  switch (event.type) {
    case "PushEvent": {
      const msg =
        event.payload.commits?.[0]?.message.split("\n")[0] || "pushed code";
      return {
        icon: <GitCommit size={14} />,
        text: msg.length > 60 ? msg.slice(0, 57) + "…" : msg,
        repo,
        time,
      };
    }
    case "CreateEvent":
      return {
        icon: <GitBranch size={14} />,
        text: `created ${event.payload.ref_type || "branch"} ${event.payload.ref || ""}`.trim(),
        repo,
        time,
      };
    case "PullRequestEvent":
      return {
        icon: <GitPullRequest size={14} />,
        text: `${event.payload.action} PR: ${event.payload.pull_request?.title || ""}`,
        repo,
        time,
      };
    case "WatchEvent":
      return {
        icon: <Star size={14} />,
        text: "starred",
        repo,
        time,
      };
    default:
      return null;
  }
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function GitHubActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchActivity() {
      try {
        const res = await fetch(
          "https://api.github.com/users/SachinWhoCodes/events/public?per_page=15",
          {
            headers: { Accept: "application/vnd.github.v3+json" },
          }
        );

        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

        const events: GitHubEvent[] = await res.json();
        if (cancelled) return;

        const items = events
          .map(formatEvent)
          .filter((e): e is ActivityItem => e !== null)
          .slice(0, 6);

        setActivities(items);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="github-activity">
        <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
          // recent activity
        </h2>
        <div className="border border-border p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="github-pulse" />
            fetching from github…
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || activities.length === 0) {
    return (
      <div className="github-activity">
        <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
          // recent activity
        </h2>
        <div className="border border-border p-4">
          <a
            href="https://github.com/sachinwhocodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            view on github →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="github-activity">
      <h2 className="font-mono text-sm text-muted-foreground mb-4 uppercase tracking-wider">
        // recent activity
      </h2>
      <div className="border border-border divide-y divide-border">
        {activities.map((item, i) => (
          <div
            key={i}
            className="github-activity-row flex items-start gap-3 px-4 py-3"
          >
            <span className="text-muted-foreground mt-0.5 shrink-0">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm text-foreground/90 truncate">
                {item.text}
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                {item.repo} · {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://github.com/sachinwhocodes"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link inline-block mt-3"
      >
        view all on github →
      </a>
    </div>
  );
}
