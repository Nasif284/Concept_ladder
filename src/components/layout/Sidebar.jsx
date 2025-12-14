import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export function Sidebar({ className }) {
  return (
    <aside className={cn("flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-background-dark sticky top-0", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-primary/10 flex items-center justify-center text-primary font-bold">
            CL
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#111418] dark:text-white text-base font-medium leading-normal">Concept Ladder</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2">
            <span className="material-symbols-outlined text-primary dark:text-white filled">home</span>
            <p className="text-primary dark:text-white text-sm font-medium leading-normal">Home</p>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[#111418] dark:text-gray-300">dashboard</span>
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">Dashboard</p>
          </Link>
          <Link to="/topics" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[#111418] dark:text-gray-300">menu_book</span>
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">My Topics</p>
          </Link>
          <Link to="/favorites" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[#111418] dark:text-gray-300">favorite</span>
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">Favorites</p>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[#111418] dark:text-gray-300">settings</span>
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">Settings</p>
          </Link>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="material-symbols-outlined text-[#111418] dark:text-gray-300">account_circle</span>
          <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">Alex Lee</p>
        </div>
      </div>
    </aside>
  );
}
