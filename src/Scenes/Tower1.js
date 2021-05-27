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
        this.load.audio('jump_sfx', './Assets/Sounds/sound_effects/jump.wav');
        this.load.audio('land_sfx', './Assets/Sounds/sound_effects/character_land.wav');
        this.load.audio('scrub_sfx', './Assets/Sounds/sound_effects/scrub_sound.wav');
        this.load.audio('sweep_sfx', './Assets/Sounds/sound_effects/sweeping.wav');
    }

    create() {
        //create background music
        //add music
        if(this.bgMusic == undefined) //prevent duplication
        {
            this.bgMusic = this.sound.add('background_music');
        }

        // dialogue
        this.dialogue = new Dialogue(this, "./src/Scripts/test.json");

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

        this.map.createLayer('Decorations', this.tileset, 0, 0);

        this.ground = this.map.createLayer('Ground', this.tileset, 0, 0);
        this.ground.setCollisionByProperty({collides: true}); 

        this.platforms = this.map.createLayer('Platforms', this.tileset, 0, 0);
        this.platforms.setCollisionByProperty({collides: true}); 
        this.platforms.forEachTile(tile => {
            tile.collideDown = false;
        });

        //create objects
        this.objects = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.egg = this.map.createFromObjects('Objects', {gid: 38, key: 'egg'});

        this.trashArr = this.map.createFromObjects('Objects', { gid: 13, key: 'trash' });

        this.dustArr = this.map.createFromObjects('Objects', { gid: 21, key: 'dust' });

        this.cobwebArr = this.map.createFromObjects('Objects', { gid: 5, key: 'cobweb' });

        this.holeArr = this.map.createFromObjects('Objects', { gid: 29, key: 'hole' });

        this.bookshelfArr = this.map.createFromObjects('Objects', { gid: 47, key: 'bookshelf' });

        this.chairArr = this.map.createFromObjects('Objects', { gid: 54, key: 'chair' });

        this.tableArr = this.map.createFromObjects('Objects', { gid: 61, key: 'table' });

        this.gameObjects = [this.egg, this.trashArr, this.dustArr, this.cobwebArr, this.holeArr, this.bookshelfArr, this.chairArr, this.tableArr];
        
        this.object_amount = 0;
        this.gameObjects.forEach(arr =>{
            arr.forEach(tile => {
                this.objects.add(tile);
            });
            this.object_amount += arr.length;
        });


        //create player
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawnpoint");
        this.player = new Player (this, spawnPoint.x, spawnPoint.y, 'goblin_idle');
        this.physics.world.setBounds();
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.objects);
        this.camera = this.cameras.main; // set main camera to this.camera
        this.camera.startFollow(this.player, 0.2, 0.2, 50, 50);

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
            frameRate: 4
        });

        this.anims.create({
            key: 'cobweb_play',
            frames: this.anims.generateFrameNumbers('cobweb', {start:0, end: 3, first: 0}),
            frameRate: 4
        });
        
        this.anims.create({
            key: 'dust_play',
            frames: this.anims.generateFrameNumbers('dust', {start:0, end: 3, first: 0}),
            frameRate: 4
        });
        
        this.anims.create({
            key: 'hole_play',
            frames: this.anims.generateFrameNumbers('hole', {start:0, end: 3, first: 0}),
            frameRate: 4
        });

        this.anims.create({
            key: 'chair_play',
            frames: this.anims.generateFrameNumbers('chair', {start:0, end: 1, first: 0}),
            frameRate: 2
        });
        
        this.anims.create({
            key: 'table_play',
            frames: this.anims.generateFrameNumbers('table', {start:0, end: 1, first: 0}),
            frameRate: 2
        });

        this.anims.create({
            key: 'bookshelf_play',
            frames: this.anims.generateFrameNumbers('bookshelf', {start:0, end: 1, first: 0}),
            frameRate: 2
        });

        this.player.anims.play('idle');

        this.debugYes = false;

        this.cleaned_objects = 0;
        // event triggers go here
        this.events.on("CLEANUP", () => {
            console.log("cleanup");
            this.cleaned_objects++; 
        });
        
        this.debug_text = this.add.text(100, 100, " ", {
            fontSize: '32px'
        }).setOrigin(0,0);
        this.upgate = false; // update-gate, true when active
    }

    update() {
        let spaceDown = Phaser.Input.Keyboard.JustDown(keySPACE);
        if(!this.bgMusic.isPlaying)
         {
            this.bgMusic.play();
         }

        this.player.update();

        // Jump
        if (keyUP.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(this.player.jumpStrength);
            this.sound.play('jump_sfx');
        }

        if (keyDOWN.isDown && this.physics.world.collide(this.player, this.platforms))
        {
            console.log("works");
        }

        // clean object
        if(this.physics.world.overlap(this.player, this.objects))
        {
            this.objects.getChildren().forEach(obj => {
                if(spaceDown && obj.body.touching.none == false && obj.data.list.objectType != "egg")
                {
                    this.sound.play('sweep_sfx');
                    obj.anims.play(obj.data.list.objectType + '_play');
                    obj.on('animationcomplete', () => {                        
                        this.events.emit("CLEANUP");
                        if(obj.data.list.remove)
                        {
                            obj.alpha = 0;  
                        }                
                        this.objects.remove(obj)            
                    });
                };    
            });
        }

        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }

        this.debug_text.x = this.camera.worldView.x + 10;
        this.debug_text.y = this.camera.worldView.y + 10;
        this.debug_text.text = this.cleaned_objects + "/" + this.object_amount;
    }
}
