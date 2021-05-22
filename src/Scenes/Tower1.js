class Tower1 extends Phaser.Scene {
    constructor() {
        super("tower_1");
        console.log("in tower scene");
    } 

    preload() {
        this.load.image('player', './Assets/Characters/ER-Player.png');
        this.load.image('tiles', './Assets/Backgrounds/backgroundTiles.png');
        this.load.tilemapTiledJSON('map', './Assets/tower1.json');

        //character sprite sheets
        this.load.spritesheet('goblin_idle', './Assets/Characters/goblin_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image('harpy', './Assets/Characters/harpy_idle.png'); //add a sprite sheet later

        //object sprite sheets
        this.load.spritesheet('trash', './Assets/Objects/trash.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('cobweb', './Assets/Objects/cobweb.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('dust', './Assets/Objects/dust.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hole', './Assets/Objects/hole.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});

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

        //define keys
        keyUP = this.input.keyboard.addKey('UP');
        keyDOWN = this.input.keyboard.addKey('DOWN');
        keyLEFT = this.input.keyboard.addKey('LEFT');
        keyRIGHT = this.input.keyboard.addKey('RIGHT');
        keyR = this.input.keyboard.addKey('R');
        keySPACE = this.input.keyboard.addKey('SPACE');
        keyD = this.input.keyboard.addKey('D');
        
        //create map
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('Tower Game', 'tiles');

        this.map.createLayer('Background', this.tileset, 0, 0);

        this.ground = this.map.createLayer('Ground', this.tileset, 0, 0);
        this.ground.setCollisionByProperty({ collides: true });

        this.platforms = this.map.createLayer('Platforms', this.tileset, 0, 0);
        this.platforms.setCollisionByProperty({ collides: true });

        this.map.createLayer('Decorations', this.tileset, 0, 0);

        
        //create objects
        this.objects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.trashArr = this.map.createFromObjects('Objects', { gid: 13, key: 'trash' });

        this.dustArr = this.map.createFromObjects('Objects', { gid: 21, key: 'dust' });

        this.cobwebArr = this.map.createFromObjects('Objects', { gid: 5, key: 'cobweb' });

        this.holeArr = this.map.createFromObjects('Objects', { gid: 29, key: "hole" });

        //create player
        this.player = new Player (this, 100, 2400, 'goblin_idle');
        this.physics.world.setBounds();  
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main; // set main camera to this.camera
        this.camera.startFollow(this.player, 0.02, 0.02, 50, 50);

        //create animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('goblin_idle', {start:0, end: 4, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'trash_play',
            frames: this.anims.generateFrameNumbers('trash', {start:0, end: 3, first: 0}),
            frameRate: 10
        });

        this.anims.create({
            key: 'cobweb_play',
            frames: this.anims.generateFrameNumbers('cobweb', {start:0, end: 3, first: 0}),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'dust_play',
            frames: this.anims.generateFrameNumbers('dust', {start:0, end: 3, first: 0}),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'hole_play',
            frames: this.anims.generateFrameNumbers('hole', {start:0, end: 3, first: 0}),
            frameRate: 10
        });

        this.player.anims.play('idle');
    }

    update() {
        if(!this.bgMusic.isPlaying)
         {
            this.bgMusic.play();
         }

        this.player.update();

        if(this.physics.world.overlap(this.player, this.gameObjects))
        {
            console.log('hit');
        }
        
        // test tile collision bounds
        if (keyD.isDown)
        {
            const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
            this.ground.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            this.platforms.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        }

        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }
    }
}
