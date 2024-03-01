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

function closePlayerModal() {
    var playerModal = document.getElementById('playerModal');
    if (playerModal) {
        playerModal.style.display = 'none';
    }
}

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
    }

    // Ensure the search bar remains visible only for the Archives section
    var searchBar = document.querySelector('.search-bar');
    searchBar.style.display = pageId === 'archives' ? 'block' : 'none';
}
