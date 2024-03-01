// Function to toggle the visibility of the selected sub-page
function toggleSubPage(pageId) {
    var selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.toggle('active');
    }

    // Ensure the search bar remains visible only for the Archives section
    var searchBar = document.querySelector('.search-bar');
    searchBar.style.display = pageId === 'archives' && selectedPage.classList.contains('active') ? 'block' : 'none';
}

// Function to handle menu clicks
document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);
            toggleSubPage(pageId);
        });
    });
});
