class Menu extends Phaser.Scene  {
    constructor() {
       super("Main Menu"); 
    }
    // this is where we put the main menu

    create() {
        console.log("Main Menu");
    }

    update() {
        this.scene.start('playscene');
    }
}

