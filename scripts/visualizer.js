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
}

