// Play is the debugging sandbox scene that provides a 
// space to test objects and their interactions

class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    
    preload() {
        this.load.image('player', './Assets/Characters/ER-Player.png');
        this.load.image('platform', './Assets/Backgrounds/REDBRICKS.png');
        this.load.image('platform', './Assets/Backgrounds/awningRed.png');
        this.load.image('tiles', './Assets/Backgrounds/spritesheet.png');
        this.load.tilemapTiledJSON('map', './Assets/TestTower.json');
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

        // add tower to scene
        // this.tower = new Tower(0, 720);
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('Tower', 'tiles');
        this.platforms = this.map.createLayer('Platforms', this.tileset, 0, -1030);
        this.platforms.setCollisionByExclusion(-1, true);
        
        // add collisions between tower and player
        this.physics.add.collider(this.player, this.platforms);

        // reserve dialog box 
        let dialogStyle = {
                backgroundColor: '#5d5861',
                align: 'left',
                maxLines: '6',
                fontSize: '16px',
                fixedHeight: 100,
                fixedWidth: 175,
                wordWrap: { width: 165 }
            }
        
        let dialogBox = new DialogueBox (this, 50, 150, "This is a test.", dialogStyle);
        dialogBox.visible = false;
        // on key d down
        keyD.on('down', function(event) { 
            if (dialogBox.visible == false) {
                dialogBox.visible = true;
            } else {
                dialogBox.visible = false;
            }
        });
    } 

    update() {
        this.player.update();
        
        // restart scene
        if (keyR.isDown) {
            this.scene.restart();
        }
    }
}
