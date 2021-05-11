class Menu extends Phaser.Scene  {
    constructor() {
       super("Main Menu"); 
    }
    // this is where we put the main menu

    create() {
        keyUP = this.input.keyboard.addKey('UP');
        keyDOWN = this.input.keyboard.addKey('DOWN');
        keyLEFT = this.input.keyboard.addKey('LEFT');
        keyRIGHT = this.input.keyboard.addKey('RIGHT');
    }
}

