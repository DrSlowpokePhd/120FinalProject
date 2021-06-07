class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.jumpStrength = -700;
        this.h_movespeed = 250;  
        this.canJump = true;
        this.cleaning = false;
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
    }
    
    update() {
        // Left and right movement
        if (keyA.isDown && !this.cleaning) {
            this.setVelocityX(-this.h_movespeed);
        } else if (keyD.isDown  && !this.cleaning) {
            this.setVelocityX(this.h_movespeed);
        } else {
            this.setVelocityX(0);
        }
    }
}
