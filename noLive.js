console.log("NOLIVE ACTIVATED");

const hide = (el) => el && el.style.setProperty('display', 'none', 'important');

const hideAll = () => {
  const liveSections = document.querySelectorAll('.dp-live-events-carousel, #dp-live-events-carousel');
  const heroModules = document.querySelectorAll('.dp-hero-live-event-module');
  console.log('hideAll ran:', { liveSectionsCount: liveSections.length, heroModulesCount: heroModules.length });
  liveSections.forEach(hide);
  heroModules.forEach(hide);
};

const startObserving = () => {
  hideAll();
  const observer = new MutationObserver(hideAll);
  observer.observe(document.body, { childList: true, subtree: true });
};

const init = () => {
  if (document.body) {
    startObserving();
  } else {
    const bodyWatcher = new MutationObserver(() => {
      if (document.body) {
        bodyWatcher.disconnect();
        startObserving();
      }
    });
    bodyWatcher.observe(document.documentElement, { childList: true });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}