import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "index.md", path: "/" },
  { name: "work.md", path: "/experience" },
  { name: "builds.md", path: "/projects" },
];

export function TabNavigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="container flex items-center">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "tab-item",
              isActive(tab.path) && "active border-b-2 border-primary text-foreground"
            )}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
