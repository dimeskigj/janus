export const constants = {
  locale: {
    localStorageKey: 'locale',
    appLanguage: localStorage.getItem('locale') || 'en',
  },
  breakpoints: {
    lg: '(min-width: 1024px)',
  },
};
