// //https://tutorialzine.com/2015/06/making-your-first-html5-game-with-phaser
// //https://www.youtube.com/watch?v=AaGK-fj-BAM&t=1298s
// //https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
let timer;
let goal = false;

export default class chargeGame extends Phaser.Scene {
    constructor() {
        super("chargegame");
        this.speedX = 10
        this.speedY = 10
        
    }

    create() {
        this.phone = this.physics.add.staticSprite(this.scale.width / 2, 300, 'phone')
            .setScale(0.6) //https://docs.phaser.io/phaser/concepts/physics/arcade#gravity
        .setBodySize(720, 380) //made fully scale width so game over called when phone not hit
        this.charger = this.physics.add.sprite(this.scale.width / 2, 1400, 'charger').setScale(0.7)
        this.goingRight = true;
//calls charging function on collision
        this.physics.add.collider(this.phone, this.charger, this.charging)
        this.batteryLevel = 10;
this.batteryText = this.add.text(this.scale.width / 2, this.scale.height * 0.08, this.batteryLevel+"%", {
            fontFamily: "Monaco, Courier, monospace",
            fontSize: "50px",  
            color: "#ff0000",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5, 0.5);
         timer = this.time.addEvent({
           delay: 1000, // equivalent to one second
            callback: this.batteryDrain,
          callbackScope: this,
             repeat: -1,
             })
        this.chargeAlert = this.add.image(this.scale.width / 2, 300, 'charge')
        .setScale(0)
            .setAlpha(0)
        
        this.redFlash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xff0000)
            .setOrigin(0,0)
.setAlpha(0)
        this.input.on('pointerdown', () => {
            this.speedX = 0;
            this.charger.setVelocityY(-700)
        })

    }

    update() {
        if (this.goingRight) {
            this.charger.x += this.speedX; // move right
        } else {
            this.charger.x -= this.speedX; // move left
        }
        if (this.charger.x >= this.scale.width - 20) { // Right edge
            this.goingRight = false; // Move left
        } else if (this.charger.x <= 20) { // Left edge
            this.goingRight = true; // Move right
        }
        console.log(this.charger.x)
        this.input.on('pointerdown', () => {
            this.speedX = 0;
            this.charger.setVelocityY(-700)
        })
        this.batteryText.setText(`${this.batteryLevel}%`)

    }

    batteryDrain() {
        this.batteryLevel--;

        if (this.batteryLevel <= 0) {
                    this.scene.start('playagain')
        }
    }

    goAgain() {
        goal = false;
        this.time.delayedCall(500, () => {
            this.charger.x = this.scale.width / 2;
            this.charger.y = 1400;
            this.speedX = 10;
        })
    }

    pluggedIn() {
        const appear = this.tweens.add({
            targets: this.chargeAlert,
            scale: 4,
            alpha: 1,
            duration: 300,
            yoyo: true,
        })
    }

    fail() {
        this.tweens.add({
            targets: this.redFlash,
            alpha: 0.5,
            duration: 300,
            yoyo: true,
        })
    }

    charging(phone, charger) {
        if (charger.x === 360 ) { //making sure centered on phone
            charger.scene.pluggedIn()
            goal = true;
            charger.scene.batteryLevel = 10
        } else {
            charger.scene.fail()
            goal = false;
        }
        charger.scene.goAgain()
    }
}



