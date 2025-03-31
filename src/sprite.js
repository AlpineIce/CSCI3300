import { getGameContainer } from "./dom";

export class Sprite {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.constructed = false;
    }

    //invoke to add sprite to screen if not already on screen
    createSprite() {
        if(!this.constructed) {
            this.constructed = true;
            //TODO
        }
    }

    //invoke to remove the sprite from the screen
    removeSprite() {
        if(this.constructed) {
            this.constructed = false;
            //TODO
        }
    }

    setLocation(x, y) {
        this.location[0] = x;
        this.location[1] = y;
    }
    setWidth(width) { this.width = width; }
    setHeight(height) { this.height = height; }

    getLocation() {
        return this.location;
    }
    getWidth() { return this.width; }
    getHeight() { return this.height; }
}