class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.jumpStrength = -700;
        this.h_movespeed = 200;  
        this.canJump = true;
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
    }
    
    update() {
        // Left and right movement
        if (keyA.isDown) {
            this.setVelocityX(-this.h_movespeed);
        } else if (keyD.isDown) {
            this.setVelocityX(this.h_movespeed);
        } else {
            this.setVelocityX(0);
        }
    }
}
