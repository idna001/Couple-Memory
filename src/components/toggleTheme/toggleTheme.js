import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';

export default function ToggleTheme() {
  const [preference, setPreference] = useState(
    localStorage.getItem(THEME_STORAGE_KEY) || 'system'
  );

  function getAppliedMode(userPreference) {
    if (userPreference === 'light') {
      return 'light';
    }

    if (userPreference === 'dark') {
      return 'dark';
    }

    // system
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }

  function setAppliedMode(mode) {
    document.documentElement.dataset.appliedMode = mode;
    document.documentElement.dataset.theme = mode;
  }

  useEffect(() => {
    if (preference === 'system') {
      const monitorSystemColorScheme = () => {
        const appliedMode = getAppliedMode(preference);
        if (appliedMode !== document.documentElement.dataset.appliedMode) {
          setAppliedMode(appliedMode);
        }
      };

      monitorSystemColorScheme();

      window
        .matchMedia('(prefers-color-scheme: light)')
        .addEventListener('change', monitorSystemColorScheme);

      return () => {
        window
          .matchMedia('(prefers-color-scheme: light)')
          .removeEventListener('change', monitorSystemColorScheme);
      };
    }
  }, [preference]);

  function saveUserPreference(userPreference) {
    localStorage.setItem(THEME_STORAGE_KEY, userPreference);
  }

  useEffect(() => {
    setAppliedMode(getAppliedMode(preference));
    saveUserPreference(preference);
  }, [preference]);

  function rotatePreferences(userPreference) {
    if (userPreference === 'system') {
      return 'light';
    }
    if (userPreference === 'light') {
      return 'dark';
    }
    if (userPreference === 'dark') {
      return 'system';
    }
    // for invalid values, just in case
    return 'system';
  }

  const handleClick = () => {
    const newPreference = rotatePreferences(preference);
    setPreference(newPreference);
  };

  return (
    <button
      onClick={handleClick}
      className='absolute top-[1vh] right-[1vw] text-[0.7em] text-text bg-background border-2 border-current px-3 py-1.5 rounded font-bold hover:bg-[green] hover:text-white'
    >
      {preference}
    </button>
  );
}
