const game = new Game()
let timer = 2
function setup() {
    createCanvas(550, 700)
    game.setup();
    // setInterval(game.shield.draw(), 2000)
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

}

function keyPressed() {
    if (keyCode === 32) {
        // console.log('hi')
        game.spaceship.isBlue = !game.spaceship.isBlue
        game.spaceship.isExtracted = true

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