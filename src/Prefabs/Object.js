class Object extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);    
        this.interacted = false; // flag to state if object has been interacted
        this.type = 'Object'; // type flag to pass to Player object on interact
    }

    getCorners() {
        // assumes that origin is (0.5, 0.5) and 
        // that width and length are even
        // top left corner
        let topLeft = new Vector2 (obj.x - (obj.width/2), obj.y - (obj.height/2));

        // bottom right corner
        let bottomRight = new Vector2 (obj.x + (obj.width/2), obj.y + (obj.height/2));

        // top right corner
        let topRight = new Vector2 (obj.x + (obj.width/2), obj.y - (obj.height/2));

        // bottom left corner
        let bottomLeft = new Vector2 (obj.x - (obj.width/2), obj.y + (obj.height/2));

        return [topLeft, topRight, bottomLeft, bottomRight];
    }

    interact(mode = 'dissapear') { 
        // mode can be 'dissapear' or 'change'
        // dissapear makes the object dissapear
        // change forces the object to change frame/texture
        console.log("object interacted");
        this.interacted = true;
        if (mode == 'dissapear') {
            this.visible = false;
        } else if (mode == 'change') {
            // change frame
        }
    }
}
