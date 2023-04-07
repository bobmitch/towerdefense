class Projectile {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.fired_by = config.fired_by ?? null;
        this.speed = 0;
        this.width = 8;
        this.height = 8;
        this.direction = {x:1,y:0} ; // unit vector
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('projectile');
        this.time_alive=0;
        this.xcoord = config.x ?? 0;
        this.ycoord = config.y ?? 0;
        this.x = ((this.xcoord * window.game.tilesize) + window.game.htilesize) - this.width/2; 
        this.y = ((this.ycoord * window.game.tilesize) + window.game.htilesize) - this.height/2; 
        this.z = config.z ?? 3; // z index?
        document.getElementById('projectiles').appendChild(this.el);
    }

    update(d) {
        this.time_alive+=d;
        
        // move
        if (this.direction[0]) {
            this.x += this.speed * (this.direction[0]/d);
        }
        else {
            this.y += this.speed * (this.direction[1]/d);
        }
        // set position 
        this.el.style.left = (this.x - this.hw).toString() + 'px';
        this.el.style.top = (this.y - this.hh).toString() + 'px';
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
            this.remove;
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