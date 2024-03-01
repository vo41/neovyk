// Function to show/hide the selected sub-page
function toggleSubPage(pageId) {
    // Hide all sub-pages
    var subPages = document.querySelectorAll('.sub-page');
    subPages.forEach(function (page) {
        if (page.id === pageId) {
            // Toggle the visibility of the selected sub-page
            page.classList.toggle('active');
        } else {
            // Explicitly hide other sub-pages
            page.classList.remove('active');
        }
    });

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
            toggleSubPage(pageId);
        });
    });
});
