// script.js

function closeWindow(windowId) {
    const subPage = document.getElementById(windowId);
    subPage.classList.remove('active');
}

// Get all the menu items and corresponding sub-pages
const menuItems = document.querySelectorAll('.windows95 a');
const subPages = document.querySelectorAll('.sub-page');

// Add click event listeners to each menu item
menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        // Remove 'active' class from all sub-pages
        subPages.forEach((subPage) => {
            subPage.classList.remove('active');
        });

        // Add 'active' class to the selected sub-page
        subPages[index].classList.add('active');

        // Open the link in the current tab
        window.location.href = menuItem.href;
    });
});
// script.js

// Function to open a window for the specified content
function openWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.add('active');
}

// Function to close a window
function closeWindow(contentId) {
    const contentWindow = document.getElementById(contentId);
    contentWindow.classList.remove('active');
}

// Get all the menu items and corresponding sub-pages
const menuItems = document.querySelectorAll('.windows95 a');

// Add click event listeners to each menu item
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', (event) => {
        // Get the contentId from the data-window attribute
        const contentId = menuItem.getAttribute('data-window');

        // Open the window for the specified content
        openWindow(contentId);
    });
});
