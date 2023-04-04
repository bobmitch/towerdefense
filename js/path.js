import { PQ } from './heapq.js';

class Node {
    constructor(x,y, next=null, distance=99999) {
        this.x=x;
        this.y=y;
		this.next = next;
		this.distance = distance;
    }
}

class Path {
    constructor(amap,x1,y1,x2,y2) {
        // config requires map, x1, y1, x2, y2
        // coords determine start and end of path
        this.map = amap; // must be passed
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
        this.reset();
        let path_found = this.recalc();
        console.warn('Path found: ',path_found);
    }

    reset() {
        for (var x=0; x<this.map.width; x++) {
            for (var y=0; y<this.map.height; y++) {
                this.route[x][y] = new Node(x,y);
            }
        }
    }

    recalc() {
        /*
        """	dijkstra algorithm - works from exit to start fills all reachable nodes in map """
		path_found = False
		self.reset()
		Q = []
		visited = {}
		self.route[(self.end[0],self.end[1])].next=None
		self.route[(self.end[0],self.end[1])].distance=0	# dist to exit (end) node is going to be zero
		# create starting set Q, (binary heap) containing all nodes with exit node set to 0
		heappush (Q, self.route[(self.end[0],self.end[1])] )
		map = self.map
		nb = self.map.get_neighbours
		distance = 1	# default distance - changed to 1.4 for diagonals
		start=self.start		# set up local for speed
		self_route=self.route	# set up local for speed
		hpop = heappop			# set up local for speed
		hpush = heappush		# set up local for speed
		while Q:
			curnode = hpop (Q)	# pop next nearest node off top of binary heap
			if curnode.pos not in visited:
				curnode_pos = curnode.pos	# remove dot for speed
				visited[curnode_pos]=True
				neighbours = nb (curnode_pos)
				for pos in neighbours:
					if pos == start:
						path_found = True
					neighbour_node = self_route [(pos[0],pos[1])]
					if pos[0]<>curnode_pos[0] and pos[1]<>curnode_pos[1]:
						distance = 1.4
					else:
						distance = 1
					newdist = curnode.distance+distance
					if neighbour_node.distance > newdist:
						neighbour_node.next = curnode
						neighbour_node.distance = newdist
					if neighbour_node.pos not in visited:
						# if neighbour node not already fully processed, stick on priority queue for consideration
						hpush (Q, neighbour_node)
		return path_found
        */
        var path_found = false;
        this.reset();
        var Q = new PQ();
        var visited = [];
        var end_node = this.route[this.x2][this.y2]; 
        end_node.distance = 0; // distance to end is 0 :)
        end_node.next = null;
        Q.enqueue(end_node, end_node.distance);
        Q.dequeue();
        let max_proc = 9999;
        var cur_proc = 0;
        var first_run = true;
        while ( (Q.values.length>1 && cur_proc<max_proc) || first_run) {
            first_run = false; // ensure run at least once - PQ thing doesn't empty on final dequeue... :/
            cur_proc++;
            //console.log(cur_proc);
            var curnode = Q.dequeue().val;
            //console.log("CURNODE: ",curnode);
            if (!visited.includes(curnode)) {
                visited.push(curnode);
                var neighbours = this.map.get_passable_neighbours(curnode.x, curnode.y);
                neighbours.forEach(neighbour => {
                    if (neighbour.x==this.x1 && neighbour.y==this.y1) {
                        // this is start!
                        path_found = true;
                    }
                    let distance = curnode.distance+1;
                    var neighbour_node = this.route[neighbour.x][neighbour.y];
                    if (neighbour_node.distance > distance) {
                        neighbour_node.next = curnode;
                        neighbour_node.distance = distance;
                    }
                    if (!visited.includes(neighbour_node)) {
                        // neighbour node not processed, put on heap for consideration
                        Q.enqueue(neighbour_node, neighbour_node.distance);
                    }
                });
            }
        }
        return path_found;
    }
}

export { Path };