import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ChatBot } from "../ui/ChatBot";

export function Layout() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      <Sidebar className="hidden md:flex" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Outlet />
        <ChatBot />
      </div>
    </div>
  );
}
