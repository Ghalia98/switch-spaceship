let randomIndex = 0
const scoreText = document.querySelector('h4')
let score = 0
let currentAlienX = 0
let currentAlienY = 0

// class Game

class Game {
    constructor() {
        this.background = new Background()
        this.planet = new Planet()
        this.spaceship = new Spaceship()
        this.beam = new Beam()
        this.alien = new Alien()
        this.shield = new Shield()
        this.explosion = new Explosion()
        this.planetArr = []
        this.alienArr = [];
        this.score = 0




    }
    setup() {

    }
    preload() {
        this.background.image = loadImage('assets/Background/Starfield 7 - 1024x1024.png')
        this.planet.planetImage = [{ src: loadImage('assets/Obstacles/Mars_Planet.png'), color: 'red' },
        { src: loadImage('assets/Obstacles/blue-ball.png '), color: 'blue' }]

        this.spaceship.redImage = loadImage('assets/Spaceship assets/Spaceship_02_RED.png')
        this.spaceship.blueImage = loadImage('assets/Spaceship assets/Spaceship_02_NAVY BLUE.png')
        this.beam.image = loadImage('assets/Spaceship assets/07.png')
        // this.flame.image = loadImage('assets/bar/Flame_01.png')
        this.alien.image = [loadImage('assets/Obstacles/animated-ufo-image-0001.gif')]
        this.shield.shieldImage = loadImage('assets/Spaceship assets/spr_shield.png')
        this.noShieldImage = loadImage('assets/Spaceship assets/HD_transparent_picture.png')
        this.explosion.image = loadImage('assets/Spaceship assets/i_0012.png')
    }
    draw() {
        clear()
        this.background.draw()
        this.spaceship.draw()
        if (frameCount % 30 === 0) {
            randomIndex = Math.floor(Math.random() * this.planet.planetImage.length)
            this.planetArr.push(new Planet(this.planet.planetImage[randomIndex].src
                , randomIndex))
            // console.log(this.planetArr)
        }
        this.planetArr.forEach(function (planet) {
            // console.log(randomIndex)
            planet.draw()
        });
        // console.log(this.planet.planetImage[0].color)

        // this removes the planets after collision
        this.planetArr = this.planetArr.filter(planet => {

            if (planet.y >= game.spaceship.y - game.spaceship.width / 2 + planet.width * 2) {
                const index = planet.index
                if (game.planet.planetImage[index].color === 'blue' && game.spaceship.isBlue) {
                    score++;
                    scoreText.innerHTML = `<h4>Score: ${score}</h4>`
                } else if (game.planet.planetImage[index].color === 'red' && !game.spaceship.isBlue) {
                    score++;
                    scoreText.innerHTML = `<h4>Score:${score}</h4>`
                }
                else {
                    game.explosion.draw()
                    noLoop()
                }
                return false;
            } else { return true }
        })

        if (game.spaceship.isExtracted) {
            this.beam.draw()
            // add set setTimeout
            game.spaceship.isExtracted = false;
        }
        // this.alien.draw()
        if (frameCount % 500 === 0) {
            this.alienArr.push(new Alien(this.alien.image[0], this.alien))
            //    remove elements from array when they're out of the screen
        }
        this.alienArr.forEach(function (alien) {
            // console.log(randomIndex)
            alien.draw()

        });
        this.alienArr = this.alienArr.filter(alien => {
            if (alien.collision(game.shield.x, game.shield.y) && !game.spaceship.isShieldOn) {

                console.log(alien)
                return false;
            } else { return true }

        })
        // add constraint for shild image 
        // set timer to remove shield
        game.spaceship.isShieldOn = false;
        // game.alien.alienCollision = false;


        if (keyIsDown(83)) {
            // setInterval
            if (!game.spaceship.isShieldOn) {
                game.shield.draw()
                game.shield.isShieldDrawn = true;
                game.spaceship.isShieldOn = true;
            }

            timeIt()
        }

        console.log(game.alien.alienCollision)
        // console.log(game.spaceship.isShieldOn)
        if (game.spaceship.isShieldOn === false && game.alien.collision(game.shield.x, game.shield.y)) {
            game.alien.alienCollision = true;

        }
        if (game.alien.alienCollision) {
            game.alien.alienCollision = false;
            game.explosion.draw()
            noLoop();
        }


        // console.log(game.alien.alienCollision)
    }


}



// class Background

class Background {
    constructor() {
        this.image;
        this.x = 0
        this.y = 0
    }
    draw() {
        this.y += 3;
        image(this.image, this.x, this.y, width, height)
        image(this.image, this.x, this.y - height, width, height)
        if (this.y >= height) {
            this.y = 0
        }
    }
}
// refactor these two classes together (add parameters)
class Spaceship {
    constructor() {
        this.width = 220;
        this.height = 220;
        this.redImage;
        this.blueImage;
        this.x = 275 - (this.width / 2)
        this.y = 400
        this.isBlue = false;
        this.isExtracted = false;
        this.isShieldOn = false;
    }
    draw() {
        if (game.spaceship.isBlue) {
            image(this.blueImage, this.x, this.y, this.width, this.height)
        } else {
            image(this.redImage, this.x, this.y, this.width, this.height)
        }
    }
}


// class Planet

class Planet {
    constructor(image, index) {
        this.image = image;
        this.width = 40
        this.height = 40
        this.x = 275 - this.width / 2
        this.y = 0
        this.planetImage;
        this.index = index

        // this.planetArr = []; 
    }

    draw() {
        this.y += 5.5;
        image(this.image, this.x, this.y, this.width, this.height)
    }


}


class Beam {
    constructor() {
        this.image;
        this.width = 50;
        this.height = 70;
        this.x = 275 - this.width / 2
        this.y = 400 - this.height / 8

    }
    draw() {
        image(this.image, this.x, this.y, this.width, this.height)
    }
}

class Alien {
    constructor(image, arr) {
        this.image = image;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 300;
        this.alienCollision = false;
        this.arr = arr
    }

    draw() {
        this.x++;
        currentAlienX = this.x++

        this.y++;
        currentAlienY = this.y++

        if (this.y <= 300) {
            this.y = 350
        }
        image(this.image, currentAlienX, currentAlienY, this.width, this.height)
    }
    collision(x, y) {
        if (dist(currentAlienX, currentAlienY, x, y) <= 48) {
            return !this.alienCollision
        }
    }
    resetCollision() {
        this.alienCollision = false;
    }
    moveAway() {
        currentAlienX -= 10
        currentAlienY -= 10
    }
}


class Shield {
    constructor() {
        this.shieldImage
        this.noShieldImage
        this.width = 200;
        this.height = 200;
        this.x = 250 - this.width / 2 + 25
        this.y = 410;

    }
    draw() {
        if (!game.spaceship.isShieldimage) {
            image(this.shieldImage, this.x, this.y, this.width, this.height)

        }
        else {
            image(this.noShieldImage, this.x, this.y, this.width, this.height)
        }
    }
}

class Explosion {
    constructor() {
        this.image
        this.width = 200;
        this.height = 200;
        this.x = 250 - this.width / 2
        this.y = 410;
    }
    draw() {
        image(this.image, this.x, this.y, this.width, this.height)
    }
}