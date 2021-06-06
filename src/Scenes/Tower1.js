class Tower1 extends Phaser.Scene {
    constructor() {
        super("tower_1");
        console.log("in tower scene");
    } 

    preload() {
        this.load.image('tiles', './Assets/Backgrounds/backgroundTiles.png');
        this.load.tilemapTiledJSON('map', './Assets/tower1.json');
        this.load.image('clouds', './Assets/Backgrounds/clouds.png');

        //character sprite sheets
        this.load.spritesheet('goblin_idle', 
            './Assets/Characters/goblin_idle.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});

        this.load.spritesheet('goblin_walk', 
            './Assets/Characters/goblin_walk.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});

        this.load.spritesheet('goblin_jump', 
            './Assets/Characters/goblin_jump.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 0});

        this.load.spritesheet('goblin_sweep', 
            './Assets/Characters/goblin_sweep.png',
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});

        this.load.image('harpy', 
            './Assets/Characters/harpy_idle.png'); //add a sprite sheet later

        //object sprite sheets
        this.load.image('egg', 
            './Assets/Objects/egg.png');
        this.load.spritesheet('trash', 
            './Assets/Objects/trash.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('cobweb', 
            './Assets/Objects/cobweb.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('dust', 
            './Assets/Objects/dust.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hole', 
            './Assets/Objects/hole.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('chair', 
            './Assets/Objects/chair.png', 
            {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bookshelf', 
            './Assets/Objects/bookshelf.png', 
            {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('table', 
            './Assets/Objects/table.png', 
            {frameWidth: 64, frameWidth: 64, startFrame: 0, endFrame: 1});

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
        this.dialogue = new Dialogue(this, "./src/Scripts/dialogue.json");

        //define keys
        keyW = this.input.keyboard.addKey('W');
        keyS = this.input.keyboard.addKey('S');
        keyA = this.input.keyboard.addKey('A');
        keyD = this.input.keyboard.addKey('D');
        keyR = this.input.keyboard.addKey('R');
        keySPACE = this.input.keyboard.addKey('SPACE');
        keyF = this.input.keyboard.addKey('F');
        
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

        this.trashArr = this.map.createFromObjects('Objects', { gid: 13, key: 'trash' });

        this.dustArr = this.map.createFromObjects('Objects', { gid: 21, key: 'dust' });

        this.cobwebArr = this.map.createFromObjects('Objects', { gid: 5, key: 'cobweb' });

        this.holeArr = this.map.createFromObjects('Objects', { gid: 29, key: 'hole' });

        this.bookshelfArr = this.map.createFromObjects('Objects', { gid: 47, key: 'bookshelf' });

        this.chairArr = this.map.createFromObjects('Objects', { gid: 54, key: 'chair' });

        this.tableArr = this.map.createFromObjects('Objects', { gid: 61, key: 'table' });

        this.gameObjects = [this.trashArr, this.dustArr, this.cobwebArr,
                            this.holeArr, this.bookshelfArr, this.chairArr, this.tableArr];
        
        this.object_amount = 0;
        this.gameObjects.forEach(arr =>{
            arr.forEach(tile => {
                this.objects.add(tile);
            });
            this.object_amount += arr.length;
        });
        
        //character physics group
        this.characterGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        //create egg
        this.egg = this.map.createFromObjects('Objects', {gid: 38, key: 'egg'});
        this.characterGroup.add(this.egg[0]);

        //create harpy        
        const harpyPoint = this.map.findObject("Objects", obj => obj.name === "harpy");
        this.harpy = this.add.sprite(harpyPoint.x, harpyPoint.y, 'harpy').setOrigin(0,0);
        this.characterGroup.add(this.harpy);

        //create player
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "spawnpoint");

        this.player = new Player (this, spawnPoint.x, spawnPoint.y, 'goblin_idle').setOrigin(0,0);
        this.physics.world.setBounds();
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.characterGroup);
        this.physics.add.overlap(this.player, this.objects);
        this.camera = this.cameras.main; // set main camera to this.camera
        this.camera.startFollow(this.player, 0.2, 0.2, 50, 50);
        this.in_convo = false;

        //add cloud layer
        this.add.tileSprite(spawnPoint.x-1280, spawnPoint.y-310, 2780, 720, 'clouds').setOrigin(0,0);

        //create animations
        this.anims.create({
            key: 'idle_play',
            frames: this.anims.generateFrameNumbers('goblin_idle', {start:0, end: 4, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_play',
            frames: this.anims.generateFrameNumbers('goblin_walk', {start:0, end: 4, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'jump_play',
            frames: this.anims.generateFrameNumbers('goblin_jump', {start:0, end: 0, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'clean_play',
            frames: this.anims.generateFrameNumbers('goblin_sweep', {start:0, end: 7, first: 0}),
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

        this.player.anims.play('idle_play');

        this.debugYes = false;

        this.cleaned_objects = 0;
        this.convo_array = this.dialogue.script;
        this.line;
        this.speaker;
        this.speaker_txt;
        this.dialogueBox = new DialogueBox(this, 0, 0, " ");

        // object to store the speaking characters present in a scene
        this.characters = {
            Hugh_Mann: this.player,
            Harpy: this.harpy,
            Egg: this.egg[0]
        };

        // event triggers go here
        this.events.on("CLEANUP", () => {
            console.log("cleanup");
            this.cleaned_objects++; 
        });

        // egg
        this.events.on("tower_scene_egg", () => {
            
            if (this.convo_array.length === 0) {
                this.camera.stopFollow(); 
                this.camera.startFollow(this.player, 0.2, 0.2, 50, 50);
                this.dialogueBox.visible = false;
                this.in_convo = false;

                //hide objects
                this.egg[0].active = false;
                this.egg[0].alpha = 0;
                this.harpy.active = false;
                this.harpy.alpha = 0;
            } else {
                this.camera.stopFollow();
                this.line = this.convo_array[0];
                this.speaker = this.characters[this.line.char_name];
                this.speaker_txt = this.line.dialogue;
                this.dialogueBox.x = this.speaker.x+32;
                this.dialogueBox.y = this.speaker.y+32; 
                this.dialogueBox.setText(this.speaker_txt);
                this.camera.startFollow(this.speaker);
                this.convo_array.shift();
            }
        });
        
        this.progress_text = this.add.text(100, 100, " ", {
            fontSize: '32px'
        }).setOrigin(0,0);

        this.playerpos = this.add.text(1180, 100, " ", {
            fontSize: '32px'
        }).setOrigin(0,0);

        progress = this.cleaned_objects/this.object_amount;
    }

    update() {
        let fDown = Phaser.Input.Keyboard.JustDown(keyF);
        
        if(!this.bgMusic.isPlaying)
         {
            this.bgMusic.play();
         }

        //detect collision with objects 
        if(this.physics.world.overlap(this.player, this.objects))
        {
            this.objects.getChildren().forEach(obj => 
            {
                if(fDown && obj.body.touching.none == false)
                {
                    this.player.cleaning = true;
                    this.player.setVelocityY(0);
                    this.player.body.setAllowGravity(false);
                    if(!obj.data.list.cleaned)
                    {
                        obj.data.list.cleaned = true;
                        this.sound.play('sweep_sfx');
                        obj.anims.play(obj.data.list.objectType + '_play');
                        obj.on('animationcomplete', () => {                        
                            this.events.emit("CLEANUP");
                            if(obj.data.list.remove)
                            {
                                obj.alpha = 0;  
                            }                
                            this.objects.remove(obj);   
                            this.player.cleaning = false;  
                            this.player.body.setAllowGravity(true);     
                        });
                    }
                }
            });
        }

        //detect collision with characters 
        if(this.physics.world.overlap(this.player, this.characterGroup))
        {
            if (fDown && this.physics.world.overlap(this.player, this.egg[0]))
            {
                this.convo_array = this.dialogue.script["tower_scene_egg"];
                this.in_convo = true; 
             }
        }

        if (this.in_convo) {
            if (fDown) {
                this.events.emit("tower_scene_egg");
            }
        } else {
            // place player movement controls here
            this.player.update();  
            
            // Animations
            if(this.player.cleaning) {
                this.player.play('clean_play', true);
            }
            else if(keySPACE.isDown && !this.player.cleaning) {    
                this.player.play('jump_play', true);
            }
            else if((keyD.isDown || keyA.isDown) && this.player.body.onFloor && !this.player.cleaning) { 
                this.player.play('walk_play', true);
            }  
            else {    
                this.player.play('idle_play', true); 
            }
            
            // Jump
            if (keySPACE.isDown && this.player.body.onFloor() && !this.player.cleaning) {
                this.player.setVelocityY(this.player.jumpStrength);
                this.sound.play('jump_sfx');
            }

            //Flip direction
            if (this.player.body.velocity.x < 0){
                this.player.setFlipX(true);
            }
            else if (this.player.body.velocity.x > 0 ){
                this.player.setFlipX(false);
            }
        }

        this.progress_text.x = this.camera.worldView.x + 10;
        this.progress_text.y = this.camera.worldView.y + 10;
        this.progress_text.text = this.cleaned_objects + "/" + this.object_amount;
        this.playerpos.x = this.camera.worldView.x + 980;
        this.playerpos.y = this.camera.worldView.y + 10;
        this.playerpos.text = "(" + Math.floor(this.player.x)
                                  + ", " 
                                  + Math.floor(this.player.y) + ")";

        if(!done)
        {
            progress = this.cleaned_objects / this.object_amount;
            if(progress > 0.8)
            {
                done = true;
            }
        }
        else
        {
            this.egg[0].active = true;
            this.egg[0].alpha = 1;
            this.harpy.active = true;
            this.harpy.alpha = 1;
        }
    }
}


