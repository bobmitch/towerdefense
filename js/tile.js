class Tile {
    constructor(config) {
        this.bg = Math.floor(Math.random()*160);
        this.passable = config.passable ?? true;
        this.buildable = config.buildable ?? true;
        this.x = config.x ?? 0;
        this.y = config.y ?? 0;
    }
    
    render(el) {
        var tile = document.createElement('DIV');
        tile.style.left = (this.x * 64).toString() + 'px';
        tile.style.top = (this.y * 64).toString() + 'px';
        tile.classList.add('tile');
        tile.dataset.tile = this.bg;
        tile.dataset.x = this.x;
        tile.dataset.y = this.y;
        if (this.passable) {
            tile.classList.add('passable');
        }
        if (this.buildable) {
            tile.classList.add('buildable');
        }

        // bg tilemap is 10x16 - tile is 32px
        var tx = Math.floor(this.bg / 10) * 64;
        var ty = (this.bg % 16) * 64;
        tile.style.backgroundPositionX = '-' + tx.toString() + 'px';
        tile.style.backgroundPositionY = '-' + ty.toString() + 'px';

        // see if tile needs other elements inside
        // e.g. if passable check neighbors to determine path img
        if (this.passable) {
            var path_el = document.createElement('DIV');
            path_el.classList.add('path');
            // put path el inside tile
            tile.appendChild(path_el);
        }
        el.appendChild(tile);
    }
}

export { Tile };