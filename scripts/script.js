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
    var menuLinks = document.querySelectorAll('.windows95 a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);
            showSubPage(pageId);
        });
    });
});
