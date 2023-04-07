class Projectile {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.fired_by = config.fired_by ?? null;
        this.speed = 100;
        this.width = 4;
        this.height = 4;
        this.direction = config.direction ; // unit vector array .e.g [1,0]
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('projectile');
        this.time_alive=0;
        this.x = config.x - this.width/2; 
        this.y = config.y - this.height/2; 
        this.z = config.z ?? 3; // z index?
        document.getElementById('projectiles').appendChild(this.el);
    }

    update(d) {
        this.time_alive+=d;
        
        // move
        this.x += this.speed * (this.direction[0]/d);
        this.y += this.speed * (this.direction[1]/d);

        // set position 
        this.el.style.left = this.x.toString() + 'px';
        this.el.style.top = this.y.toString() + 'px';

        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;

        if (
            this.x > window.game.tilesize * window.game.map.width || 
            this.x < 0 ||
            this.y < 0 || 
            this.y > window.game.tilesize * window.game.map.height
            ) {
                // projectile OUT OF BOUNDS
            this.remove();
        }
    }

   

    remove() {
        this.el.remove();
        let index = game.projectiles.indexOf(this);
        if (index>-1) {
            game.projectiles.splice(index, 1);
        }
        else {
            console.warn('Unable to remove projectile - could not determine index in array',this);
        }
    }
}

export { Projectile };