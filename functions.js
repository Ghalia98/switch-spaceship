const game = new Game()
let font;
let mode;
let stage = 0
let instructionsFont;
let backgroundSound;
let switchColorSound;
let shieldSound;
let highestScore = 0;

// stage 0 = splash screen
// stage 1 = game screen
// stage 2 = lose screen

function setup() {

    createCanvas(550, 700)
    game.setup();
    font = loadFont('assets/tarrget-font/Tarrget3DItalic-LdKg.otf')
    instructionsFont = loadFont('assets/Source_Sans_Pro/SourceSansPro-ExtraLight.ttf')


}
function preload() {
    game.preload()
    soundFormats('mp3', 'ogg');
    backgroundSound = loadSound('assets/Sound/boss.ogg')
    switchColorSound = loadSound('assets/Sound/sci_fi_door-6451 (mp3cut.net).mp3')
    shieldSound = loadSound('assets/Sound/lightsaber-1-14787 (mp3cut.net).mp3')
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
    match the sphere color!`, width / 2, 380)
    text(`Press S key to activate shield & protect the spaceship 
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
    stroke('orange')
    fill('white')
    textSize(25)
    textFont(instructionsFont);
    text("Score: " + score, 70, 40)

    if (game.isOver) {
        stage = 2
        noLoop()
    }
}



// Gameover Screen
function loseMode() {

    // appearance
    clear();
    game.draw()
    textSize(40)
    stroke('yellow')
    fill('blue')
    textAlign(CENTER, CENTER)
    textFont(font)
    text('GAME OVER', width / 2, 200)
    textAlign(CENTER, CENTER);
    stroke('yellow')
    fill('blue')

    textSize(40)
    stroke('orange')
    fill('white')
    textFont(instructionsFont);
    text("Your Score:", width / 2, 300)
    textSize(40)
    fill('white')
    stroke('orange')
    text(score, width / 2, 360)
    backgroundSound.stop()

}

function keyPressed() {
    if (keyCode === 32) {
        game.spaceship.isBlue = !game.spaceship.isBlue
        game.spaceship.isExtracted = true
        game.beam.isBeamOn = true;
        setTimeout(() => {
            game.beam.isBeamOn = false;
        }, 250)


    }
    if (keyIsDown(83)) {
        game.spaceship.isShieldOn = true;
        setTimeout(() => {
            game.spaceship.isShieldOn = false
        }, 1000)
    }
    if (keyCode === 13) {
        stage = 1;

        // To prevent background music from starting again when pressing the enter key after the first time
        if (!game.background.isMusicOn) {
            backgroundSound.setVolume(0.15)
            backgroundSound.play()
            game.background.isMusicOn = true
        }
    }

    if (keyCode === 32 && stage == 1) {
        switchColorSound.setVolume(0.15)
        switchColorSound.play()
    }
    if (keyIsDown(83) && stage == 1) {
        shieldSound.setVolume(0.2)
        shieldSound.play()
    }

}
