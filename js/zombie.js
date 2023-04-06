import { Entity } from './entity.js';

class Zombie extends Entity {
    constructor(config) {
        super(config);
        this.type = 'zombie';
        this.speed = 10;
        this.imageset = '/td/tiles/Zombie_Small.png';
        this.width = 16;
        this.height = 16;
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.framecount=4;
        this.framerate=15;
        this.el.classList.add('zombie');
        console.log("Zombie created!");
        console.log(this);
    }

    update(ts, game) {
        // speed
        this.x += this.speed * (1/ts);
        this.y += this.speed * 0.5 * (1/ts);
        // set position (centered)
        this.el.style.left = (this.x - this.hw).toString() + 'px';
        this.el.style.top = (this.y - this.hh).toString() + 'px';
        // frame
        this.time_alive+=ts;
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;
        //console.log(this.frame);
    }

    render() {

    }
}

export { Zombie };