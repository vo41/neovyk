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

function openPlayerModal() {
    var playerModal = document.getElementById('playerModal');
    if (playerModal) {
        playerModal.style.display = 'block';
        loadPlayerContent();  // Assuming you have a function to load content in your modal
    }
}

// Function to load content into the MP3 Player modal
function loadPlayerContent() {
    var playerContent = document.getElementById('playerContent');
    
    // Clear any existing content
    playerContent.innerHTML = '';

    // Create an audio element for each MP3 file
    var audioFiles = [
        'audio/01. Arrival.mp3',
        'audio/02. Worlds Away.mp3',
        // Add paths for all your songs
    ];

    audioFiles.forEach(function (audioPath) {
        var audioElement = document.createElement('audio');
        audioElement.src = audioPath;
        audioElement.controls = true;

        playerContent.appendChild(audioElement);
    });
}
