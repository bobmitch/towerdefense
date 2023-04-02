import { Tile } from './tile.js';

class Map {
    constructor(config) {
        this.width = config.width ?? 24;
        this.height = config.height ?? 16;
        this.tiles=[];
        this.scale = 1.0;
        for (var x=0; x<this.width; x++) {
            var row=[];
            for (var y=0; y<this.height; y++) {
                row.push( new Tile(x,y) );
            }
            this.tiles.push(row);
        }
        this.render();
    }

    render() {
        console.log('Rendering tiles');
        let tiles_el = document.getElementById('tiles');
        tiles_el.innerHTML = "";
        for (var y=0; y<this.height; y++) {
            for (var x=0; x<this.width; x++) {
                this.tiles[x][y].render(tiles_el);
            }
        }
    }
}

export { Map };