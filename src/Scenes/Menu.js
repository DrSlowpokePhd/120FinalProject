class Menu extends Phaser.Scene  {
    constructor() {
       super("Main Menu"); 
    }
    // this is where we put the main menu

    create() {
        keySPACE = this.input.keyboard.addKey('SPACE');
        this.instructionalText = this.add.text(640, 360, "Press SPACE to start.", {
            backgroundColor: '#5d5861',
            align: 'left',
            fontSize: '32px'
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('tower_1');
        }
    }
}

