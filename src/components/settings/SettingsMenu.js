import { useState, useEffect, useRef } from "react";
import { Settings, Moon, RefreshCw } from "lucide-react";
import toggleTheme from "../toggleTheme/toggleTheme";

export default function SettingsMenu({ onReset }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleReset = () => {
        localStorage.clear();
        if (onReset) onReset();
        setOpen(false);
    };

    const handleThemeChange = () => {
        toggleTheme();
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
        <div ref={menuRef} className="relative ">
            {/* Settings Icon Button */}
            <button
                onClick={() => setOpen(!open)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600/80 transition-colors"
            >
                <Settings className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none p-2 flex flex-col animate-fade-in"
                >
                    <div className="py-1">
                        <button
                            onClick={handleThemeChange}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <Moon className="w-5 h-5" />
                            <span>Toggle Theme</span>
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            <span>Reset History</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}