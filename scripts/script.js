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
    // Create an audio element
    const audio = new Audio();
    audio.src = '';

    // Set up the file explorer
    setupExplorer(audio);

    // Set a flag to indicate that the MP3 player is initialized
    window.mp3PlayerInitialized = true;

    // Example: Play/Pause button functionality
const playPauseButton = document.getElementById('playPauseBtn');
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        playNextTrack(audio);
    } else {
        togglePlayPause(audio, playPauseButton);
    }
});

// Function to toggle play/pause
function togglePlayPause(audio, button) {
    if (audio.paused) {
        audio.play();
        button.textContent = 'Pause';
    } else {
        audio.pause();
        button.textContent = 'Play';
    }
}

    // Example: Previous button functionality
    const prevButton = document.getElementById('prevBtn');
    prevButton.addEventListener('click', () => {
        playPreviousTrack(audio);
    });

    // Function to play the previous track
    function playPreviousTrack(audio) {
    // Your logic to handle playing the previous track
    // ...

    // For example, if you have an array of audio files
    // and a current index, decrement the index to play the previous track
    currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    audio.src = `audio/${audioFiles[currentIndex]}`;
    audio.play();
}

    // Example: Next button functionality
    const nextButton = document.getElementById('nextBtn');
    nextButton.addEventListener('click', () => {
        playNextTrack(audio);
    });

    // Function to play the next track
    function playNextTrack(audio) {
    // Your logic to handle playing the next track
    // ...

    // For example, if you have an array of audio files
    // and a current index, increment the index to play the next track
    currentIndex = (currentIndex + 1) % audioFiles.length;
    audio.src = `audio/${audioFiles[currentIndex]}`;
    audio.play();
}

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

    // Example: Close button functionality
    const closeButton = document.querySelector('#player .close-button');
    closeButton.addEventListener('click', () => {
    stopAudioPlayer(audio, playPauseButton);
    });

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

// Function to create a complex visualizer
function setupVisualization(audio) {
    const visualizer = document.getElementById('visualizer');

    const canvas = document.createElement('canvas');
    canvas.id = 'visualizerCanvas';
    visualizer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const waveformCanvas = document.createElement('canvas');
    waveformCanvas.id = 'waveformCanvas';
    visualizer.appendChild(waveformCanvas);

    const waveformCtx = waveformCanvas.getContext('2d');
    const bufferLengthWaveform = analyser.fftSize;
    const dataArrayWaveform = new Uint8Array(bufferLengthWaveform);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function draw() {
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;

            const hue = i * 2;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        analyser.getByteTimeDomainData(dataArrayWaveform);

        waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
        waveformCtx.beginPath();
        waveformCtx.lineWidth = 2;
        waveformCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        waveformCtx.moveTo(0, (dataArrayWaveform[0] / 128) * (waveformCanvas.height / 2));

        const sliceWidth = (waveformCanvas.width * 1.0) / bufferLengthWaveform;
        for (let i = 0; i < bufferLengthWaveform; i++) {
            const x = (i / bufferLengthWaveform) * waveformCanvas.width;
            const y = (dataArrayWaveform[i] / 128) * (waveformCanvas.height / 2);

            waveformCtx.lineTo(x, y);
        }

        waveformCtx.lineTo(waveformCanvas.width, waveformCanvas.height / 2);
        waveformCtx.stroke();

        requestAnimationFrame(draw);
    }

    // Resize the canvases when the window is resized
    window.addEventListener('resize', () => {
        canvas.width = visualizer.clientWidth;
        canvas.height = visualizer.clientHeight;
        waveformCanvas.width = visualizer.clientWidth;
        waveformCanvas.height = visualizer.clientHeight;
    });

    draw();
}

// Call the function to create the complex visualizer
setupVisualization(audio);

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
