
class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.height = height;
        this.width = width;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x <= -this.width + 10) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;

    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export default class Background {
    constructor(game) {
        this.game = game;
        this.width = game.width;
        this.height = game.height;
        this.layer7image = document.getElementById("layer7");
        this.layer6image = document.getElementById("layer6");
        this.layer5image = document.getElementById("layer5");
        this.layer4image = document.getElementById("layer4");
        this.layer3image = document.getElementById("layer3");
        this.layer2image = document.getElementById("layer2");
        this.layer1image = document.getElementById("layer1");

        //making Layer objects
        this.layer7 = new Layer(game, this.width, this.height, 1, this.layer7image);
        this.layer6 = new Layer(game, this.width, this.height, 0.9, this.layer6image);
        this.layer5 = new Layer(game, this.width, this.height, 0.7, this.layer5image);
        this.layer4 = new Layer(game, this.width, this.height, 0.5, this.layer4image);
        this.layer3 = new Layer(game, this.width, this.height, 0.3, this.layer3image);
        this.layer2 = new Layer(game, this.width, this.height, 0.1, this.layer2image);
        this.layer1 = new Layer(game, this.width, this.height, 0, this.layer1image);

        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7];
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();

        });
    }

    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}