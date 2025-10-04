import { useEffect, useState } from "react";
import "./toggleTheme.css";

const THEME_STORAGE_KEY = "theme";

export default function ToggleTheme() {
  const [preference, setPreference] = useState(
    localStorage.getItem(THEME_STORAGE_KEY) || "system"
  );

  function getAppliedMode(userPreference) {
    if (userPreference === "light") {
      return "light";
    }

    if (userPreference === "dark") {
      return "dark";
    }

    // system
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }

    return "dark";
  }

  function setAppliedMode(mode) {
    document.documentElement.dataset.appliedMode = mode;
  }

  useEffect(() => {
    if (preference === "system") {
      const monitorSystemColorScheme = () => {
        const appliedMode = getAppliedMode(preference);
        if (appliedMode !== document.documentElement.dataset.appliedMode) {
          setAppliedMode(appliedMode);
        }
      };

      monitorSystemColorScheme();

      window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", monitorSystemColorScheme);

      return () => {
        window
          .matchMedia("(prefers-color-scheme: light)")
          .removeEventListener("change", monitorSystemColorScheme);
      };
    }
  }, [preference]);

  function saveUserPreference(userPreference) {
    localStorage.setItem("theme", userPreference);
  }

  useEffect(() => {
    setAppliedMode(getAppliedMode(preference));
    saveUserPreference(preference);
  }, [preference]);

  function rotatePreferences(userPreference) {
    if (userPreference === "system") {
      return "light";
    }
    if (userPreference === "light") {
      return "dark";
    }
    if (userPreference === "dark") {
      return "system";
    }
    // for invalid values, just in case
    return "system";
  }

  const handleClick = () => {
    const newPreference = rotatePreferences(preference);
    setPreference(newPreference);
  };

  return (
    <button id="theme-toggle" onClick={handleClick}>
      {preference}
    </button>
  );
}
