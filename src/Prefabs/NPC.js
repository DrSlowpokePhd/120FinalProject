class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
        this.dialogueBox = new DialogueBox(scene, x, y + 50);
        this.dialogueBox.visible = false;
    }
    
    say(string) {
        this.dialogueBox.set_text(string);
        this.dialogueBox.visible = true;
    }
}


