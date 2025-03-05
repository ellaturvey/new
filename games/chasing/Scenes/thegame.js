
import gamePlayer from './entities/player.js'
import Danger from './entities/danger.js'
import Reward from './entities/reward.js'

export default class theGame extends Phaser.Scene {
  constructor () {
    super('theGame')
    this.gameStarted = true
    this.dangerObjects = null;
    this.rewardObjects = null;
    this.objectSpeed = Phaser.Math.RND.between(3, 9)

    this.gameTime = 60
    this.maxTime = 60

    this.batteryLife = 100
    this.batteryBg = null
    this.batteryBar = null
  }
  preload () {}

  create () {
    this.input.on('pointerdown', function(pointer){
      console.log('y =' + pointer.y +'x = ' + pointer.x)
    })
    // this.lights.enable()
    // this.lights.setAmbientColor('0x000000')

    let backGround =this.add.image(this.scale.width/2, this.scale.height/2, 'bg')
backGround.setDisplaySize(this.scale.width, this.scale.height)
    this.player = new gamePlayer(this, this.scale.width/2 , this.scale.height * 0.8)

    this.dangerObjects = this.physics.add.group();
    this.rewardObjects = this.physics.add.group();

    this.dangerImages = ['heart', 'friends', 'pencil']
    this.rewardImages = [ 'energy', 'clock']

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.batteryLife = Math.max(this.batteryLife - 2, 0)
        this.updateBatteryLife()
      },
      callbackScope: this,
      loop: true
    })

    this.time.addEvent({
      delay: 6022,
      callback: this.spawnReward, //no (), otherwise only one runs
      callbackScope: this,
      loop: true
    })

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnDangerObjects, //no (), otherwise only one runs
      callbackScope: this,
      loop: true
    })
    if (this.gameStarted) {
      this.input.on('pointermove', pointer => {
        this.player.update(pointer)
      })

      this.physics.add.overlap(
        this.player,
        this.dangerObjects,
        (objA, objB) => {
          console.log('overlap')
          objB.destroy()
          this.batteryLife -= 5
        }
      )

      this.physics.add.overlap(
        this.player,
        this.rewardObjects,
        (objA, objB) => {
          objB.destroy()
          this.batteryLife += 5
        }
      )
    }
    //Blank box to hold battery level
    //https://phaser.io/examples/v3.85.0/game-objects/graphics/view/stroke-rect
    const batteryBg = this.add.graphics()
    batteryBg.lineStyle(2, 0xffffff, 1)
    batteryBg.strokeRect(this.game.config.width / 2 - 150, 30, 300, 40)
    batteryBg.setScrollFactor(0)
    var batteryGlow = batteryBg.postFX.addGlow(0xffffff, 0, 0, false, 0.1, 30)
    this.tweens.add({
      targets: batteryGlow,
      outerStrength: 4,
      yoyo: true,
      loop: -1,
      ease: 'sine.inout'
    })

    this.batteryBar = this.add.graphics()
    this.batteryBar.fillStyle(0x00ff44, 1)
    this.batteryBar.fillRect(this.game.config.width / 2 - 150, 30, 300, 40)
    this.batteryBar.setScrollFactor(0)
  }

  update () {

    this.dangerObjects.children.iterate((danger) => {
      if (danger) {
          danger.dangerUpdate();
      }
    })

    this.rewardObjects.children.iterate((reward) => {
      if (reward){
        reward.rewardUpdate();
      }
    })
  }

  spawnDangerObjects () {
   const dangerArray = Phaser.Utils.Array.GetRandom(this.dangerImages);
   const dangerX = Phaser.Math.Between(270, 478);
   const dangerY = 358;

   const danger = new Danger(this, dangerX, dangerY, dangerArray);
   this.dangerObjects.add(danger);
  }

  spawnReward () {
   const rewardArray = Phaser.Utils.Array.GetRandom(this.rewardImages);
   const rewardX = Phaser.Math.Between(270, 478);
   const rewardY = 358;

   const reward = new Reward(this, rewardX, rewardY, rewardArray);
   this.rewardObjects.add(reward);
  }

  updateBatteryLife () {
    this.batteryBar.clear()
    let batteryColor = 0x00ff44
    if (this.batteryLife <= 30) {
      batteryColor = 0xff0000
    } else if (this.batteryLife <= 65) {
      batteryColor = 0xffff00
    }
    this.batteryBar.fillStyle(batteryColor, 1)
    this.batteryBar.fillRect(
      this.game.config.width / 2 - 150,
      30,
      (300 * this.batteryLife) / 100,
      40
    )
    if (this.batteryLife <= 0) {
      // REF: https://docs.phaser.io/phaser/concepts/scenes
      this.scene.stop();
      this.scene.restart()
      this.batteryLife = 100;
    }
  }

  //   updateGameTimer(){
  //     this.gameTime--;
  //     this.timeText.setText(`${this.gameTime}`);

  //     if(this.gameTime <= 0) {
  //         this.scene.start('Opening');
  //     }
  // }
}
