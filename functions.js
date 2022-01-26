const game = new Game()
function setup() {
    createCanvas(550, 700)
}
function preload() {
    game.preload()
}

function draw() {
    game.draw()

}

function keyPressed() {
    if (keyCode === 32) {
        // console.log('hi')
        game.spaceship.isBlue = !game.spaceship.isBlue
        game.spaceship.isExtracted = true
    }

}

// function keyReleased() {
//     if (keyCode === 83)
//         loop()
// }