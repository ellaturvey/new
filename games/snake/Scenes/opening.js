export default class opening extends Phaser.Scene {
    constructor() {
        super('opening');
    }
    create(){
 
        this.add.text(this.scale.width / 2, this.scale.height * 0.05, "Re charge", {
            fontFamily: "Monaco, Courier, monospace",
            fontSize: "60px",  
            color: "#ffae00",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5, 0.5);
        

        this.playButton = this.add.rectangle(this.scale.width/2, this.scale.height*0.8, 300, 170, 0xffae00 );
        this.add.text(this.scale.width/2, this.scale.height*0.8, 'Play', {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '80px',
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
          this.scene.start('chargegame')
        });
        }
    }