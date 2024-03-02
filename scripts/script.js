// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);

    // Bring the opened window to the front
    const allWindows = document.querySelectorAll('.sub-page');
    let highestZIndex = 0;

    allWindows.forEach((window) => {
        const zIndex = parseInt(window.style.zIndex || 0, 10);
        highestZIndex = Math.max(highestZIndex, zIndex);
    });

    contentWindow.style.zIndex = highestZIndex + 1;

    // If the content is an audio player, initialize it
    if (contentId === 'player') {
        initializeAudioPlayer();
    }

    // Add 'active' class to the selected sub-page
    contentWindow.classList.add('active');
}

// Function to close a window
function closeWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.remove('active');

    // If the content is an audio player, stop the playback
    if (contentId === 'player') {
        stopAudioPlayer();
    }
}

// Get all the menu items and corresponding sub-pages
const menuItems = document.querySelectorAll('.windows95 a');
const subPages = document.querySelectorAll('.sub-page');

// Add click event listeners to each menu item
menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        // Add 'active' class to the selected sub-page
        subPages[index].classList.add('active');

        // Get the contentId from the data-window attribute
        const contentId = menuItem.getAttribute('data-window');

        // Open the window for the specified content
        openWindow(contentId);
    });
});

// Initialize the audio player
function initializeAudioPlayer() {
    // Your existing audio player initialization code
}

// Set up the file explorer
function setupExplorer(audio) {
    // Your existing file explorer setup code
}

// Update track information
function updateTrackInfo(audio, index) {
    // Your existing update track info code
}
