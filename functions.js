const game = new Game()
function setup() {
    createCanvas(550, windowHeight)
}
function preload() {
    game.preload()
}

function draw() {
    game.draw()
}

function keyPressed() {
    if (keyCode === 32) {
        console.log('hi')
        game.bar.isBlue = !game.bar.isBlue
    }

}
