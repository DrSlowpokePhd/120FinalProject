class Tower1 extends Phaser.Scene {
    constructor() {
        super("tower_1");
        console.log("in tower scene");
    } 

    preload() {
        this.load.image('player', './Assets/Sprites/ER-Player.png');
        this.load.image('platform', 'Assets/Sprites/awningRed.png');
        this.load.image('tiles', 'Assets/Sprites/spritesheet.png');
        this.load.tilemapTiledJSON('map', 'Assets/Sprites/TestTower.json'); 
    }

    create() {
        this.player = new Player (this, 100, 600, 'player');
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
    }

    update() {
        this.player.update();
        
        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }
    }
}
