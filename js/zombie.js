import { Sprite } from './sprite.js';

class Zombie extends Sprite {
    constructor(config) {
        super(config);
        this.type = 'zombie';
        this.speed = 10;
        this.imageset = '/td/tiles/Zombie_Small.png';
        this.tilesize = 16;
        this.el.classList.add('zombie');
        console.log("Zombie created: ");
        console.log(this);
    }

    update(ts, game) {
        this.x += this.speed * (1/ts);

    }

    render() {

    }
}

export { Zombie };