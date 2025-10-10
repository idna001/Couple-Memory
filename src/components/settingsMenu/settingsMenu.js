import { useState, useEffect, useRef } from "react";
import { Settings, Moon, RefreshCw } from "lucide-react";
import toggleTheme from "../toggleTheme/toggleTheme";

export default function SettingsMenu({ onReset }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleThemeChange = () => {
    toggleTheme();
  };

  const handleReset = () => {
    if (onReset) onReset();
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600/80 transition-colors"
      >
        <Settings className="w-6 h-6 text-slate-700 dark:text-slate-200" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 origin-top-right rounded-2xl bg-white dark:bg-[#1C1C1E] shadow-xl ring-1 ring-black/5 focus:outline-none p-2 animate-fade-in z-50"
        >
          <button
            onClick={handleThemeChange}
            className="flex justify-between items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
          >
            <span>Toggle Theme</span>
            <Moon className="w-5 h-5" />
          </button>

          <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />

          <button
            onClick={handleReset}
            className="flex justify-between items-center w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <span>Reset History</span>
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
