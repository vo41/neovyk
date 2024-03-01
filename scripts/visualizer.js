// visualizer.js
let audio;
let fft;

function preload() {
  // Load your audio files here
  audio = loadSound('path/to/your/audio.mp3');
}

function setup() {
  createCanvas(400, 200);
  fft = new p5.FFT();
  audio.play(); // Autoplay when the page loads
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  noStroke();
  fill(255);

  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

function togglePlay() {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
}

function previous() {
  // Add logic to play the previous track
}

function next() {
  // Add logic to play the next track
}

  function loadPlayerContent() {
  // Assuming you have an array of song filenames
  const songList = ['01. Arrival.mp3', '02. Worlds Away.mp3'];
  const currentSongIndex = 0; // Set the initial song index

  audio = loadSound(`path/to/your/audio/${songList[currentSongIndex]}`);
  document.querySelector('.album-art img').src = `path/to/your/images/${songList[currentSongIndex].replace('.mp3', '.jpg')}`;
