

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
 preload()
 {

    //this.load.script()
    //Custom font url + how to Ref
    //https://fonts.google.com/selection - font
    //https://www.youtube.com/watch?v=cKe9JT2lW8w - tutorial
    // this.load.font(
    //     'PressStart2P',
    //     'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
    //     'truetype' )
    // this.load.image('bg', '/games/jump/images/jumpbg.png')
    // this.load.image('cloud', '/games/jump/images/cloud.png')
    // this.load.image('box', '/games/jump/images/box.png')
    // this.load.image('platform', '/games/jump/images/platform.png')
    // this.load.image('like', '/games/jump/images/heart.png')

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