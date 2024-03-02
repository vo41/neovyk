// script.js

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

// Add click event listeners to each menu item
menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        // Remove 'active' class from all sub-pages
        subPages.forEach((subPage) => {
            subPage.classList.remove('active');
        });

        // Add 'active' class to the selected sub-page
        subPages[index].classList.add('active');

        // Get the contentId from the data-window attribute
        const contentId = menuItem.getAttribute('data-window');

        // Open the window for the specified content
        openWindow(contentId);
    });
});

// ... Your existing code ...

// Initialize the audio player
function initializeAudioPlayer() {
    const audio = new Howl({
        src: [
            'audio/01. Arrival.mp3',
            'audio/02. Worlds Away.mp3',
            // Add more paths as needed
        ],
        html5: true,
        volume: 0.5,
        onplay: () => startVisualizer(),
        onpause: () => stopVisualizer(),
        onstop: () => stopVisualizer(),
        onend: () => stopVisualizer(),
        onload: () => {
            // Set up the explorer once the audio is loaded
            setupExplorer(audio);
        },
    });

    // ... Your existing code ...

    // Volume control
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('input', () => {
        const volume = volumeControl.value / 100;
        audio.volume(volume);
    });
}

// Set up the file explorer
function setupExplorer(audio) {
    const explorer = document.getElementById('explorer');
    explorer.innerHTML = '';

    audio._src.forEach((src, index) => {
        const fileLink = document.createElement('a');
        fileLink.href = '#';
        fileLink.textContent = `Track ${index + 1}`;
        fileLink.addEventListener('click', () => {
            audio.stop();
            audio.play(index);
            updateTrackInfo(audio, index);
        });

        const listItem = document.createElement('div');
        listItem.classList.add('folder');
        listItem.appendChild(fileLink);
        explorer.appendChild(listItem);
    });
}

// Update track information
function updateTrackInfo(audio, index) {
    const trackInfo = document.getElementById('trackInfo');
    const currentTrack = audio._src[index];
    trackInfo.textContent = `Now Playing: ${currentTrack}`;
}

// ... Your existing code ...
