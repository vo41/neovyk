// modal.js
document.addEventListener('DOMContentLoaded', function () {
    const openButton = document.getElementById('openPlayerModal');
    const modal = document.getElementById('playerModal');
    const closeButton = document.getElementById('closePlayerModal');
    const playerContent = document.getElementById('playerContent');

    openButton.addEventListener('click', function () {
        modal.style.display = 'block';
        loadPlayerContent();
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    function loadPlayerContent() {
        fetch('player.html')
            .then(response => response.text())
            .then(data => {
                playerContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading player content:', error));
    }
});
