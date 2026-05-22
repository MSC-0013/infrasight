import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandPalette } from "@/components/command-palette";
import { InspectorDrawer } from "@/components/inspector-drawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="thin-scrollbar min-w-0 flex-1 overflow-x-auto">
          {children}
        </main>
      </div>
      <CommandPalette />
      <InspectorDrawer />
    </div>
  );
}
