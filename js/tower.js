class Tower {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.xcoord = config.x ?? 0;
        this.ycoord = config.y ?? 0;
        this.width = config.width ?? 12;
        this.height = config.height ?? 26;
        this.pathindex = config.pathindex ?? 0;
        this.direction = [1,0];
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.el = document.createElement('DIV');
        this.el.classList.add('tower');
        this.time_alive=0;
        this.x = ((this.xcoord * window.game.tilesize) + window.game.htilesize) - this.width/2; 
        this.y = ((this.ycoord * window.game.tilesize) + window.game.htilesize) - this.height/2; 
        this.z = config.z ?? 3; // z index?
        this.el.style.left = (this.x).toString() + 'px';
        this.el.style.top = (this.y).toString() + 'px';
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
}

export { Tower };