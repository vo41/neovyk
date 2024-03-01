// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Call openPlayerModal when the page loads
    openPlayerModal();

    var menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);

            if (pageId === 'player') {
                openPlayerModal(); // Open player if "MP3 Player" is clicked
            } else {
                showSubPage(pageId);
            }
        });
    });

    // Add draggable functionality to the modal
    var modal = document.getElementById('playerModal');
    var isDragging = false;
    var offsetX, offsetY;

    modal.addEventListener('mousedown', function (event) {
        isDragging = true;
        offsetX = event.clientX - modal.getBoundingClientRect().left;
        offsetY = event.clientY - modal.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (event) {
        if (isDragging) {
            modal.style.left = event.clientX - offsetX + 'px';
            modal.style.top = event.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
});

function openPlayerModal() {
    var playerModal = document.getElementById('playerModal');
    if (playerModal) {
        playerModal.style.display = 'block';
        loadPlayerContent();
    }
}
