class Entity {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.speed = 0;
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
        console.log('CUR CELL', this.cur_cell);
        console.log('NEXT CELL', this.next_cell);
        this.x = (this.cur_cell.x * 64) + 32; // center of init cell
        this.y = (this.cur_cell.y * 64) + 32; // center of init cell
        this.z = config.z ?? 3; // z index?
        document.getElementById('entities').appendChild(this.el);
    }

    update(d, game) {
        this.time_alive+=d;
    }

    render() {

    }
}

export { Entity };