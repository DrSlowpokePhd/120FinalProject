class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, width, height) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this, 1);
        // dwidth and dheight are named as such to make themselves
        // distinct from the inherent width and height values of 
        // Physics.Arcade.Sprite
        this.dwidth = width;
        this.dheight = height;
    }

    create() {
        this.setImmovable();
        this.setDisplaySize(this.dwidth, this.dheight);
        this.setBodySize(this.dwidth, this.dheight);
    }
}
