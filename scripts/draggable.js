// Add this to your script.js or a new draggable.js file
var modal = document.getElementById('playerModal');
var isDragging = false;
var offsetX, offsetY;

modal.addEventListener('mousedown', function (event) {
    isDragging = true;
    offsetX = event.clientX - modal.getBoundingClientRect().left;
    offsetY = event.clientY - modal.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        modal.style.left = event.clientX - offsetX + 'px';
        modal.style.top = event.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});
