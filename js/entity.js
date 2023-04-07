class Entity {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.speed = 0;
        this.direction = [1,0];
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('entity');
        this.time_alive=0;
        // initial pos based on path
        console.log('zombie path: ',window.game.map.path);
        this.cur_cell = window.game.map.path.route[window.game.map.path.x1][window.game.map.path.y1];
        this.next_cell = this.cur_cell.next;
        this.x = (this.cur_cell.x * window.game.tilesize) + window.game.htilesize; // center of init cell
        this.x = 0;
        this.y = (this.cur_cell.y * window.game.tilesize) + window.game.htilesize; // center of init cell
        this.z = config.z ?? 3; // z index?
        document.getElementById('entities').appendChild(this.el);
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

            if (this.cur_cell.x==this.next_cell.x) {
                this.direction[0]=0;
                this.direction[1] = this.cur_cell.y < this.next_cell.y ? 1 : -1;
            }
            else {
                this.direction[1]=0;
                this.direction[0] = this.cur_cell.x < this.next_cell.x ? 1 : -1;
            }

            this.cur_cell = window.game.map.path.route[this.next_cell.x][this.next_cell.y];
            this.next_cell = window.game.map.path.route[this.cur_cell.next.x][this.next_cell.next.y];
            
            //document.getElementById(this.cur_cell.x.toString()+','+this.cur_cell.y.toString()).classList.add('curgoal');
            /* console.log('NEW');
            console.log(this.direction, this.x, this.y, curcel_center_x, curcel_center_y);
            console.log(this.cur_cell);
            console.log(this.next_cell); */
            //alert('next');
        }
    }
}

export { Entity };