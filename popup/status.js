
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

async function init(){
    const res = await get({ count: 0, total: 0 });
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById("counter").innerHTML = res.count;
    document.getElementById("tot").innerHTML = res.total;
}



async function reset(){
    await save({count: 0, total: 0})
    init()
}

async function save(key){
  await browser.storage.local.set(key)
}

async function get(key){
  return await browser.storage.local.get(key)
}