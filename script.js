document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Minimum swipe distance (in pixels) to trigger the action
    // This prevents small accidental touches from registering as swipes
    const minSwipeDistance = 50; 

    // 1. Listen for the start of the touch
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    // 2. Listen for the end of the touch
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, {passive: true});

    // 3. Calculate direction and trigger click
    function handleGesture() {
        const distance = touchEndX - touchStartX;

        // Check if the distance is long enough to be a swipe
        if (Math.abs(distance) > minSwipeDistance) {
            
            // SWIPE RIGHT (Finger moves Left -> Right)
            // Usually means "Go Back" / Trigger Left Arrow
            if (distance > 0) {
                const leftArrow = document.getElementById('left-arrow');
                if (leftArrow) {
                    // Optional: Visual feedback or console log
                    // console.log('Swiped Right -> Clicking Left Arrow');
                    leftArrow.click();
                }
            } 
            
            // SWIPE LEFT (Finger moves Right -> Left)
            // Usually means "Go Next" / Trigger Right Arrow
            else {
                const rightArrow = document.getElementById('right-arrow');
                if (rightArrow) {
                    // console.log('Swiped Left -> Clicking Right Arrow');
                    rightArrow.click();
                }
            }
        }
    }
});


const langBtn = document.getElementById('lang-switch');

// 1. Funktion, die die Sprache tatsächlich umschaltet
function applyLanguage(lang) {
    const enTexts = document.querySelectorAll('.lang-en');
    const deTexts = document.querySelectorAll('.lang-de');

    if (lang === 'de') {
        enTexts.forEach(el => el.style.display = 'none');
        deTexts.forEach(el => el.style.display = 'inline');
    } else {
        enTexts.forEach(el => el.style.display = 'inline');
        deTexts.forEach(el => el.style.display = 'none');
    }
}

// 2. Beim Laden der Seite: Gespeicherte Sprache abrufen
// Falls nichts gespeichert ist, nehmen wir 'en' als Standard
let currentLang = localStorage.getItem('selectedLang') || 'en';
applyLanguage(currentLang);

// 3. Klick-Event für den Globe-Button
langBtn.addEventListener('click', () => {
    // Wechseln
    currentLang = (currentLang === 'en') ? 'de' : 'en';
    
    // Speichern im Browser-Speicher
    localStorage.setItem('selectedLang', currentLang);
    
    // Sichtbarkeit anpassen
    applyLanguage(currentLang);
});