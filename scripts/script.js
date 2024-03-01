// script.js
document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('nav a');
    var playerModal = document.getElementById('playerModal');
    var isDragging = false;
    var offsetX, offsetY;

    // Function to show the selected sub-page
    function showSubPage(pageId) {
        // Hide all sub-pages
        var subPages = document.querySelectorAll('.sub-page');
        subPages.forEach(function (page) {
            page.classList.remove('active');
        });

        // Show the selected sub-page
        var selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');

            // Check if it's the MP3 Player page, then open the modal
            if (pageId === 'player') {
                openPlayerModal();
            }
        }

        // Ensure the search bar remains visible only for the Archives section
        var searchBar = document.querySelector('.search-bar');
        searchBar.style.display = pageId === 'archives' ? 'block' : 'none';
    }

    // Function to handle menu clicks
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
    playerModal.addEventListener('mousedown', function (event) {
        isDragging = true;
        offsetX = event.clientX - playerModal.getBoundingClientRect().left;
        offsetY = event.clientY - playerModal.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (event) {
        if (isDragging) {
            playerModal.style.left = event.clientX - offsetX + 'px';
            playerModal.style.top = event.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // Close modal when the close button is clicked
    var closeButton = document.getElementById('closePlayerModal');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            playerModal.style.display = 'none';
        });
    }

    // Function to open the MP3 Player modal
    function openPlayerModal() {
        playerModal.style.display = 'block';
        loadPlayerContent();
    }

    // Function to load content into the MP3 Player modal
    function loadPlayerContent() {
        // Implement this function based on your requirements
    }
});

