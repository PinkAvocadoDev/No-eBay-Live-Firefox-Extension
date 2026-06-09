document.addEventListener("DOMContentLoaded", () => {
    const liveSection = document.getElementById('dp-live-events-carousel');
    const bigLiveSection = document.getElementsByClassName('dp-hero-live-event-module');
    for (bLS of bigLiveSection){
        bLS.style.display = 'none !important';
    }
    liveSection.style.display = 'none';
    console.log("NOLIVE ACTIVATED");
});