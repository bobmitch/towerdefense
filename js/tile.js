class Tile {
    constructor(config) {
        this.bg = Math.floor(Math.random()*160);
        this.passable = config.passable ?? true;
        this.buildable = config.buildable ?? true;
        this.x = config.x ?? 0;
        this.y = config.y ?? 0;
    }

    get_path_bg_pos(map) {
        // for this tile, if passable, return bg pos tuple of dirtpath tiles
        var l = true;
        var t = true;
        var r = true;
        var b = true;
        if (this.x>0) {
            if (!map.tiles[this.x-1][this.y].passable) {
                l = false;
            }
        }
        if (this.y>0) {
            if (!map.tiles[this.x][this.y-1].passable) {
                t = false;
            }
        }
        if (this.x<map.width-1) {
            if (!map.tiles[this.x+1][this.y].passable) {
                r = false;
            }
        }
        if (this.y<map.height-1) {
            if (!map.tiles[this.x][this.y+1].passable) {
                b = false;
            }
        }
        
        // row 1
        if (!l && !t && r && b) {
            return ['-1px','-1px'];
        }
        else if (l && !t && r && b) {
            return ['-64px','-1px'];
        }
        else if (l && !t && !r && b) {
            return ['-128px','-1px'];
        }
        else if (!l && !t && !r && b) {
            return ['-192px','-1px'];
        }
        // row 2
        else if (!l && t && r && b) {
            return ['-1px','-64px'];
        }
        else if (l && t && r && b) {
            return ['-64px','-64px'];
        }
        else if (l && t && !r && b) {
            return ['-128px','-64px'];
        }
        else if (!l && t && !r && b) {
            return ['-192px','-64px'];
        }
        // row 3
        else if (!l && t && r && !b) {
            return ['-1px','-128px'];
        }
        else if (l && t && r && !b) {
            return ['-64px','-128px'];
        }
        else if (l && t && !r && !b) {
            return ['-128px','-128px'];
        }
        else if (!l && t && !r && !b) {
            return ['-192px','-128px'];
        }
        // row 4
        else if (!l && !t && r && !b) {
            return ['-1px','-192px'];
        }
        else if (l && !t && r && !b) {
            return ['-64px','-192px'];
        }
        else if (l && !t && !r && !b) {
            return ['-128px','-192px'];
        }
        // no surrounding paths
        return ['-192px','-192px'];
    }
    
    render(el, map) {
        // el = tile element passed from map
        // pass map for path logic - need neighbor info
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
            var bg_pos = this.get_path_bg_pos(map);
            path_el.style.backgroundPositionX = bg_pos[0];
            path_el.style.backgroundPositionY = bg_pos[1];
            // put path el inside tile
            tile.appendChild(path_el);
        }
        el.appendChild(tile);
    }
}

export { Tile };