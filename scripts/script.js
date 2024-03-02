// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);

    // Bring the opened window to the front
    contentWindow.style.zIndex = Date.now();

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
        // Close all active windows
        subPages.forEach((subPage) => {
            subPage.classList.remove('active');
        });

        // Bring the clicked window to the front
        const contentId = menuItem.getAttribute('data-window');
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
