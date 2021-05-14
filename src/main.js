// main.js is the place to put all of the 
// variables you will need to access anywhere
// in the game

// config size to be 1280 by 720,
// use arcade physics, and use the
// canvas rendering mode
let config = {
    width: 1280,
    height: 720,
    type: Phaser.CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000}
        },

    },
    scene: [Menu, Play]
};
console.log("in main.js");
let game = new Phaser.Game(config);
// reserve arrow keys and wasd
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let keyW, keyA, keyS, keyD, keyR;
// reserve spacebar
let keySPACE;

