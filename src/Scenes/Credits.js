class Credits extends Phaser.Scene  {
    constructor() {
       super("credits"); 
    }
    // this is the credits card

    preload() {
        // load background asset
        this.load.image('credits_background', './Assets/Backgrounds/credits.png');
    }

    create() {
        // add key inputs
        keySPACE = this.input.keyboard.addKey('SPACE');

        // add backgrounds
        this.background = this.add.image(0, 0, 'credits_background').setOrigin(0, 0);

        // create text
        this.playText = this.add.text(196, 645, "Press SPACE to return to title.", {
            fontFamily: 'Eight Bit Dragon',
            fontSize: '48px',
            color: 'black'
        });

        // add text animation
        this.textTween = this.tweens.add({
            targets: [ this.playText ],
            alpha: 0.1,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('title');
        }
    }
}

