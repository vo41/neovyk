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

    // Create an audio element
    const audio = new Audio();
    audio.src = 'audio/01. Arrival.mp3';

    // Set up the file explorer
    setupExplorer(audio);

    // Set up the audio visualization
    setupVisualization(audio);

    // Set a flag to indicate that the MP3 player is initialized
    window.mp3PlayerInitialized = true;

    // Example: Play/Pause button functionality
    const playPauseButton = document.getElementById('playPauseBtn');
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
       }
    });
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
    const audioFiles = ['01. Arrival.mp3', '02. Worlds Away.mp3', '03. Explore.mp3', '04. Zero Gravity.mp3', '05. Exo.mp3', '06. Delta.mp3', '07. Oracle.mp3', '08. Aeon.mp3', '09. Pathfinder.mp3', '10. Wandering.mp3'];

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
    const visualizer = document.getElementById('visualizer');

    const context = new AudioContext();
    const src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = document.createElement('canvas');
    visualizer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            ctx.fillStyle = 'rgb(50, 205, 50)';
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Audio preview div
    const audioPreview = document.getElementById('audioPreview');

    // Update audio preview on timeupdate
    audio.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration);
        audioPreview.textContent = `${currentTime} / ${duration}`;
    });

    // Function to format time (convert seconds to mm:ss format)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
    }
}

// Make the sub-pages draggable
$(function () {
    $(".sub-page").draggable();
});

// Call the function to initialize the MP3 player
initializeMp3Player();
