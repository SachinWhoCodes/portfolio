import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  back?: { to: string; label: string };
  className?: string;
  children: React.ReactNode;
}

export function Layout({ back, className, children }: LayoutProps) {
  return (
    <main className={cn("mx-auto max-w-[36rem] px-6 pt-24 pb-24", className)}>
      {back && (
        <Link
          to={back.to}
          className="link mb-8 inline-block font-mono text-[0.8125rem] text-meta"
        >
          ← {back.label}
        </Link>
      )}
      {children}
    </main>
  );
}
