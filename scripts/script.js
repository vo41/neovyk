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
        togglePlayPause(audio, playPauseButton);
    });

    // Example: Previous button functionality
    const prevButton = document.getElementById('prevBtn');
    prevButton.addEventListener('click', () => {
        playPreviousTrack(audio);
    });

    // Example: Next button functionality
    const nextButton = document.getElementById('nextBtn');
    nextButton.addEventListener('click', () => {
        playNextTrack(audio);
    });

    // Stop button functionality
    const stopButton = document.getElementById('stopBtn');
    stopButton.addEventListener('click', () => {
        stopAudioPlayer(audio, playPauseButton);
    });

    // Volume control
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
    });

    // Time slider
    const timeSlider = document.getElementById('timeSlider');
    timeSlider.max = audio.duration;
    timeSlider.addEventListener('input', () => {
        audio.currentTime = timeSlider.value;
    });

    // Update time slider on timeupdate
    audio.addEventListener('timeupdate', () => {
        timeSlider.value = audio.currentTime;
    });

    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('visualizerCanvas');
        canvas.width = visualizer.clientWidth;
        canvas.height = visualizer.clientHeight;
    });

    drawVisualizer(audio);

    // Set up audio preview
    setupAudioPreview(audio);
}

// Function to stop the audio player
function stopAudioPlayer(audio, playPauseButton) {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.textContent = 'Play';
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

    const canvas = document.createElement('canvas');
    canvas.id = 'visualizerCanvas';
    visualizer.appendChild(canvas);

    const context = new AudioContext();
    const src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        analyser.getByteFrequencyData(dataArray);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        requestAnimationFrame(draw);
    }

    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
        canvas.width = visualizer.clientWidth;
        canvas.height = visualizer.clientHeight;
    });

    draw();
}

// Function to play or pause the audio
function togglePlayPause(audio, playPauseButton) {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Function to play the previous track
function playPreviousTrack(audio) {
    // Your logic to handle playing the previous track
    // ...
}

// Function to play the next track
function playNextTrack(audio) {
    // Your logic to handle playing the next track
    // ...
}

// Set up audio preview
function setupAudioPreview(audio) {
    const audioPreview = document.getElementById('audioPreview');

    // Update audio preview on timeupdate
    audio.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration);
        audioPreview.textContent = `${currentTime} / ${duration}`;
    });
}

// Function to format time (convert seconds to mm:ss format)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
}

// Make the sub-pages draggable
$(function () {
    $(".sub-page").draggable();
});

// Call the function to initialize the MP3 player
initializeMp3Player();
