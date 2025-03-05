

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
 preload()
 {
    this.load.image('pink', '/games/breakout/images/block.png')
    this.load.image('yellow', '/games/breakout/images/yellowblock.png')
    this.load.image('blue', '/games/breakout/images/blueblock.png')
    this.load.image('red', './games/breakout/images/redblock.png')
    this.load.image('green', '/games/breakout/images/greenblock.png')
    this.load.image('ball', '/games/breakout/images/ball.png')
    this.load.image('platform', '/games/breakout/images/platform.png')
    // makes the user aware of what is happening
    this.add.text(this.scale.width/2, this.scale.height/2, "Game Loading...", {
        font: "50px",
        color: "#ff0000",
        align: "center"
    }).setOrigin(0.5, 0.5)
    this.load.audio('music', '/games/breakout/audio/breakoutMusic.mp3')
    this.load.audio('hit', '/games/breakout/audio/hitBrick.mp3')
    this.load.audio('die', '/games/breakout/audio/restart.mp3')
  }

 create()
 {
    this.scene.start('opening');
 }
}