/** @type {HTMLCanvasElement} */

window.addEventListener('load', function() {

    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {

        constructor() {

            this.keys = [];
            window.addEventListener('keydown', (e) => {  //  Lexical scoping

                if (((e.key === 'ArrowDown') || (e.key === "ArrowUp") || (e.key === 'ArrowRight') || (e.key === 'ArrowLeft'))
                
                && 
                
                (this.keys.indexOf(e.key) === -1/*if it is not present within array*/)) {

                    this.keys.push(e.key);

                }

                // console.log(e.key, this.keys);

            });

            window.addEventListener('keyup', (e) => {  //  Lexical scoping

                if ((e.key === 'ArrowDown') || (e.key === "ArrowUp") || (e.key === 'ArrowRight') || (e.key === 'ArrowLeft')) {

                    this.keys.splice(this.keys.indexOf(e.key), 1);

                }

                // console.log(e.key, this.keys);

            });

        }

    }

    class Player {

        constructor(gameWidth, gameHeight) {

            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.x = 100;
            this.y = this.gameHeight - this.spriteHeight;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.maxFrame = 8;
            this.frameY = 0;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;

        }

        draw(ctx) {

            // ctx.strokeStyle = 'white';
            // ctx.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
            // ctx.beginPath();
            // ctx.arc(this.x + this.spriteWidth / 2, this.y + this.spriteHeight / 2, this.spriteWidth / 2, 0, Math.PI * 2);
            // ctx.stroke();
            // ctx.strokeStyle = 'blue';
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.spriteWidth / 2, 0, Math.PI * 2);
            // ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);

        }

        update(input, deltaTime, enemies) {

            // Collision Detection
            enemies.forEach((enemy) => {

                const dx = (enemy.x + enemy.spriteWidth / 2) - (this.x + this.spriteWidth / 2);
                const dy = (enemy.y + enemy.spriteHeight / 2) - (this.y + this.spriteHeight / 2);;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < enemy.spriteWidth / 2 + this.spriteWidth / 2) {

                    gameOver = true;

                }

            });
            // Sprite Animation
            if (this.frameTimer > this.frameInterval) {

                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;

            } else {

                this.frameTimer += deltaTime;

            }
            
            // Controls
            if (input.keys.indexOf('ArrowRight') > -1) {

                this.speed = 5;

            } else if (input.keys.indexOf('ArrowLeft') > -1) {

                this.speed = -5;

            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {

                this.vy -= 32;

            } else {

                this.speed = 0;

            }

            // boundaries and Horizontal Movement

            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.spriteWidth) this.x = this.gameWidth - this.spriteWidth;

            // Vertical Movement

            this.y += this.vy;
            if (!this.onGround()) {

                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;

            } else {

                this.vy = 0;
                this.maxFrame = 8;
                this.frameY = 0;

            }

            if (this.y > this.gameHeight - this.spriteHeight) this.y = this.gameHeight - this.spriteHeight;
        }

        onGround() {
            return this.y >= this.gameHeight - this.spriteHeight;
        }

    }

    class Background {

        constructor(gameWidth, gameHeight) {
            this.gameWidth - gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 7;
        }

        draw(ctx) {

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);

        }

        update() {

            this.x -= this.speed;
            if (this.x < 0 - this.width)  this.x = 0;

        }

    }

    class Enemy {

        constructor(gameWidth, gameHeight) {

            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.spriteWidth = 160;
            this.spriteHeight = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth - this.spriteWidth;
            this.y = this.gameHeight - this.spriteHeight;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 8;
            this.markedForDeletion = false;

        }

        draw(ctx) {

            // ctx.strokeStyle = 'red';
            // ctx.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
            // // ctx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
            // ctx.beginPath();
            // ctx.arc(this.x + this.spriteWidth / 2, this.y + this.spriteHeight / 2, this.spriteWidth / 2, 0, Math.PI * 2);
            // ctx.stroke();
            // ctx.strokeStyle = 'grey';
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.spriteWidth / 2, 0, Math.PI * 2);
            // ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);

        }

        update(deltaTime) {

            if (this.frameTimer > this.frameInterval) {

                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;

            } else {

                this.frameTimer += deltaTime;

            }

            this.x -= this.speed;

            if (this.x < 0 - this.spriteWidth) { 

                this.markedForDeletion = true;
                score++;

            }

        }

    }

    function handleEnemies(deltaTime) {

        if (enemyTimer > enemyInterval + randomEnemyInterval) {

            enemies.push(new Enemy(canvas.width, canvas.height));
            console.log(enemies);
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;

        } else {

            enemyTimer += deltaTime;

        }
        enemies.forEach((enemy) => {

            enemy.draw(ctx);
            enemy.update(deltaTime);

        });

        enemies = enemies.filter((enemy) => !enemy.markedForDeletion);

    }

    function displayStatusText(ctx) {

        ctx.font = '40px Helevetica';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + score, 20, 50);
        ctx.font = '40px Helevetica';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 22, 52);

        if (gameOver) {

            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText('GAME OVER, try again! :D', canvas.width / 2, 200);
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER, try again! :D', (canvas.width / 2) + 2, 200 + 2);

        }

    }

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;  //  Adding enemy every 1000 ms
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp) {

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // console.log(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);  // 1st draw background, then player.
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        // enemy1.draw(ctx);
        // enemy1.update();
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    // const enemy1 = new Enemy(canvas.width, canvas.height);
    


    animate(0);

});


function tempButtonFunction() {

    window.location.href = "../7B/seventh.html"

}