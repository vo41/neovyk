<!-- jQuery UI script for window dragging -->
<script>
    $(function () {
        $(".sub-page").draggable();
    });
</script>

<script>
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
    setupExplorer();

    // Add click event listeners to menu items
    const menuItems = document.querySelectorAll('.windows95 a');

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

    // Event listeners for window clicks
    document.querySelectorAll('.sub-page').forEach(window => {
        window.addEventListener('mousedown', function () {
            // Bring the clicked window to the front
            bringWindowToFront(window.id);
        });
    });

    // Function to bring a window to the front
function bringWindowToFront(windowId) {
    // Get all windows
    var windows = document.querySelectorAll('.sub-page');

    // Set z-index of all windows to 1
    windows.forEach(window => {
        window.style.zIndex = 1;
    });

    // Set z-index of the clicked window to a higher value to bring it to the front
    document.getElementById(windowId).style.zIndex = Date.now();
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
            // Check if audio context is already created
            if (!audio.context) {
                audio.context = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audio.context.createAnalyser();
                const source = audio.context.createMediaElementSource(audio);

                source.connect(analyser);
                analyser.connect(audio.context.destination);

                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                // Set up the visualizer
                setupVisualizer(analyser, dataArray);
            }
        }, { once: true });

        // Example: Play/Pause button functionality
        const playPauseButton = document.getElementById('playPauseBtn');
        playPauseButton.addEventListener('click', () => {
            if (audio.paused || audio.ended) {
                playCurrentTrack();
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
                openMp3Player(file);
            };

            explorer.appendChild(link);
        });
    }

    // Function to set up the visualizer
    function setupVisualizer(analyser, dataArray) {
        const visualizerCanvas = document.getElementById('visualizerCanvas');
        const visualizerCtx = visualizerCanvas.getContext('2d');

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;

        visualizerCanvas.width = visualizerCanvas.clientWidth;
        visualizerCanvas.height = visualizerCanvas.clientHeight;

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
                visualizerCtx.fillStyle = `hsl(${hue}, 100%,
            });

            drawVisualizer();
        }

        // Call the function to initialize the MP3 player
        initializeMp3Player();
    </script>
