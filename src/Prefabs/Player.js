class extends Phaser.Physics.Arcade.Sprite {
    constructor() {
        super(scene, x, y, texture, frame);
        this.jumpStrength = 100;
        this.h_movespeed = 40;
        scene.physics.add.existing(this, 0);
        this.body.enable = true;
    }

    update() {

    }
}
