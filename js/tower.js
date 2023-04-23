function dist(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt( x*x + y*y );
}

window.get_angle = function(cx, cy, ex, ey) {
    // from https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

class Tower {
    constructor(config={}) {
        this.className = 'Tower';
        this.type = config.type ?? 'none';
        this.xcoord = config.x ?? 0;
        this.ycoord = config.y ?? 0;
        this.width = config.width ?? 12;
        this.height = config.height ?? 26;
        this.pathindex = config.pathindex ?? 0;
        this.direction = [1,0];
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.range = config.range ?? 32;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('tower');
        this.time_alive=0;
        this.x = ((this.xcoord * window.game.tilesize) + window.game.htilesize); 
        this.y = ((this.ycoord * window.game.tilesize) + window.game.htilesize); 
        this.tlx = this.x - this.width/2; 
        this.tly = this.y - this.width/2; 
        this.z = config.z ?? 3; // z index?
        this.el.style.left = (this.tlx).toString() + 'px';
        this.el.style.top = (this.tly).toString() + 'px';

        this.level = config.level ?? 1;
        this.maxlevel = config.maxlevel ?? 3;
        this.base_cost = config.base_cost ?? 5;
        this.upgrade_cost_multipliers = [2]; // defaults to 2
        this.placement = 'buildable'; // buildable or path - more to come?

        document.getElementById('towers').appendChild(this.el);
        console.log('Tower created',this);
    }


    update(d) {
        this.time_alive+=d;
        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;
    }

    remove() {
        this.el.remove();
        let index = game.towers.indexOf(this);
        if (index>-1) {
            game.tower.splice(index, 1);
        }
        else {
            console.warn('Unable to remove tower - could not determine index in array',this);
        }
    }

    cost() {
        // calc cost based on current level
        if (this.level==1) {
            return this.base_cost;
        }
        let index = this.level-1;
        if (this.level > this.upgrade_cost_multipliers.length) {
            return this.base_cost * this.upgrade_cost_multipliers[index];
        }
        else {
            return this.base_cost * this.upgrade_cost_multipliers[this.upgrade_cost_multipliers.length-1];
        }
    }

    get_entities_within_range() {
        var near = [];
        window.game.entities.forEach(e => {
            let d = dist(this.x, this.y, e.x, e.y);
            if (d < this.range) {
                near.push({entity:e, range:d});
            }
        });
        return near;
    }

    get_closest(nearlist) {
        // nearlist is array of objects {entity, range}
        var closest = null;
        var min_d = 99999;
        nearlist.forEach(n => {
            if (n.range < min_d) {
                closest = n.entity;
                min_d = n.range;
            }
        });
        return closest;
    }
}

export { Tower };