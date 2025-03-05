

class gamePlayer extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'player')

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setScale(0.7)
    this.setInteractive() //allow tap movement
    this.body.setSize(120, 300) //make the colision area smaller 
    this.body.setOffset(210, 125) //adjust area position

    // this.isAlive = false;

    this.play('runAnim')
  }

  update (pointer) {
    if (pointer) {
      this.x = pointer.x //controlled x pos by user
//stopping movement off platform
      if (this.x > 658){ 
        this.x = 658; 
      }

      if (this.x < 68){
        this.x = 68;
      }
    }
  }
}

export default gamePlayer
