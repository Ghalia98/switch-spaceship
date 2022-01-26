const game = new Game()
let timer = 2
let font;
let mode;
let stage = 0

// stage 0 = splash screen
//  stage 1 = game screen
// stage 2 = lose screen
function setup() {

    createCanvas(550, windowHeight)
    game.setup();
    // setInterval(game.shield.draw(), 2000)
    font = loadFont('assets/tarrget-font/TarrgetGradientItalic-zzjG.otf')

}
function preload() {
    game.preload()
}
function draw() {
    if (stage == 0) {
        splashMode();
    }
    if (stage == 1) {
        gameMode();
    }
    if (stage == 2) {
        loseMode();
    }
}
function splashMode() {
    game.background.draw()
    // background(0)
    stroke('yellow')
    noFill()
    strokeWeight(1.5)
    rect(width / 2 - 200, height / 2 - 200, 400, 400)
    noStroke()

}
function gameMode() {
    clear();
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
    text("Score: " + score, 130, 40)

}
function loseMode() {

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
    if (keyCode === 32) {
        stage = 1
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

// Splash Screen
