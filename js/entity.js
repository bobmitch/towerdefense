class Entity {
    constructor(config={}) {
        this.type = config.type ?? 'none';
        this.speed = 0;
        this.frame = config.frame ?? 0;
        this.framecount = config.frame ?? 1;
        this.framerate = config.framerate ?? 8; // fps
        this.x = config.x ?? 0;
        this.y = config.y ?? 0;
        this.z = config.z ?? 3; // z index?
        this.el = document.createElement('DIV');
        this.el.classList.add('entity');
        this.time_alive=0;
        this.path = null;
        document.getElementById('entities').appendChild(this.el);
    }

    update(d, game) {
        this.time_alive+=d;
    }

    render() {

    }
}

export { Entity };