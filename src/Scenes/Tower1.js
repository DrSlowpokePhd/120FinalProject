class Tower1 extends Phaser.Scene {
    constructor() {
        super("tower_1");
        console.log("in tower scene");
    } 

    preload() {
        this.load.image('tiles', './Assets/Backgrounds/backgroundTiles.png');
        this.load.tilemapTiledJSON('map', './Assets/tower1.json');

        //character sprite sheets
        this.load.spritesheet('goblin_idle', './Assets/Characters/goblin_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image('harpy', './Assets/Characters/harpy_idle.png'); //add a sprite sheet later

        //object sprite sheets
        this.load.image('egg', './Assets/Objects/egg.png');
        this.load.spritesheet('trash', './Assets/Objects/trash.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('cobweb', './Assets/Objects/cobweb.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('dust', './Assets/Objects/dust.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hole', './Assets/Objects/hole.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('chair', './Assets/Objects/chair.png', {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bookshelf', './Assets/Objects/bookshelf.png', {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('table', './Assets/Objects/table.png', {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});

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
        this.egg = this.map.createFromObjects('Objects', {gid: 38, key: 'egg'});

        this.trashArr = this.map.createFromObjects('Objects', { gid: 13, key: 'trash' });

        this.dustArr = this.map.createFromObjects('Objects', { gid: 21, key: 'dust' });

        this.cobwebArr = this.map.createFromObjects('Objects', { gid: 5, key: 'cobweb' });

        this.holeArr = this.map.createFromObjects('Objects', { gid: 29, key: 'hole' });

        this.bookshelfArr = this.map.createFromObjects('Objects', { gid: 47, key: 'bookshelf' });

        this.chairArr = this.map.createFromObjects('Objects', { gid: 54, key: 'chair' });

        this.tableArr = this.map.createFromObjects('Objects', { gid: 61, key: 'table' });

        this.gameObjects = [this.egg, this.trashArr, this.dustArr, this.cobwebArr, this.holeArr, this.bookshelfArr, this.chairArr, this.tableArr];


        //create player
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawnpoint");
        this.player = new Player (this, spawnPoint.x, spawnPoint.y, 'goblin_idle');
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

        this.anims.create({
            key: 'chair_play',
            frames: this.anims.generateFrameNumbers('chair', {start:0, end: 1, first: 0}),
            frameRate: 10
        });
        
        this.anims.create({
            key: 'table_play',
            frames: this.anims.generateFrameNumbers('table', {start:0, end: 1, first: 0}),
            frameRate: 10
        });

        this.anims.create({
            key: 'bookshelf_play',
            frames: this.anims.generateFrameNumbers('bookshelf', {start:0, end: 1, first: 0}),
            frameRate: 10
        });

        this.player.anims.play('idle');

        this.debugYes = false;
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
        if (keyD.isDown && !this.debugYes)
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
            this.debugYes = true;
        }

        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }
    }
}
