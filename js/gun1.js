import { Tower } from './tower.js';

class Gun1 extends Tower {
    constructor(config) {
        super(config);
        this.type = 'gun1';
        this.range = 64;
        this.rotates = true;
        this.target = 'nearest';
        this.imageset = '/td/tiles/towers_beta.png';
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.el.classList.add('gun1');
        console.log("Gun 1 created!");
    }

    update(d) {
        this.time_alive+=d;
        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;
        let near_entities = this.get_entities_within_range();
        if (near_entities.length>0) {
            console.log(near_entities);
        }
    }

}

export { Gun1 };