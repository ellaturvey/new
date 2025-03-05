
//preloading game objects so they load efficiently
class preloadScene extends Phaser.Scene
{
    constructor()
    {//defining the scene to activate it
        super('preloadScene');
    }
preload () {
    //background
    this.load.image("bg", "/games/chasing/images/bg.png");
    //danger - interaction loses time
    this.load.image("heart", "/games/chasing/images/heart.png");
    this.load.image("energy", "/games/chasing/images/energy.png");
    this.load.image("pencil", "/games/chasing/images/pencil.png");
    //rewards - interactiom gives bonus time
    this.load.image("friends", "/games/chasing/images/friends.png");
    this.load.image("pill", "/games/chasing/images/pill.png");
    this.load.image("clock", "/games/chasing/images/brokenClock.png")
    //player
    this.load.image("player", "/games/chasing/images/runner/run-0.png");
//player - animation loop
    for (let i = 0; i < 12; i++) {
      this.load.image(`run-${i}`, `/games/chasing/images/runner/run-${i}.png`);
    }
// makes the user aware of what is happening
    this.add.text(this.game.config.width/2, this.game.config.height/2, "Game Loading...", {
        font: "50px",
        color: "#ff0000",
        align: "center"
    }).setOrigin(0.5, 0.5);

}

create () {
   // pixEffect = gameBg.prefix.addPixelate(2);
   if (!this.anims.exists('runAnim')) {
    this.anims.create({
      key: 'runAnim',
      frameRate: 10,
      frames: [
        { key: 'run-0' },
        { key: 'run-1' },
        { key: 'run-2' },
        { key: 'run-3' },
        { key: 'run-4' },
        { key: 'run-5' },
        { key: 'run-6' },
        { key: 'run-7' },
        { key: 'run-8' },
        { key: 'run-9' },
        { key: 'run-10' },
        { key: 'run-11' },
      ],
      repeat: -1,
    });
    this.scene.start('Opening');
//     console.log('loaded');
// // this.add.image(540, 960, 'bg');
// const playButton = this.add.rectangle(540, 960, 150, 100,'#f7f7f7');
//this.scene.start('Opening');
}
}
}

export default preloadScene;