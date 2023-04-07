import { Tower } from './tower.js';

class Gun1 extends Tower {
    constructor(config) {
        super(config);
        this.type = 'gun1';
        this.rotates = true;
        this.target = 'nearest';
        this.imageset = '/td/tiles/towers_beta.png';
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.el.classList.add('gun1');
        console.log("Gun 1 created!");
    }

}

export { Gun1 };