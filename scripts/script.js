// Global variables
let currentIndex = 0;
const audioFiles = [
    '01. Arrival.mp3', '02. Worlds Away.mp3', '03. Explore.mp3',
    '04. Zero Gravity.mp3', '05. Exo.mp3', '06. Delta.mp3',
    '07. Oracle.mp3', '08. Aeon.mp3', '09. Pathfinder.mp3', '10. Wandering.mp3'
];

// Create an audio element
const audio = new Audio();
audio.src = '';

// Set up the file explorer
setupExplorer(audio);

// Add click event listeners to menu items
const menuItems = document.querySelectorAll('.windows95 a');
const subPages = document.querySelectorAll('.sub-page');

menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        const contentId = menuItem.getAttribute('data-window');
        openWindow(contentId);
    });
});

// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.add('active');

    if (contentId === 'player') {
        initializeMp3Player();
    }

    contentWindow.style.zIndex = Date.now();
}

// Function to close a window
function closeWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.remove('active');

    if (contentId === 'player') {
        stopAudioPlayer();
    }
}

// Function to initialize the MP3 player
function initializeMp3Player() {
    // Create an audio context after a user gesture
    document.addEventListener('click', () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Set up the visualizer
        setupVisualizer(audio);

        // Example: Play/Pause button functionality
        const playPauseButton = document.getElementById('playPauseBtn');
        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                playNextTrack();
            } else {
                togglePlayPause();
            }
        });

        // Example: Previous button functionality
        const prevButton = document.getElementById('prevBtn');
        prevButton.addEventListener('click', () => {
            playPreviousTrack();
        });

        // Example: Next button functionality
        const nextButton = document.getElementById('nextBtn');
        nextButton.addEventListener('click', () => {
            playNextTrack();
        });

        // Stop button functionality
        const stopButton = document.getElementById('stopBtn');
        stopButton.addEventListener('click', () => {
            stopAudioPlayer();
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

        // Example: Close button functionality
        const closeButton = document.querySelector('#player .close-button');
        closeButton.addEventListener('click', () => {
            stopAudioPlayer();
        });
    }, { once: true });
}

// Function to play the previous track
function playPreviousTrack() {
    currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    playCurrentTrack();
}

// Function to play the next track
function playNextTrack() {
    currentIndex = (currentIndex + 1) % audioFiles.length;
    playCurrentTrack();
}

// Function to play the current track
function playCurrentTrack() {
    audio.src = `audio/${audioFiles[currentIndex]}`;
    audio.play();
}

// Function to toggle play/pause
function togglePlayPause() {
    if (audio.paused) {
        playCurrentTrack();
    } else {
        audio.pause();
    }
}

// Function to stop the audio player
function stopAudioPlayer() {
    audio.pause();
    audio.currentTime = 0;
    const playPauseButton = document.getElementById('playPauseBtn');
    playPauseButton.textContent = 'Play';
}

// Function to set up the file explorer
function setupExplorer() {
    const explorer = document.getElementById('explorer');
    explorer.innerHTML = '';

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

// Function to set up the visualizer
function setupVisualizer(audio) {
    const visualizerCanvas = document.getElementById('visualizerCanvas');
    const visualizerCtx = visualizerCanvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    function drawVisualizer() {
        analyser.getByteFrequencyData(dataArray);

        visualizerCtx.fillStyle = 'rgba(26, 26, 26, 0.1)';
        visualizerCtx.fillRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;

            const hue = i * 2;
            visualizerCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        requestAnimationFrame(drawVisualizer);
    }

    // Resize the visualizer canvas when the window is resized
    window.addEventListener('resize', () => {
        visualizerCanvas.width = visualizerCanvas.clientWidth;
        visualizerCanvas.height = visualizerCanvas.clientHeight;
    });

    drawVisualizer();
}

// Function to update audio preview
function setupAudioPreview() {
    const audioPreview = document.getElementById('audioPreview');

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

// Call the functions
initializeMp3Player();
setupVisualization();
setupAudioPreview();
