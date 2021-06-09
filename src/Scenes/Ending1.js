class Ending1 extends Phaser.Scene  {
    constructor() {
       super("ending1"); 
    }
    // this is ending card 1

    preload() {
        // load background asset
        this.load.image('ending1_background', './Assets/Backgrounds/newspaper1.png');
        this.load.audio('menu_hit', './Assets/Sounds/sound_effects/menu_hit.wav');
    }

    create() {
        // fade in
        this.cameras.main.fadeIn(1000);
        
        // add key inputs
        keySPACE = this.input.keyboard.addKey('SPACE');

        // add backgrounds
        this.background = this.add.image(0, 0, 'ending1_background').setOrigin(0, 0);

        // create text
        this.continue = this.add.text(1035, 630, "Press SPACE\nto continue.", {
            fontFamily: 'Eight Bit Dragon',
            fontSize: '32px',
            align: 'center'
        });

        // add text animation
        this.textTween = this.tweens.add({
            targets: [ this.continue ],
            alpha: 0.1,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('menu_hit');
            this.scene.start('credits');
        }
    }
}

