export default class opening extends Phaser.Scene {
    constructor() {
        super('opening');
    }
    create(){
       const openingText = this.add.text(this.scale.width/2, this.scale.height*0.2, "LOOP QUIZ", {
           // fontFamily: 'PressStart2P',
            fontSize: '70px',
            color: '0xff00ff',
            stroke: 'white',
            strokeThickness: 1
          },
        )
        openingText.setOrigin(0.5, 0.5)
        

        this.playButton = this.add.rectangle(this.scale.width/2, this.scale.height*0.7, 250, 100, 0x000ff);
        this.add.text(this.scale.width/2, this.scale.height*0.7, 'Play', {
          //  fontFamily: 'PressStart2P',
            fontSize: '70px',
            color: 'white',
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
          this.scene.start('quizgame')
        });
        }
    }