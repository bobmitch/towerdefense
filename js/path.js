import { PQ } from './heapq.js';

class Node {
    constructor(x,y, next=null, distance=99999) {
        this.x=x;
        this.y=y;
		this.next = next;
		this.distance = distance;
        this.visited = false;
    }
}

class Path {
    constructor(amap, x1,y1,x2,y2) {
        // config requires map, x1, y1, x2, y2
        // coords determine start and end of path
        this.map = amap;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.route = []; // array of nodes with dist + next 
        // create empty 2d array
        for (var x=0; x<this.map.width; x++) {
            let c=[];
            for (var y=0; y<this.map.height; y++) {
                c.push([]);
            }
            this.route.push(c);
        }
        // populate with nodes
        for (var x=0; x<this.map.width; x++) {
            for (var y=0; y<this.map.height; y++) {
                this.route[x][y] = new Node(x,y);
            }
        }

        let path_found = this.recalc();
        if (!path_found) {
            console.warn('Path not found: ', this);
        }
        else {
            //window.game.map.paths.push (new Path(window.game.map, 0, Math.floor(this.height/2), this.width-1, exit_y));
        }
    }

    reset() {
        for (var x=0; x<this.map.width; x++) {
            for (var y=0; y<this.map.height; y++) {
                this.route[x][y].visited = false;
                this.route[x][y].next = null;
                this.route[x][y].distance = 9999;
            }
        }
    }

    recalc() {
        var path_found = false;
        this.reset();
        var Q = new PQ();
        var end_node = this.route[this.x2][this.y2]; 
        end_node.distance = 0; // distance to end is 0 :)
        end_node.next = null;
        Q.enqueue(end_node, end_node.distance);
        while (Q.values.length>0) {
            var curnode = Q.dequeue().val;
            if (!curnode.visited) {
                var neighbours = this.map.get_passable_neighbours(curnode.x, curnode.y);
                neighbours.forEach(neighbour => {
                    //console.log('comparing cur node: ', curnode.x, curnode.y, ' to neighbor: ', neighbour.x, neighbour.y);
                    if (neighbour.x==curnode.x && neighbour.y==curnode.y) {
                        // this is start!
                        path_found = true;
                    }
                    let distance = curnode.distance+1;
                    var neighbour_node = this.route[neighbour.x][neighbour.y];
                    if (neighbour_node.distance > distance) {
                        neighbour_node.next = curnode;
                        neighbour_node.distance = distance;
                    }
                    if (!neighbour_node.visited) {
                        // neighbour node not processed, put on heap for consideration
                        Q.enqueue(neighbour_node, distance);
                    }
                });
                curnode.visited = true; // full processed node
            }
        }
        
        return path_found;
    }
}

export { Path };