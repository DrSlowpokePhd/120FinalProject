class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.jumpStrength = 400;
        this.h_movespeed = 4;  
        this.canJump = true;
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
    }

    update() {
        this.canJump = this.body.touching.down;
        if (keySPACE.isDown) {
            // console.log(this.canJump);
            if (this.canJump) {
                this.setVelocityY(-1 * this.jumpStrength);
            }
        }

        if (keyLEFT.isDown) {
            this.x -= this.h_movespeed;
        } else if (keyRIGHT.isDown) {
            this.x += this.h_movespeed;
        }
    }
}
