class Tile {
    constructor(x,y) {
        this.bg = Math.floor(Math.random()*160);
        this.passable = true;
        this.buildable = true;
        this.x = x;
        this.y = y;
    }
    
    render(el) {
        var tile = document.createElement('DIV');
        tile.style.left = (this.x * 64).toString() + 'px';
        tile.style.top = (this.y * 64).toString() + 'px';
        tile.classList.add('tile');
        tile.dataset.tile = this.bg;
        tile.dataset.x = this.x;
        tile.dataset.y = this.y;
        //tile.innerText = this.bg;

        // bg tilemap is 10x16 - tile is 32px
        var tx = Math.floor(this.bg / 10) * 64;
        var ty = (this.bg % 10) * 64;
        tile.style.backgroundPositionX = tx.toString() + 'px';
        tile.style.backgroundPositionY = ty.toString() + 'px';
        el.appendChild(tile);
    }
}

export { Tile };