

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
 preload()
 {
    this.load.image('upBtn', '/games/snake/images/up.png')
    this.load.image('downBtn', '/games/snake/images/down.png')
    this.load.image('rightBtn', '/games/snake/images/right.png')
    this.load.image('leftBtn', '/games/snake/images/left.png')
    this.load.image('charger', '/games/snake/images/charger.png')
    this.load.image('charge', '/games/snake/images/food.png')
     this.load.image('phone', ' /games/snake/images/phone.png')
    // makes the user aware of what is happening
    this.add.text(this.scale.width/2, this.scale.height/2, "Game Loading...", {
        font: "50px",
        color: "#ff0000",
        align: "center"
    }).setOrigin(0.5, 0.5)
// loading custom font from google
//REFERENCE: https://www.youtube.com/watch?v=cKe9JT2lW8w
//    this.load.font(
//      'PressStart2P',
//      'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
//      'truetype')
  }

 create()
 {
    this.scene.start('opening');
 }
}