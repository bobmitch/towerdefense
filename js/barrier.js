import { Tower } from './tower.js';

class Barrier extends Tower {
    constructor(config) {
        super(config);
        this.type = 'barrier';
        this.range = 256;
        this.rotates = true;
        this.target_method = 'none';
        this.imageset = '/td/tiles/towers_beta.png';
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.el.classList.add('barrier');
        this.rof = 1; // shots per sec
        this.last_fired = 0;
        this.angle = 0;
        console.log("Barrier created!");
    }

    update(d) {
        this.time_alive+=d;
        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;
    }

}

export { Barrier };