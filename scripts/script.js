// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.add('active');

    // If the content is an audio player, initialize it
    if (contentId === 'player') {
        initializeAudioPlayer();
    }
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

// Make the windows draggable using jQuery UI
$('.sub-page').draggable({
    containment: 'body', // Keep the windows within the body limits
    start: function (event, ui) {
        // Move the dragged window to the front
        $(this).css('z-index', 9999);
    },
    stop: function () {
        // Reset the z-index after dragging stops
        $(this).css('z-index', '');
    }
});

// Add click event listeners to each menu item
menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        // Do nothing if the sub-page is already active
        if (subPages[index].classList.contains('active')) {
            return;
        }

        // Close all active windows except the one being clicked
        subPages.forEach((subPage, i) => {
            if (i !== index) {
                subPage.classList.remove('active');
            }
        });

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

// Create file link for the explorer
function createFileLink(audio, index) {
    // Your existing create file link code
}

// Create explorer item
function createExplorerItem(fileLink) {
    // Your existing create explorer item code
}

// Update track information
function updateTrackInfo(audio, index) {
    // Your existing update track info code
}
