// mp3player.js
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('closeMp3Player').addEventListener('click', function () {
        document.getElementById('mp3PlayerWindow').style.display = 'none';
    });

    // You can add more logic for handling audio files and playlist here
    // For simplicity, I'm providing a basic example
    const playlistContainer = document.getElementById('playlist');
    const audioFiles = [
        'audio/song1.mp3',
        'audio/song2.mp3',
        // Add more audio files as needed
    ];

    audioFiles.forEach(function (file) {
        const audioElement = document.createElement('a');
        audioElement.href = file;
        audioElement.textContent = file.substring(file.lastIndexOf('/') + 1);
        playlistContainer.appendChild(audioElement);
    });
});
