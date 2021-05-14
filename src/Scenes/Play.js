class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    
    preload() {
        this.load.image('player', './Assets/Sprites/ER-Player.png');
        this.load.image('platform', './Assets/Sprites/platform.png');
    }

    create() {
        this.player = new Player (this, 640, 360, 'player');
        this.ground = new Platform (this, 640, 720, 'platform');
        this.physics.world.setBounds();   
        keyUP = this.input.keyboard.addKey('UP');
        keyDOWN = this.input.keyboard.addKey('DOWN');
        keyLEFT = this.input.keyboard.addKey('LEFT');
        keyRIGHT = this.input.keyboard.addKey('RIGHT');
        keyR = this.input.keyboard.addKey('R');
        keySPACE = this.input.keyboard.addKey('SPACE');
    } 

    update() {
        this.player.update();
        if (keyR.isDown) {
            this.scene.restart();
        }

        this.physics.add.collider(this.player, this.ground);
    }
}
