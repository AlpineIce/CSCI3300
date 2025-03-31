import { addResizeEvent, removeResizeEvent } from "./dom.js";

export class Sprite {
    constructor(scale) {
        this.scale = scale;
        this.constructed = false;
    }

    //invoke to add sprite to screen if not already on screen
    createSprite() {
        if(!this.constructed) {
            this.constructed = true;
            addResizeEvent(this, () => {
                console.log("Resize sprite" + this);
            });
        }
    }

    //invoke to remove the sprite from the screen
    removeSprite() {
        if(this.constructed) {
            this.constructed = false;
            removeResizeEvent(this);
        }
    }

    setLocation(x, y) {
        this.location[0] = x;
        this.location[1] = y;
    }
    setScale(scale) { this.scale = scale; }

    getLocation() { return this.location; }
    getScale() { return this.scale; }
}