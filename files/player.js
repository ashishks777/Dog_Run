import { Sitting, Running, Jumping, Falling, Rolling, Hit } from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("player-image");

        this.spriteHeight = 525;
        this.spriteWidth = 575;

        this.width = this.spriteWidth * 0.3;
        this.height = this.spriteHeight * 0.3;

        this.y = this.game.height - this.height - this.game.groundMargin;
        this.x = 0;
        this.vy = 0;
        this.weight = 1;

        this.frameX = 0;
        this.maxFrame = 5;
        this.frameY = 0;

        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.maxSpeed = 10;

        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Hit(game)];


        //rolling timer
        this.rollingTimer = 0;
        this.MaxRollingTime = 1000;

    }

    update(input, deltaTime) {
        //checking for collision
        this.checkCollision();


        this.currentState.handleInput(input);

        //horizontal movement
        this.x += this.speed;
        if (input.includes("ArrowRight") && this.currentState !== this.states[5])
            this.speed = this.maxSpeed;
        else if (input.includes("ArrowLeft") && this.currentState !== this.states[5])
            this.speed = -this.maxSpeed;

        else this.speed = 0;


        //boundary conditions
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;


        //vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;


        //sprite Animations

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;

            } else {
                this.frameX = 0;
            }

        } else
            this.frameTimer += deltaTime;


        //rolling timer
        if (this.currentState == this.states[4]) {

            if (this.rollingTimer > this.MaxRollingTime) {
                this.rollingTimer = 0;
                this.setState(1, 1);
            } else {
                this.rollingTimer += deltaTime;
            }
        }

    }

    draw(context) {
        if (this.game.debug) {
            context.strokeStyle = "white";
            context.strokeRect(this.x + 30, this.y + 40, this.width - 50, this.height - 50);
        }

        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState.enter();
    }


    checkCollision() {


        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + 30 + this.width - 50 &&
                enemy.x + enemy.width > this.x + 30 &&
                enemy.y < this.y + 40 + this.height - 50 &&
                enemy.y + enemy.height > this.y + 40


            ) {
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                enemy.markedForDeletion = true;
                if (this.currentState === this.states[4]) {
                    this.game.score+=Math.ceil(Math.random()*5);
                } else {
                    this.setState(5, 0);
                    if (this.game.score - 1 >= 0) {
                        this.game.score--;
                    }
                }



            }



        });
    }
}
