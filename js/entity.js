class Entity {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.speed = 0;
        this.max_health = 5;
        this.health = 5;
        this.points = 100;
        this.money = 10;
        this.pathindex = config.pathindex ?? 0;
        this.direction = [1,0];
        this.r = 8; // radius, for hitbox ostensibly
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('entity');
        this.hb = document.createElement('DIV');
        this.hb.classList.add('hb');
        this.hb.dataset.status = "full";
        this.el.appendChild(this.hb); // add healthbar to entity div
        document.getElementById('entities').appendChild(this.el);
        this.time_alive=0;
        this.cur_cell = window.game.map.paths[this.pathindex].route[window.game.map.paths[this.pathindex].x1][window.game.map.paths[this.pathindex].y1];
        //this.next_cell = this.cur_cell.next;
        this.x = (this.cur_cell.x * window.game.tilesize) + window.game.htilesize; // center of init cell
        this.x = 0;
        this.y = (this.cur_cell.y * window.game.tilesize) + window.game.htilesize; // center of init cell
        this.z = config.z ?? 3; // z index?
    }

    damage(amount) {
        this.health -= amount;
        if (this.health<=0) {
            game.incmoney(this.money); 
            game.incscore(this.points); // todo: increase score based on path distance / time remaining in swarm / number of active swarms etc
            this.remove();
        }
        else {
            let hpc = 100/(this.max_health / this.health);
            if (hpc>80) {
                this.hb.dataset.status = 'fine';
            }
            else if (hpc>50) {
                this.hb.dataset.status = 'ok';
            }
            else if (hpc>25) {
                this.hb.dataset.status = 'bad';
            }
            else {
                this.hb.dataset.status = 'dire';
            }
            this.hb.style.width = (hpc).toString() + '%';
        }
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
        
        // set position (centered)
        this.el.style.left = (this.x - this.hw).toString() + 'px';
        this.el.style.top = (this.y - this.hh).toString() + 'px';

        // animation frame
        this.frame = Math.floor( (this.time_alive/this.framerate/10) % this.framecount);
        this.el.dataset.frame = this.frame;

        //console.log(this.frame);

        // check path situation
        // update path
        this.path_update();
        
    }

    path_update() {
        // did we reach/pass center of current target cell?
        let curcel_center_x = (this.cur_cell.x * window.game.tilesize) + window.game.htilesize;
        let curcel_center_y = (this.cur_cell.y * window.game.tilesize) + window.game.htilesize;
        // check if we passed center of current cell goal
        if ( 
            (this.direction[0]==1 && this.x >= curcel_center_x) || 
            (this.direction[0]==-1 && this.x <= curcel_center_x) || 
            (this.direction[1]==1 && this.y >= curcel_center_y) || 
            (this.direction[1]==-1 && this.y <= curcel_center_y) 
        ) {

            /* console.log('OLD');
            console.log(this.direction, this.x, this.y, curcel_center_x, curcel_center_y);
            console.log(this.cur_cell);
            console.log(this.next_cell); */

            // set x/y to match center of cur, then change cur and next
            this.x = curcel_center_x;
            this.y = curcel_center_y;

            if (!this.cur_cell.next) {
                // something broke our current path
            }
            else {
                if (this.cur_cell.x == this.cur_cell.next.x) {
                    this.direction[0]=0;
                    this.direction[1] = this.cur_cell.y < this.cur_cell.next.y ? 1 : -1;
                }
                else {
                    this.direction[1]=0;
                    this.direction[0] = this.cur_cell.x < this.cur_cell.next.x ? 1 : -1;
                }

                // current cell is now the next cell in the path 
                this.cur_cell = this.cur_cell.next;

                return true;
            }
            // reach here it's...
            // end of the line!!!
            this.end_of_line();
            game.declives();
                
            
            //document.getElementById(this.cur_cell.x.toString()+','+this.cur_cell.y.toString()).classList.add('curgoal');
            /* console.log('NEW');
            console.log(this.direction, this.x, this.y, curcel_center_x, curcel_center_y);
            console.log(this.cur_cell);
            console.log(this.next_cell); */
            //alert('next');
        }
    }

    end_of_line() {
        console.log('end of the line entity');
        this.remove();
    }

    remove() {
        this.el.remove();
        let index = game.entities.indexOf(this);
        if (index>-1) {
            game.entities.splice(index, 1);
        }
        else {
            console.warn('Unable to remove entity - could not determine index in array',this);
        }
    }
}

export { Entity };