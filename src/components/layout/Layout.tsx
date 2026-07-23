import { TabNavigation } from "./TabNavigation";
import { CommandPalette } from "@/components/CommandPalette";
import { KbdHint } from "@/components/KbdHint";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      <main className="container py-12">{children}</main>
      <CommandPalette />
      <KbdHint />
    </div>
  );
}
