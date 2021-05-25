class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.jumpStrength = 290;
        this.h_movespeed = 4;  
        this.canJump = true;
        scene.add.existing(this);
        scene.physics.add.existing(this, 0);
    }

    create() {
        
    }

    update() {
        // console.log(this.canJump);
        if (keyUP.isDown) {
            // console.log(this.canJump);
            if (this.canJump) {
                this.setY (this.y - this.jumpStrength);
                this.canJump = false;         
                this.timer = this.scene.time.addEvent({ 
                    delay: 1000, 
                    paused: false, 
                    callback: () => {
                        this.canJump = true;
                    }
                });
            }
        } else if (keyDOWN.isDown) {
            if (this.canJump) {
                this.setY (this.y + this.jumpStrength);
                this.canJump = false;         
                this.timer = this.scene.time.addEvent({ 
                    delay: 1000, 
                    paused: false, 
                    callback: () => {
                        this.canJump = true;
                    }
                });
            }
        }
        if (keyLEFT.isDown) {
            this.x -= this.h_movespeed;
        } else if (keyRIGHT.isDown) {
            this.x += this.h_movespeed;
        }
    }
}
