

export default class Danger extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, object) {
        super(scene, x, y, object);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        console.log(object);

        this.startY = 359;
        this.endY = 1270;

         this.setScale(0.04);
         this.alpha = 0;
         this.speed = Phaser.Math.Between(80, 180);

         this.addDangerGlow();
         this.fadeIn();
    }

         addDangerGlow(){
            this.preFX.setPadding(100);
         const dangerGlow = this.preFX.addGlow(0xff0026, 0, 1);
         this.scene.tweens.add({
            targets: dangerGlow,
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
            duration: 1000,
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

    dangerUpdate() {
        if (this.y > 1172){
            this.fadeOut();
        }
        if(this.x > 430){
            this.setVelocityX(11);
        } else if (this.x < 332){
            this.setVelocityX(-11);
        }
        this.setVelocityY(this.speed);

       // console.log(this.x);
        
    }
}