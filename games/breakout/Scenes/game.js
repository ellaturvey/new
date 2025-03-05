
//https://stackabuse.com/introduction-to-phaser-3-building-breakout/
//https://www.netexl.com/blog/making-of-a-responsive-game-in-phaser-part-3/
// phaser.io/examples/v3.85.0/game-objects
let object, player;
let score = 0
let lives = '♾️'
let scoreCounter, lifeCounter
let started = false

export default class breakoutGame extends Phaser.Scene {
    //giving the game a key to be called
    constructor(){
        super('breakoutgame')
    }
    create(){
        this.music = this.sound.add('music', {loop: true})
        this.music.play()
        //  score and lives 
        scoreCounter = this.add.text(16, 16, 'Score: ' + score, {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '40px',
            fill:'rgb(5, 203, 28)',

        });
        
        lifeCounter = this.add.text(this.scale.width - 16, 16, 'Lives: ' + lives, {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '40px',
            fill: '#ff0000',
        }).setOrigin(1, 0);

        player = this.physics.add.sprite(this.scale.width / 2, this.scale.height * 0.9, 'platform')
        player.setCollideWorldBounds(true).setImmovable(true)
        
        // Add ball with trail effect
        object = this.physics.add.sprite(this.scale.width /2 , this.scale.height * 0.87, 'ball')
        object.setCollideWorldBounds(true, true, true)
        object.setScale(0.25)
        object.body.setBounce(1);
        
        

        // brick layout
        const colors = ['pink', 'blue', 'green', 'yellow', 'red'];
        const rowCount = 3; // rows of each color
        
        const brickWidth = this.scale.width / 4; // 4 bricks per row
        const numOfBricks = 4; // fixed number of bricks per row 
        const brickHeight = this.scale.height * 0.02; // Smaller height for more vertical space
        const startX = brickWidth / 2;
        const startY = this.scale.height * 0.15; // 
        const spacing = brickHeight * 0.5; // spacing

        // brick array
        this.bricks = [];


        colors.forEach((color, rowIndex) => {
            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < numOfBricks; j++) {
                    const x = startX + (j * brickWidth);
                    const y = startY + ((brickHeight + spacing) * (rowIndex * rowCount + i));
                    
                    // Create bricks
                    const brick = this.physics.add.sprite(x, y, color);
                    brick.setDisplaySize(brickWidth * 0.95, brickHeight); 
                    brick.setImmovable(true);
                    brick.setCollideWorldBounds(false);
                    
                    this.physics.world.enable(brick);
                    brick.body.setAllowGravity(false);
                    
                    this.physics.add.collider(object, brick, this.hitBrick, null, this);
                    
                    this.bricks.push(brick);
                }
            }
        });

        this.physics.add.collider(object, player, this.hitPlatform, null, this);
        // movement
            this.input.on('pointermove', (pointer) => { //update to pointer x pos and subtracting half the width so it stays on the screen
                            player.x = Phaser.Math.Clamp(pointer.x, player.displayWidth / 2, this.scale.width - player.displayWidth / 2);
                            if (!started) { //keeping the ball and paddle together before launch
                                object.x = player.x;
                            }
        }, this);

        // 
        this.scale.on('resize', (gameSize) => {
            this.cameras.main.setViewport(0, 0, gameSize.width, gameSize.height);
            
  
            scoreCounter.setPosition(16, 16);
            lifeCounter.setPosition(gameSize.width - 16, 16);
            

            if (player.y > gameSize.height * 0.9) {
                player.y = gameSize.height * 0.9;
            }
        });


        this.input.on('pointerdown', () => {
            if (!started) {
                started = true;
                object.setVelocity(Phaser.Math.Between(-200, 200), -300);
            }
        });
    }
    update() {
        // ball goes below the screen
        if (object.y > player.y +20 && started) {  // call gameOver if the game has started
            started = false; 
            this.sound.play('die')
            this.gameOver();
        }
    }

hitBrick(object, brick) {
    // update score
    this.sound.play('hit')
    score += 10;
    scoreCounter.setText('Score: ' + score);
    object.setVelocityY(object.body.velocity.y + 50)

    // brick fade out
    this.tweens.add({
        targets: brick,
        alpha: 0,
        duration: 100,
        onComplete: () => {
            brick.destroy();
        }
    });
console.log(score);

        if (object.body.velocity.x === 0) {
            object.setVelocityX(Phaser.Math.Between(-150, 150));
        }
    }



hitPlatform(object, player) {
        object.setVelocityY(object.body.velocity.y - 15);
        if (object.x < player.x) {
            object.setVelocityX(-150);
        } else {
            object.setVelocityX(150);
        }
        console.log(object.body.velocity.y)
    }

    gameOver() {
        score = 0
        this.music.stop()
            this.scene.restart();
    }

    shutdown() {
        // Stop the audio when the scene is shut down
        if (this.music) {
            this.music.stop();
        }
        console.log('MyGameScene is shutting down');
    }
    destroy() {
        // Final cleanup
        if (this.music) {
            this.music.stop();
        }
        console.log('MyGameScene is being destroyed');
        super.destroy();
    }
}