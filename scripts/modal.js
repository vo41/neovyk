document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('playerModal');
    const playerContent = document.getElementById('playerContent');

    modal.style.display = 'block'; // This line should be present to display the modal by default
    loadPlayerContent();

    function loadPlayerContent() {
        fetch('player.html')
            .then(response => response.text())
            .then(data => {
                playerContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading player content:', error));
    }
});
