let countDown = 15 * 60; // 15 minutes in seconds
let timer;

export default class playAgain extends Phaser.Scene {
    constructor() {
        super('playagain');
    }

    create() {
        const openingText = this.add.text(200, 300, "You have 0 lives", {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);

        this.timerText = this.add.text(200, 100, this.formatTime(countDown), {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '30px',
            color: 'black',
        }).setOrigin(0.5, 0.5);

        timer = this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateTimer,  //
            callbackScope: this,        
            loop: true
        });

        this.playButton = this.add.rectangle(200, 500, 150, 50, 0xffffff);
        this.add.text(200, 500, 'Play Again', {
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
            if (lives >= 1) {
                this.scene.start('breakoutgame');
            }
        });
    }

    updateTimer() {
        if (countDown > 0) {
            countDown--;
            this.timerText.setText(this.formatTime(countDown)); 
        } else {
            timer.remove(); 
            this.timerText.setText("Time's up!"); 
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; 
    }
}
