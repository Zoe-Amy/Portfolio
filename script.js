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
