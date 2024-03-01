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
    searchBar.style.display = pageId === 'archive' ? 'block' : 'none';
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

document.addEventListener('DOMContentLoaded', function () {
    const openButton = document.getElementById('openPlayerModal');
    const modal = document.getElementById('playerModal');
    const closeButton = document.getElementById('closePlayerModal');
    const playerContent = document.getElementById('playerContent');

    openButton.addEventListener('click', function () {
        modal.style.display = 'block';
        // Load the content of player.html into the modal
        loadPlayerContent();
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    function loadPlayerContent() {
        // Use fetch or another method to load the content of player.html
        fetch('player.html')
            .then(response => response.text())
            .then(data => {
                playerContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading player content:', error));
    }
});
