const game = new Game()
let timer = 2
let font;
let mode;
let stage = 0
let instructionsFont;
let backgroundSound

// stage 0 = splash screen
//  stage 1 = game screen
// stage 2 = lose screen
function setup() {

    createCanvas(550, 700)
    game.setup();
    // setInterval(game.shield.draw(), 2000)
    font = loadFont('assets/tarrget-font/Tarrget3DItalic-LdKg.otf')
    instructionsFont = loadFont('assets/Source_Sans_Pro/SourceSansPro-ExtraLight.ttf')

}
function preload() {
    game.preload()
    soundFormats('mp3', 'ogg');
    backgroundSound = loadSound('assets/Sound/boss.ogg')
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

// Splash screen
function splashMode() {
    // appearance
    game.background.draw()
    stroke('white')
    noFill()
    strokeWeight(1)
    // rect(width / 2 - 200, height / 2 - 200, 400, 400)
    line(width / 5, 310, width - width / 5, 310)
    line(width / 5, 475, width - width / 5, 475)


    //game title
    textSize(35)
    stroke('yellow')
    fill('blue')
    textAlign(CENTER, CENTER)
    textFont(font)
    text('SPACE SWITCH', width / 2, 200)

    // instructions
    stroke('white')
    fill('orange')
    textSize(20)
    textAlign(CENTER, CENTER)
    textFont(instructionsFont)
    text(`Instructions:`, width / 2, 330)
    textSize(15)
    text(`Press Spacebar to switch the spaceship color to 
    match with the sphere color!`, width / 2, 380)
    text(`Press S to activate shield & protect the spaceship 
    from collision with the UFO!`, width / 2, 435)
    textSize(25)
    fill('white')
    stroke('#89cff0')
    text(`Press Enter to start the game`, width / 2, 570)
}


// Game screen
function gameMode() {
    clear();
    game.draw()

    textAlign(CENTER, CENTER);
    // textSize(50)
    stroke('orange')
    // textSize(50)
    // stroke('yellow')
    fill('white')
    textSize(25)
    textFont(instructionsFont);
    text("Score: " + score, 70, 40)

    if (game.isOver) {
        // game.explosion.draw()
        stage = 2
        noLoop()
    }



}

// Gameover Screen
function loseMode() { // appearance
    clear();
    game.draw()
    textSize(40)
    stroke('yellow')
    fill('blue')
    textAlign(CENTER, CENTER)
    textFont(font)
    text('GAME OVER', width / 2, 200)
    textAlign(CENTER, CENTER);
    // textSize(50)
    stroke('yellow')
    fill('blue')
    // textSize(50)
    // stroke('yellow')

    textSize(40)
    stroke('orange')
    fill('white')
    textFont(instructionsFont);
    text("Your Score:", width / 2, 300)
    textSize(40)
    fill('white')
    stroke('orange')
    text(score, width / 2, 360)


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
    if (keyCode === 13) {
        stage = 1
        backgroundSound.play()
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
