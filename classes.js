

// class Game

class Game {
    constructor() {
        this.background = new Background()
        this.planet = new Planet()
        this.bar = new bar()
        this.planetArr = []
        this.planetImage;


    }
    preload() {
        this.background.image = loadImage('assets/Background/Starfield 7 - 1024x1024.png')
        this.planetImage = loadImage('assets/Obstacles/Mars_Planet.png')
        this.bar.redImage = loadImage('assets/Bar/red-bar.jpg')
        this.bar.blueImage = loadImage('assets/Bar/blue-bar.jpg')
    }
    draw() {
        clear()
        this.background.draw()
        this.bar.draw()
        if (frameCount % 40 === 0) {
            this.planetArr.push(new Planet(this.planetImage))
            console.log(this.planetArr)
        }
        this.planetArr.forEach(function (planet) {
            planet.draw()
        });

        // this removes removes the planets after collision
        this.planetArr = this.planetArr.filter(function (planet) {
            if (planet.y >= game.bar.y - game.bar.width / 2 + planet.width / 1.7) {
                return false;
            } else { return true }
        })

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
class bar {
    constructor() {
        this.width = 110;
        this.height = 30;
        this.redImage;
        this.blueImage;
        this.x = 275 - (this.width / 2)
        this.y = 550
        this.isBlue = false;
    }
    draw() {
        if (game.bar.isBlue) {
            image(this.blueImage, this.x, this.y, this.width, this.height)
        } else {
            image(this.redImage, this.x, this.y, this.width, this.height)
        }
    }
}


// class Planet

class Planet {
    constructor(image) {
        this.image = image;
        this.width = 35
        this.height = 35
        this.x = 275 - this.width / 2
        this.y = 0

        // this.planetArr = [];
    }

    draw() {
        this.y += 2;
        image(this.image, this.x, this.y, this.width, this.height)
    }

}


