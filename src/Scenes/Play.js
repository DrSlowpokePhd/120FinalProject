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
        keyD = this.input.keyboard.addKey('D');
        // reserve dialog box 
        let dialogStyle = {
                backgroundColor: '#5d5861',
                align: 'left',
                maxLines: '6',
                fontSize: '16px',
                fixedHeight: 100,
                fixedWidth: 175,
                wordWrap: { width: 260 }
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
        
        // press d to open text dialog box
        if (keyD.isDown) {
            
        }
        this.physics.add.collider(this.player, this.ground);
    }
}
