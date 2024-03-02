// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.add('active');

    // If the content is an audio player, initialize it
    if (contentId === 'player') {
        initializeMp3Player();
    }

    // Bring the opened window to the front
    contentWindow.style.zIndex = Date.now();
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

// Function to initialize the MP3 player
function initializeMp3Player() {
    // Check if the MP3 player is already initialized
    if (window.mp3PlayerInitialized) {
        return;
    }

    // Your MP3 player initialization code goes here

    // For example, create an audio element
    const audio = new Audio();
    audio.src = 'audio/01. Arrival.mp3';

    // Set up the file explorer
    setupExplorer(audio);

    // Set up the audio visualization
    setupVisualization(audio);

    // Set a flag to indicate that the MP3 player is initialized
    window.mp3PlayerInitialized = true;
}

// Function to stop the audio player
function stopAudioPlayer() {
    // Your audio player stop code goes here
}

// Function to set up the file explorer
function setupExplorer(audio) {
    const explorer = document.getElementById('explorer');
    explorer.innerHTML = '';

    // Your code to populate the explorer with files from the 'audio' folder
    // Example: List all audio files in the 'audio' folder
    const audioFiles = ['01. Arrival.mp3', '02. Worlds Away.mp3'];

    audioFiles.forEach((file) => {
        const link = document.createElement('a');
        link.href = `audio/${file}`;
        link.textContent = file;
        link.onclick = (event) => {
            event.preventDefault();
            audio.src = link.href;
            audio.play();
        };

        explorer.appendChild(link);
    });
}

// Function to set up the audio visualization
function setupVisualization(audio) {
    // Your code for audio visualization goes here
    // Example: Create a visualizer element
    const visualizer = document.getElementById('visualizer');
    // Your visualization code...
}

// Make the sub-pages draggable
$(function () {
    $(".sub-page").draggable();
});

// Call the function to initialize the MP3 player
initializeMp3Player();
