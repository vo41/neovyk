let song;
let fft;

function preload() {
  song = loadSound('audio/01. Arrival.mp3'); // Replace with the path to your audio file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  song.play();
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
