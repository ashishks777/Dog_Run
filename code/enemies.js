class Enemy {
    constructor() {

        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;

    }

    update(deltaTime) {

        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        if(this.game.debug){
            context.strokeStyle="white";
            context.strokeRect(this.x,this.y,this.width,this.height);
        } 
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.image = document.getElementById("bat");
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height * 0.4 * Math.random();
        this.speedX = Math.random() * 2 + 1;
        this.speedY = 0;
        this.maxFrame = 5;

        this.angle = 0;
        this.va = Math.random() * 0.01 + 0.03;

    }

    update(delatTime) {
        
        super.update(delatTime);
        this.angle += this.va;
        this.y += 2 * Math.sin(this.angle);
    }
}

export class GrounEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;

        this.spriteWidth = 292;
        this.spriteHeight = 410;
        this.image = document.getElementById("zombie");
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;

        this.x = this.game.width +Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.height - this.game.groundMargin;

        this.speedX = Math.random();
        this.speedY = 0;
        this.maxFrame = 7;


    }

}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;

        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.image = document.getElementById("spider");
        this.size=Math.random()*0.2+1;
        this.width = this.spriteWidth*this.size;
        this.height = this.spriteHeight*this.size;

        this.x = this.game.width+ Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;

        this.speedX = 0;
        this.speedY = Math.random()>0.5 ? -1:+1;
        this.maxFrame = 5;


    }

    update(delatTime){
        super.update(delatTime);

        if(this.y>this.game.height - this.height - this.game.groundMargin)
        this.speedY=-1;
    }

    draw(context){
        super.draw(context);
        context.save();
        context.fillStyle='white';
        context.beginPath();
        context.moveTo(this.x+this.width/2,0);
        context.lineTo(this.x+this.width/2,this.y+50);
       
        context.stroke();
        context.restore();
    }

}