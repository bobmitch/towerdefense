import { Entity } from './entity.js';

class Zoomie extends Entity {
    constructor(config) {
        super(config);
        this.type = 'zoomie';
        this.speed = 16;
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
        this.framerate=31;
        this.el.classList.add('zoomie');
        console.log("Zoomie created!");
        console.log(this);
    }

}

export { Zoomie };