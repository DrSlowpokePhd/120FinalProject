class Title extends Phaser.Scene  {
    constructor() {
       super("title"); 
    }
    // this is where we put the main menu
    // Menu.js renamed to Title.js

    preload() {
        // load title assets
        this.load.image('title_background', './Assets/Backgrounds/new_title.png');
        this.load.spritesheet('big_tower', './Assets/Backgrounds/tower.png',
        {frameWidth: 640, frameHeight: 720, startFrame: 0, endFrame: 24});
    }

    create() {
        // add key inputs
        keySPACE = this.input.keyboard.addKey('SPACE');
        keyR = this.input.keyboard.addKey('R');

        // add animations
        this.anims.create({
            key: 'tower_animation',
            frames: this.anims.generateFrameNumbers('big_tower', {start: 0, end: 24, first:0}),
            frameRate: 12,
            repeat: -1
        });

        // add backgrounds
        this.background = this.add.image(0, 0, 'title_background').setOrigin(0, 0);
        this.tower_sprite = this.add.sprite(640, 0, 'big_tower').setOrigin(0, 0);
        this.tower_sprite.anims.play('tower_animation'); 

        // create text
        this.instructionalText = this.add.text(640, 360, "Press SPACE to start.", {
            backgroundColor: '#5d5861',
            align: 'center',
            fontSize: '32px'
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('tower_1');
        }

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('credits');
        }
    }
}

