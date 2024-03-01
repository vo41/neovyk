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

// Add click event listeners to each menu item
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', (event) => {
        // Get the contentId from the data-window attribute
        const contentId = menuItem.getAttribute('data-window');

        // Open the window for the specified content
        openWindow(contentId);
    });
});

// Initialize the audio player
function initializeAudioPlayer() {
    const audio = new Howl({
        src: ['audio/01. Arrival.mp3', 'audio/02. Worlds Away.mp3'], // Add more paths as needed
        html5: true, // Use HTML5 audio
        volume: 0.5, // Set initial volume
        onplay: () => startVisualizer(),
        onpause: () => stopVisualizer(),
        onstop: () => stopVisualizer(),
        onend: () => stopVisualizer(),
    });

    // Play/Pause button
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.addEventListener('click', () => {
        audio.playing() ? audio.pause() : audio.play();
    });

    // Stop button
    const stopBtn = document.getElementById('stopBtn');
    stopBtn.addEventListener('click', () => {
        audio.stop();
    });

    // Explorer (list of audio files)
    const explorer = document.getElementById('explorer');
    explorer.innerHTML = ''; // Clear previous entries

    audio._src.forEach((src, index) => {
        const fileLink = document.createElement('a');
        fileLink.href = '#';
        fileLink.textContent = `Track ${index + 1}`;
        fileLink.addEventListener('click', () => {
            audio.stop();
            audio.play(index);
        });

        const listItem = document.createElement('div');
        listItem.classList.add('folder');
        listItem.appendChild(fileLink);
        explorer.appendChild(listItem);
    });
}

// Stop the audio player
function stopAudioPlayer() {
    const audio = Howler._howls[0]; // Corrected from Howl._howls[0]
    if (audio) {
        audio.stop();
        stopVisualizer();
    }
}

// Visualizer setup
const visualizer = document.getElementById('visualizer');

function startVisualizer() {
    // You can customize the visualizer further based on your needs
    visualizer.innerHTML = ''; // Clear previous visualizer content

    const barCount = 20;
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        visualizer.appendChild(bar);
    }
}

function stopVisualizer() {
    visualizer.innerHTML = ''; // Clear the visualizer when playback stops
}

