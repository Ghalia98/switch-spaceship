const game = new Game()
let timer = 2
let font;


function setup() {
    createCanvas(550, 700)
    game.setup();
    // setInterval(game.shield.draw(), 2000)
    font = loadFont('assets/tarrget-font/TarrgetGradientItalic-zzjG.otf')
}
function preload() {
    game.preload()
}
function draw() {
    game.draw()
    text(timer, width / 2, height / 2)
    textAlign(CENTER, CENTER);
    textSize(50)
    stroke('white')
    textSize(50)
    // stroke('yellow')
    fill('white')
    textSize(35)
    textFont(font);
    text("Score: " + score, 110, 40)
}
function keyPressed() {
    if (keyCode === 32) {
        // console.log('hi')
        game.spaceship.isBlue = !game.spaceship.isBlue
        game.spaceship.isExtracted = true
    }
    if (keyIsDown(83)) {
        // setInterval
        game.spaceship.isShieldOn = true;
        setTimeout(() => {
            game.spaceship.isShieldOn = false
        }, 1000)
    }
}
// function deactivateShield() {
//     if (keyIsDown(83)) {
//         game.spaceship.isShieldOn = false;
//     }
// }
// function keyReleased() {
//     if (keyCode === 83)
//         loop()
// }
function timeIt() {
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
    if (timer == 0) {
        game.spaceship.isShieldOn = false;
    }
}