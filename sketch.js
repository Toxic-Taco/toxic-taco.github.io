let img;
let colors = []; // Wird in setup() mit zufälligen Farben gefüllt

function preload() {
  img = loadImage('input_1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.addEventListener('resize', function() {
    resizeCanvas(windowWidth, windowHeight);
  });

  noLoop();

  // Generiere 3 zufällige Farben beim Laden der Seite
  for (let i = 0; i < 3; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(0);

  // Berechne die Position, um das Bild in der Mitte der Canvas zu zentrieren
  let centerX = (width - img.width) / 2;
  let centerY = (height - img.height) / 2;

  img.loadPixels();

  // Verschiebungsfaktor basierend auf Mausposition (X-Achse)
  let shiftFactor = map(mouseX, 0, width, 0, 30);

  for (let y = 0; y < img.height; y += 3) {
    for (let x = 0; x < img.width; x += 3) {
      let index = (x + y * img.width) * 4;

      // Prüfe, ob der Pixel schwarz ist
      if (img.pixels[index] === 0 && img.pixels[index + 1] === 0 && img.pixels[index + 2] === 0) {
        // Wähle eine zufällige Farbe aus den 3 generierten Farben
        let col = random(colors);

        // Berechne Richtung zur Maus (relativ zur zentrierten Bildposition)
        let angle = atan2(mouseY - (y + centerY), mouseX - (x + centerX));

        // Berechne Verschiebung (100px + shiftFactor in Richtung Cursor)
        let shiftX = cos(angle) * (100 + shiftFactor);
        let shiftY = sin(angle) * (100 + shiftFactor);

        // Zeichne den Punkt an der verschobenen Position (zentriert)
        fill(col);
        noStroke();
        ellipse(x + centerX + shiftX, y + centerY + shiftY, 2, 2); // Punktgröße: 2px
      }
    }
  }
}

// Aktualisiere bei Mausbewegung
function mouseMoved() {
  redraw();
}