import { Tile } from './tile.js';

function flip() {
    return ( (Math.floor(Math.random() *2))==0 );
}

class Map {
    constructor(config) {
        this.width = config.width ?? 24;
        this.height = config.height ?? 16;
        this.tiles=[];
        // empty 2d array
        for (var n=0; n<Math.max(this.height, this.width); n++) {
            this.tiles.push([]);
        }
        this.scale = 1.0;
        for (var x=0; x<this.width; x++) {
            var row=[];
            for (var y=0; y<this.height; y++) {
                var tile = new Tile ({ x:x, y:y, passable:false, buildable:true });
                this.tiles[x][y] = tile;
            }
        }
        this.make_random_path();
        this.render();
    }

    make_random_path() {
        // make impassable to start
        for (var x=0; x<this.width; x++) {
            for (var y=0; y<this.height; y++) {
                this.tiles[x][y].passable = false;
            }
        }
        // from left edge to right edge
        var x=0;
        var y=Math.floor(Math.random() * this.height);
        while (x<this.width) {
            this.tiles[x][y].passable = true;
            if (flip()) {
                x++;
            }
            else {
                if (flip()) {
                    y+=1;
                }
                else {
                    y-=1;
                }
                if (y>=this.height) {
                    y=this.height-1;
                }
                if (y<0) {
                    y=0;
                }
            }
            
        }
    }

    render() {
        console.log('Rendering tiles');
        let tiles_el = document.getElementById('tiles');
        tiles_el.innerHTML = "";
        for (var y=0; y<this.height; y++) {
            for (var x=0; x<this.width; x++) {
                this.tiles[x][y].render(tiles_el, this);
            }
        }
    }
}

export { Map };