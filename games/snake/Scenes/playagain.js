
export default class playAgain extends Phaser.Scene {
    constructor() {
        super('playagain');
    }

    create() {
        const openingText = this.add.text(this.scale.width / 2, 300, "You have 0 lives", {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);


        this.playButton = this.add.rectangle(this.scale.width / 2, 500, 150, 50, 0xffffff);
        this.add.text(this.scale.width / 2, 500, 'Play Again', {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '40px',
            color: 'black',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.playButton.setInteractive();
        this.playButton.on("pointerover", () => {
            this.playButton.setAlpha(.5);
        });
        this.playButton.on("pointerout", () => {
            this.playButton.setAlpha(1);
        });

        this.playButton.on("pointerup", () => {
                this.scene.start('snakegame');
        });
    }

}
