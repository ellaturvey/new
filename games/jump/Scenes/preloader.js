

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
 preload()
 {
    this.load.image('bg', '/games/jump/images/jumpbg.png')
    this.load.image('share', '/games/jump/images/share.png')
    this.load.image('comment', '/games/jump/images/comment.png')
    this.load.image('box', '/games/jump/images/box.png')
    this.load.image('platform', '/games/jump/images/platform.png')
    this.load.image('like', '/games/jump/images/like.png')
    this.load.spritesheet('man', '/games/jump/images/man.png', {frameWidth: 100, frameHeight: 100})


    this.load.audio('music', '/games/jump/audio/music.mp3')
    this.load.audio('collect', '/games/jump/audio/collect.mp3')
    this.load.audio('box', '/games/jump/audio/box.mp3')
    // makes the user aware of what is happening
    this.add.text(this.scale.width/2, this.scale.height/2, "Game Loading...", {
        font: "50px",
        color: "#ff0000",
        align: "center"
    }).setOrigin(0.5, 0.5)
  }

 create()
 {
    this.scene.start('opening');
 }
}