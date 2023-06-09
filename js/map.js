import { Tile } from './tile.js';
import { Path } from './path.js';

function flip() {
    return ( (Math.floor(Math.random() *2))==0 );
}

class Map {
    constructor(config) {
        this.width = config.width ?? 24;
        this.height = config.height ?? 16;
        this.tiles=[];
        this.paths=[];
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
        // random level //
        this.make_random_path();
        // end random level //
    }

    get_passable_neighbours(px,py, diag=false) {
        // return array of passable coord pairs in map from point px,py
        var nb=[];
        for (var x=px-1; x<px+2; x++ ) {
            for (var y=py-1; y<py+2; y++) {
                if (x==px && y==py) {
                    continue; // ignore self please
                }
                if (x>=0 && x<this.width && y>=0 && y<this.height) {
                    // in bounds
                    if (this.tiles[x][y].passable) {
                        if (diag) {
                            nb.push({x:x,y:y});
                        }
                        else {
                            // ignore diags
                            if (!(x!=px && y!=py)) {
                                nb.push({x:x,y:y});
                            }
                        }
                    }
                }
            }
        }
        return nb;
    }

    make_random_path() {
        // make impassable to start
        for (var x=0; x<this.width; x++) {
            for (var y=0; y<this.height; y++) {
                this.tiles[x][y].passable = false;
                this.tiles[x][y].buildable = true;
            }
        }
        // from left edge to right edge
        var x = 0;
        var y = Math.floor(this.height/2);
        let start_end_y = Math.floor(this.height/2);
        var history=[];
        while (x<this.width) {
            if (x==this.width-1 && y==start_end_y) {
                // reached exit - which is passable!
                this.tiles[x][y].passable = true;
                this.tiles[x][y].buildable = false;
                break;
            }
            this.tiles[x][y].passable = true;
            this.tiles[x][y].buildable = false;
            history.push({x:x,y:y});
            if (flip() && flip()) {
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
            if (x<this.width-5 && history.length>0 && flip() && flip() && flip() && flip()) {
                // revisit old visited square randomly - but not near right hand edge
                var r = Math.floor(Math.random() * history.length);
                x = history[r].x;
                y = history[r].y;
            }
            if (x>=this.width) {
                x=this.width-1;
            }
        }
        return y; // return final y coord of 'exit'
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