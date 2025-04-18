

class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");

  }

  preload() {

  }

  create() {
    this.playButton = this.add.rectangle(this.scale.width*0.5, this.scale.height/2, this.scale.width/2, this.scale.height*0.15, 0xffffff);
    this.add.text(this.scale.width/2, this.scale.height/2, 'Try Again', {
        fontSize: 70,
        color: 'black',
        align: 'center'
    } ).setOrigin(0.5, 0.5);

    this.playButton.setInteractive();    
    this.playButton.on("pointerover", () => {
        this.playButton.setAlpha(.5);
    });
    this.playButton.on("pointerout", () => {
        this.playButton.setAlpha(1);
    });

    this.playButton.on("pointerup", () => {
      this.scene.restart('theGame')
    });
  }

  update() {
  }
}

export default gameOver;
