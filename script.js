// ===================================================
// 1. GLOBALE VARIABLEN & KONSTANTEN
// ===================================================
let startX = 0;
let endX = 0;
let isDragging = false;
const SWIPE_THRESHOLD = 80; // Mindestdistanz in Pixeln für einen gültigen Swipe

// ===================================================
// 2. SEITENREIHENFOLGE DEFINIEREN
//    ACHTUNG: Pfade müssen exakt mit dem Ende der Browser-URL übereinstimmen!
// ===================================================
const PAGE_ORDER = [
  "../London/London.html",
  "../Postkarte/postkarten.html",
  "../Blickwechsel/Blickwechselplakat.html",
  "../MAK/MAK.html",
  "../Motion-graphics/motion.html",
  "../Corperate Design/CPdesign.html",
  "../Tech.Illu/illu.html",
  "../Zitrone/Farbe.html",
  "../Typo/typo.html",
  "../Fotografie/fotografie.html",
];

// ===================================================
// 3. AKTUELLE SEITE FINDEN (Initialisierung)
// ===================================================
// window.location.pathname liefert den Pfad (z.B. "/Pfad/zu/Zitrone/Farbe.html")
const currentPath = window.location.pathname;

// Wir suchen den Index der Seite in der PAGE_ORDER, die am Ende des aktuellen Pfades steht.
const currentPageIndex = PAGE_ORDER.findIndex(pagePath => currentPath.endsWith(pagePath));


// ===================================================
// 4. HAUPTLOGIK: SWIPE HANDHABEN
// ===================================================

function handleSwipe() {
  // Wenn die aktuelle Seite nicht in der Liste ist, ignorieren wir den Swipe.
  if (currentPageIndex === -1) {
      console.warn("Seite nicht in PAGE_ORDER gefunden. Swipe-Navigation inaktiv.");
      return;
  }
    
  let diff = startX - endX;

  // Prüft, ob die Wischdistanz groß genug ist
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    let nextIndex;

    if (diff > 0) {
      // Swipe nach LINKS (startX > endX) -> gehe zur nächsten Seite (Index + 1)
      nextIndex = currentPageIndex + 1;
    } else {
      // Swipe nach RECHTS (startX < endX) -> gehe zur vorherigen Seite (Index - 1)
      nextIndex = currentPageIndex - 1;
    }

    // Prüfen, ob der errechnete Index innerhalb der Grenzen der Liste liegt
    if (nextIndex >= 0 && nextIndex < PAGE_ORDER.length) {
      const nextURL = PAGE_ORDER[nextIndex];
      // Navigiere zur nächsten/vorherigen URL
      window.location.href = nextURL;
    }
  }
}

// ===================================================
// 5. EVENT-LISTENER FÜR TOUCH-GERÄTE
// ===================================================

document.addEventListener("touchstart", function (e) {
  // Speichere die X-Position des ersten Fingers
  startX = e.touches[0].clientX;
}, { passive: true }); // passive: true verbessert die Scroll-Performance auf Mobilgeräten

document.addEventListener("touchend", function (e) {
  // Speichere die X-Position, wo der Finger den Bildschirm verlassen hat
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

// ===================================================
// 6. EVENT-LISTENER FÜR MAUS (DRAGGING)
// ===================================================

document.addEventListener("mousedown", function (e) {
  // Starte den Drag nur bei Linksklick (Button 0)
  if (e.button !== 0) return;
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener("mouseup", function (e) {
  if (isDragging) {
    // Wenn wir gezogen haben, speichere die Endposition und führe die Logik aus
    endX = e.clientX;
    handleSwipe();
  }
  // Setze den Drag-Zustand zurück
  isDragging = false;
});