import { Entity } from './entity.js';

class Zombie extends Entity {
    constructor(config) {
        super(config);
        this.type = 'zombie';
        this.speed = 10;
        this.points = 100;
        this.money = 30;
        this.imageset = '/td/tiles/Zombie_Small.png';
        this.width = 32;
        this.max_health = 12;
        this.health = this.max_health;
        this.r = this.width / 2;
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