import { PQ } from './heapq.js';

class Node {
    constructor(x,y) {
        this.x=x;
        this.y=y;
		this.next = null;
		this.distance=9999999;
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
        this.route = [];
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
        this.recalc();
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
        this.route[this.x2][this.y2].next = null;
        this.route[this.x2][this.y2].distance = 0; // distance to exit is zero :)
        console.log('HEAPQ',Q);
        //heappush (Q, this.route[this.x2][this.y2]);
    }
}

export { Path };