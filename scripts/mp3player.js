// script.js or mp3player.js
function loadPlayerContent() {
    fetch('mp3player.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('playerContent').innerHTML = data;
        })
        .catch(error => console.error('Error loading player content:', error));
}
