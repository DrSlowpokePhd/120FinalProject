class DialogueBox extends Phaser.GameObjects.Text {
    constructor(scene, x, y) {
        super(scene, x, y, "test", {
                backgroundColor: '#5d5861',
                align: 'left',
                maxLines: '6',
                fontSize: '16px',
                fixedHeight: 100,
                fixedWidth: 175,
                wordWrap: { width: 165 }
            });
        scene.add.existing(this);
    }

    create() {
        this.setOrigin(0, 1);
    }

    set_text(string) {
        this.text = string;
    }
}
