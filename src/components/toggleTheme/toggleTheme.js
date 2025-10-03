import './toggleTheme.css'


export default function toggleTheme() {
function getUserPreference() {
    return localStorage.getItem('theme') || 'system';
  }
  function saveUserPreference(userPreference) {
    localStorage.setItem('theme', userPreference);
  }
  
  function getAppliedMode(userPreference) {
    if (userPreference === 'light') {
      return 'light';
    }
    if (userPreference === 'dark') {
      return 'dark';
    }
    // system
    if (matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }
  
  function setAppliedMode(mode) {
    document.documentElement.dataset.appliedMode = mode;
  }
  
  function rotatePreferences(userPreference) {
    if (userPreference === 'system') {
      return 'light'
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

  function watchSystemTheme(){
    const mediaQuery =window.matchMedia("(prefers-color-scheme:light)");

    function updateTheme(e){
      const userPref = getUserPreference();
      if(userPref==="system"){
        setAppliedMode(e.matches?"light":"dark");
      }
    }
    updateTheme(mediaQuery);

    mediaQuery.addEventListener("change", updateTheme);
  }
  
  const themeToggler = document.getElementById('theme-toggle');
  
  let userPreference = getUserPreference();
  setAppliedMode(getAppliedMode(userPreference));
  themeToggler.innerText = rotatePreferences(userPreference);
  
  watchSystemTheme()

  themeToggler.onclick = () => {
    const newUserPref = rotatePreferences(userPreference);
    userPreference = newUserPref;
    saveUserPreference(newUserPref);

   themeToggler.innerText = rotatePreferences(userPreference);

    setAppliedMode(getAppliedMode(newUserPref));
  }

}