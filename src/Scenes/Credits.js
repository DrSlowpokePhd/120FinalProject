class Credits extends Phaser.Scene  {
    constructor() {
       super("credits"); 
    }
    // this is the credits card

    preload() {
        // load background asset
        this.load.image('credits_background', './Assets/Backgrounds/credits.png');
        this.load.audio('menu_hit', './Assets/Sounds/sound_effects/menu_hit.wav');
    }

    create() {
        // add key inputs
        keySPACE = this.input.keyboard.addKey('SPACE');

        // add backgrounds
        this.background = this.add.image(0, 0, 'credits_background').setOrigin(0, 0);

        // create text
        this.playText = this.add.text(196, 645, "Press SPACE to return to title.", {
            fontFamily: 'Eight Bit Dragon',
            fontSize: '48px'
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
            this.sound.play('menu_hit');
            this.scene.start('title');
        }
    }
}

