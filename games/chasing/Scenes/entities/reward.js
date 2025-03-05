

export default class Reward extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, object) {
        super(scene, x, y, object);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        console.log(`Creating Danger object with texture: ${object}`);

        this.startY = 359;
        this.endY = 1270;

         this.setScale(0.01);
         this.alpha = 0;
         this.speed = Phaser.Math.Between(80, 180);

         this.addRewardGlow();
         this.fadeIn();
    }
    // choosing eases
   // https://phaser.io/examples/v3.85.0/tweens/eases
         addRewardGlow(){
            this.preFX.setPadding(100);
         const rewardGlow = this.preFX.addGlow(0x00fa0c, 0, 1);
         this.scene.tweens.add({
            targets: rewardGlow,
            outerStrength: 8,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inout', 
         });
        }

         fadeIn() {
         this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 2000,
            ease: 'quart.in',
         });

         this.scene.tweens.add({
            targets: this,
            scale: 0.3,
            duration: 4000,
            ease: 'cubic.in',
         });
        }

    fadeOut(){
         this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scale: 0.01,
            duration: 1000,
            onComplete: ()=> {this.destroy();}
         });
        }

    rewardUpdate() {
      if(this.x > 430){
         this.setVelocityX(11);
     } else if (this.x < 322){
         this.setVelocityX(-11);
     }
        this.setVelocityY(this.speed);

        if (this.y > 1172){
            this.fadeOut();
        }
    }
}