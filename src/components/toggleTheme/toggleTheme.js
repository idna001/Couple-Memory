import './toggleTheme.css'

export default function toggleTheme() {
  function getUserPreference() {
    return localStorage.getItem('theme') || 'system';
  }

  function saveUserPreference(userPreference) {
    localStorage.setItem('theme', userPreference);
  }

  function getAppliedMode(userPreference) {
    if (userPreference === 'light') return 'light';
    if (userPreference === 'dark') return 'dark';
    if (matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function rotatePreferences(userPreference) {
    if (userPreference === 'system') return 'light';
    if (userPreference === 'light') return 'dark';
    if (userPreference === 'dark') return 'system';
    return 'system';
  }

  // --- simplified logic ---
  let userPreference = getUserPreference();
  const newUserPref = rotatePreferences(userPreference);
  saveUserPreference(newUserPref);

  const appliedMode = getAppliedMode(newUserPref);
  document.documentElement.dataset.appliedMode = appliedMode;
}
