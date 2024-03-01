// scripts/modal.js
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('playerModal');
    const draggableArea = document.querySelector('.draggable-area');
    let isDragging = false;
    let offsetX, offsetY;

    draggableArea.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            modal.style.left = e.clientX - offsetX + 'px';
            modal.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    const openButton = document.getElementById('openPlayerModal');
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

// Function to close the player modal
function closePlayerModal() {
    document.getElementById('playerModal').style.display = 'none';
}
