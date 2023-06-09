import { Tower } from './tower.js';
import { Projectile } from './projectile.js';

class Gun1 extends Tower {
    constructor(config) {
        super(config);
        this.className = 'Gun1';
        this.type = 'gun1';
        this.range = 256;
        this.rotates = true;
        this.target_method = 'closest';
        this.imageset = '/td/tiles/towers_beta.png';
        this.hw = this.width/2;
        this.hh = this.height/2;
        this.el.classList.add('gun1');
        this.rof = 1; // shots per sec
        this.last_fired = 0;
        this.angle = 0;
        this.max_level = 4;
        console.log("Gun 1 created!");
    }

    update(d) {
        this.time_alive+=d;
        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;
        let near_entities = this.get_entities_within_range();
        if (near_entities.length>0) {
            if (this.target_method=='closest') {
                let closest_entity = this.get_closest(near_entities);
                if (closest_entity) {
                    // have a target - snap rotate
                    let actual_angle = window.get_angle(this.x, this.y, closest_entity.x, closest_entity.y);
                    this.angle = -270 + actual_angle; // rotation css angle
                    this.el.style.transform = "rotate(" + this.angle.toString() + "deg)";
                    if ( (this.time_alive - this.last_fired) > (1/this.rof * 1000) ) {
                        // ready to fire
                        let rad = actual_angle * (Math.PI/180); // todo - make faster
                        var dir=[0,0];
                        dir[0] = Math.cos(rad);
                        dir[1] = Math.sin(rad);
                        window.game.projectiles.push ( new Projectile({x:this.x, y:this.y, fired_by:this, direction:dir, damage:2+(this.level), speed:40+(this.level*20)}));
                        this.last_fired = this.time_alive;
                    }
                }
            }
        }
    }

    custom_upgrade() {
        this.range = 256 + (16 * this.level);
        this.rof = this.level * 1.1;
        console.log('custom tower upgrade applied');
    }

}

export { Gun1 };