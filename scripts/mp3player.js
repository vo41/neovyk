// scripts/mp3player.js
function closeMp3Player() {
    var playerContainer = document.querySelector('.mp3-player-container');
    if (playerContainer) {
        playerContainer.style.display = 'none';
    }
}
