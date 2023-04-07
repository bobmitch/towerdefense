import { Entity } from './entity.js';

class Zombie extends Entity {
    constructor(config) {
        super(config);
        this.type = 'zombie';
        this.speed = 10;
        this.imageset = '/td/tiles/Zombie_Small.png';
        this.width = 32;
        this.height = 32;
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.framecount=4;
        this.framerate=15;
        this.el.classList.add('zombie');
        console.log("Zombie created!");
        console.log(this);
    }

}

export { Zombie };