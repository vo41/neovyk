// player.js
document.addEventListener('DOMContentLoaded', function () {
    var playerContent = document.getElementById('playerContent');
    playerContent.innerHTML = `
        <audio controls>
            <source src="audio/song1.mp3" type="audio/mp3">
            <!-- Add sources for all your songs -->
            Your browser does not support the audio tag.
        </audio>
    `;
});
