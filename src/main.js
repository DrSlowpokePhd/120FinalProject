/* 
Collision detection and tilemap implementation was done using help from these sources:
https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
https://photonstorm.github.io/phaser3-docs/index.html

font loading in index.html courtesy of https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3-->
fonts used: Eight Bit Dragon by Chequered Ink (Non-Commercial Freeware)
https://www.fontspace.com/eight-bit-dragon-font-f30428
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
            debug: false
        },

    },
    scene: [Title, Credits, Start, Instructions, Play, Tower1, Ending1, Ending2]
};
console.log("in main.js");
let game = new Phaser.Game(config);
// reserve keys
let keyW, keyA, keyS, keyD, keyR, keyF, keyT, keyP;
let key1, key2, key3;
let keySPACE;
// declare variables to be used in Tower1.js
let keyHoldDuration, keyHoldDurationDebug;
let progress = 0;
let done = false;