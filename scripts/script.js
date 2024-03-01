document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('nav a');
    
    // Function to toggle the visibility of a sub-page
    function toggleSubPage(pageId) {
        var selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.toggle('active');
        }
    }

    // Function to handle menu clicks
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var pageId = link.getAttribute('href').substring(1);
            toggleSubPage(pageId);
        });
    });
});
