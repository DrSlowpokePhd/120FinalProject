/* 
Collision detection and tilemap implementation was done using help from these sources:
https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
https://photonstorm.github.io/phaser3-docs/index.html
*/

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
            gravity: {y: 1000},
            tileBias: 64,
            debug: true
        },

    },
    scene: [Menu, Play, Tower1]
};
console.log("in main.js");
let game = new Phaser.Game(config);
// reserve arrow keys and wasd
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let keyW, keyA, keyS, keyD, keyR;
// reserve spacebar
let keySPACE;

