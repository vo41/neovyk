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
document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);
            showSubPage(pageId);
        });
    });
});

// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Call openPlayerModal when the page loads
    openPlayerModal();

    var menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);
            showSubPage(pageId);
        });
    });
});

function openPlayerModal() {
    var playerModal = document.getElementById('playerModal');
    if (playerModal) {
        playerModal.style.display = 'block';
        loadPlayerContent();
    }
}
