import Player from "./player.js"
import InputHandler from "./input.js";
import Background from "./background.js";
import { FlyingEnemy, GrounEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";


window.addEventListener("load", function () {

    // Toggle full screen 
    const fullScreenButton = this.document.getElementById("fullScreenButton");

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error can't eneble full screen mode: ${err.message}`);
                console.log()
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener("click", toggleFullScreen);

    //music
    const background_music = this.document.getElementById("background_music");
    background_music.loop = true;
    background_music.play();


    //getting canvas element and setting its context to 2d
    const canvas = this.document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    //setting height and width of canvas
    canvas.height = 720;
    canvas.width = 1280;


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 71;

            this.speed = 0;
            this.maxSpeed = 10;

            this.score = 0;
            this.fontColor = "White";
            //creating object of input handler class
            this.input = new InputHandler(this);
            this.ui = new UI(this);

            //creating object of player class
            this.player = new Player(this);

            //creating background object
            this.background = new Background(this);


            //enemies array
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1500;

            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

            this.particles = [];
            this.maxParticles = 100;

            //collisions
            this.collisions = [];

            //gameover time
            this.time = 0;
            this.maxTime = 60000;

            this.gameOver = false;

            this.lTime = 0;

            //music


            //background_music.play();

        }

        update(deltaTime) {
            this.time += deltaTime;

            if (this.time - this.lTime > 2000 && this.player.currentState != this.player.states[0]) {
                this.score++;
                this.lTime = this.time;
            }
            if (this.time > this.maxTime) {this.gameOver = true;
            this.time=0;}
            this.player.update(this.input.keys, deltaTime);
            this.background.update();

            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this.addEnemy();

            } else {
                this.enemyTimer += deltaTime;
            }


            //hendle enemies

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);

            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

            //handle particles
            this.particles.forEach(particle => {
                particle.update();

            });
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }


            //handle collisions
            this.collisions.forEach(collision => {
                collision.update(deltaTime);
            });
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);


        }

        draw(context) {

            this.background.draw(context);
            this.player.draw(context);
            // collisions animation
            this.collisions.forEach(collision => {
                collision.draw(context);

            });
            //draw enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.ui.draw(context);


            //drawing particles
            this.particles.forEach(particle => {
                particle.draw(context);

            });



        }
        restart() {
            //creating object of input handler class
            //  this.input = new InputHandler(this);
            //  this.ui = new UI(this);

            //creating object of player class
            this.player = new Player(this);



            this.speed = 0;

            //enemies array
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;

            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

            this.particles = [];
            this.maxParticles = 100;

            //creating background object
            this.background = new Background(this);
            //collisions
            this.collisions = [];

            //time
            this.time = 0;
            //this.maxTime = 60000;

            this.gameOver = false;

            this.lTime = 0;

            this.gameOver = false;


            animate(0);



        }

        addEnemy() {

            if (Math.random() * Math.random() > 0.3 && this.speed > 0) {
                this.enemies.push(new GrounEnemy(this));
            }
            if (Math.random() > 0.3)
                this.enemies.push(new FlyingEnemy(this));

            if (Math.random() * Math.random() > 0.3&& this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }

        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);


    }
    animate(0);
});



