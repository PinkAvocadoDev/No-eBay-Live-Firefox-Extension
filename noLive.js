console.log("NOLIVE ACTIVATED");

const hide = (el) => el && el.remove();

let currSesh = 0

const hideAll = async () => {
  const liveSections = document.querySelectorAll('.dp-live-events-carousel, #dp-live-events-carousel');
  const heroModules = document.querySelectorAll('.dp-hero-live-event-module');
  console.log('hideAll ran:', { liveSectionsCount: liveSections.length, heroModulesCount: heroModules.length });
  liveSections.forEach(hide);
  heroModules.forEach(hide);

  const totalLength = liveSections.length + heroModules.length;
  if(totalLength === 0){
    return
  }
  currSesh += totalLength

  const current = await get({count:0, total:0});
  current.total += totalLength;
  current.count = currSesh;

  await save(current);
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

async function save(key){
  await browser.storage.local.set(key)
}

async function get(key){
  return await browser.storage.local.get(key)
}