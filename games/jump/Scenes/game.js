//https://phaser.io/tutorials/making-your-first-phaser-3-game/part2
var platforms, player
var likes = 0
var comments = 0
var shares = 0
var likeText, shareText, commentText
export default class jumpGame extends Phaser.Scene {
    //giving the game a key to be called
    constructor() {
        super('jumpgame')

        this.player = null;
        this.heartObjects = []
    }

    create() {
        this.music = this.sound.add('music', {loop: true})
        this.music.play()
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg')


        platforms = this.physics.add.staticGroup();

        platforms.create(360, 1260, 'platform').setScale(3).refreshBody();

        platforms.create(690, 960, 'platform')
        platforms.create(200, 1060, 'platform')
        platforms.create(310, 890, 'platform')
        platforms.create(120, 320, 'platform')
        platforms.create(70, 530, 'platform')
        platforms.create(490, 450, 'platform')
        platforms.create(400, 160, 'platform')
        platforms.create(650, 300, 'platform')
        platforms.create(680, 670, 'platform')
        platforms.create(130, 760, 'platform')

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('man', {start: 0, end: 4 }),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('man', {start: 5, end: 9 }),
            frameRate:10,
            repeat: -1
        });
        player = this.physics.add.sprite(100, 1120, 'man').setScale(0.8);
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);
        this.goingRight = true;
        this.speed = 2

        // this.likes = this.physics.add.group({
        //     key: 'like',
        //     repeat: 11,
        //     setXY: { x: 102, y: 0, stepX: 50 }
        // })
        // this.likes.children.iterate(child => {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // })

        const boxX = Phaser.Math.Between(40, this.scale.width - 40)
        const boxY = Phaser.Math.Between(1000, this.scale.height - 150)
        this.surpriseBox = this.physics.add.sprite(boxX, boxY, 'box').setScale(0.4)
 likeText = this.add.text(50, 1210,  'likes 0', { fontSize: '32px', fill: '#000' });
 commentText = this.add.text(260, 1210,  'comments 0', { fontSize: '32px', fill: '#000' });
 shareText = this.add.text(520, 1210,  'shares 0', { fontSize: '32px', fill: '#000' });
        


        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(this.likes, platforms);
        this.physics.add.collider(this.surpriseBox, platforms);

        // this.physics.add.overlap(player, this.likes, this.collectLike, null, this)
        this.physics.add.overlap(player, this.surpriseBox, this.unlockBox, null, this)
        // this.rect.setInteractive();
        // this.rect.on('pointerdown', ()=> {
        //     this.rect.y += 5
        // })
    }
    update() {

        if (this.goingRight) {
            player.x += this.speed; // move right
            player.anims.play('right', true);
        } else {
            player.x -= this.speed; // move left
            player.anims.play('left', true);
        }
         // operation/triggers for moving left & right
        if (player.x >= this.scale.width - 50) { // hitting left edge
            this.goingRight = false; // trigger left movement
        } else if (player.x <= 50) { // when hits left edge
            this.goingRight = true; // triggering right movement
        }
    
    
        this.input.on('pointerdown', () => {
            if (player.body.touching.down) {
                player.setVelocityY(-300)
            }
        })

    }

    unlockBox() {
        this.sound.play('box') //sound on box hit
        this.surpriseBox.destroy() //destroy box
        var images = ['comment', 'share', 'like']; // array of images
        var randomImage = Phaser.Utils.Array.GetRandom(images); // randomising image displayed
        var collectablesNum = Phaser.Math.Between(7, 14) //7 - 14 objects on screen
        for (var i = 0; i < collectablesNum; i++) { //random x + y
            const boxX = Phaser.Math.Between(40, this.scale.width - 110)
            const boxY = Phaser.Math.Between(50, this.scale.height - 50)

            var collectables = this.physics.add.image(boxX, boxY, randomImage); // creating the random images
            collectables.setScale(0.7)

            collectables.setCollideWorldBounds(true); // Prevents going off-screen
            collectables.setBounce(0.5)
            this.physics.add.overlap(player, collectables, this.collectItems, null, this)
            this.physics.add.collider(collectables, platforms);

            console.log(collectablesNum + randomImage)
        
        }
    }
    // spawnBox(){
    //     let boxX = Phaser.Math.Between(game.config.width)
    // }
    //https://phaser.io/examples/v3.85.0/physics/arcade/view/direct-control-follow-mouse
    collectItems(player, collectables) {
        collectables.disableBody(true, true);
        this.sound.play('collect')

        if (collectables.texture.key === 'comment') {
            comments += 1
            commentText.setText(comments + ' comments')
        }
        if (collectables.texture.key === 'share') {
            comments += 1
            shareText.setText(shares + 'shares')
        }
        if (collectables.texture.key === 'like') {
            likes += 1
            likeText.setText(likes + ' likes')
        }
    }


//     showbox() {
//         const boxX = Phaser.Math.Between(40, this.scale.width - 40)
//         const boxY = Phaser.Math.Between(30, this.scale.height - 50)
//         this.surpriseBox = this.physics.add.sprite(boxX, boxY, 'box')
//     }
}