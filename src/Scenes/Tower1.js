class Tower1 extends Phaser.Scene {
    constructor() {
        super("tower_1");
        console.log("in tower scene");
    } 

    preload() {
        this.load.image('player', './Assets/Characters/ER-Player.png');
        this.load.image('platform', './Assets/Backgrounds/awningRed.png');
        this.load.image('tiles', './Assets/Backgrounds/spritesheet.png');
        this.load.tilemapTiledJSON('map', './Assets/TestTower.json');

        //character sprite sheets
        this.load.spritesheet('goblin_idle', './Assets/Characters/goblin_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image('harpy', './Assets/Characters/harpy_idle.png'); //add a sprite sheet later

        //sounds
        this.load.audio('background_music', './Assets/Sounds/towerGameMusic.wav');

    }

    create() {
        //create background music
        //add music
        if(this.bgMusic == undefined) //prevent duplication
        {
            this.bgMusic = this.sound.add('background_music');
        }

        this.player = new Player (this, 100, 600, 'goblin_idle');
        this.physics.world.setBounds();  
        this.player.setCollideWorldBounds(true);
        keyUP = this.input.keyboard.addKey('UP');
        keyDOWN = this.input.keyboard.addKey('DOWN');
        keyLEFT = this.input.keyboard.addKey('LEFT');
        keyRIGHT = this.input.keyboard.addKey('RIGHT');
        keyR = this.input.keyboard.addKey('R');
        keySPACE = this.input.keyboard.addKey('SPACE');
        keyD = this.input.keyboard.addKey('D');

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('Tower', 'tiles');
        this.platforms = this.map.createLayer('Platforms', this.tileset, 0, -1030);
        this.platforms.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main; // set main camera to this.camera
        this.camera.startFollow(this.player, 0.02, 0.02, 50, 50);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('goblin_idle', {start:0, end: 4, first: 0}),
            framteRate: 20,
            repeat: -1
        });

        this.player.anims.play('idle');
    }

    update() {
        if(!this.bgMusic.isPlaying)
         {
            this.bgMusic.play();
         }

        this.player.update();
        
        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }
    }
}
