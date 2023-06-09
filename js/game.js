import { State } from './state.js';
import { Map } from './map.js';
import { Entity } from './entity.js';
import { Zombie } from './zombie.js';
import { Gun1 } from './gun1.js';
import { Path } from './path.js';

class Game {
    constructor() {
        this.place_tower = null;
        this.place_tower_cost = 0;
        this.lives = 50;
        this.money = 200;
        this.score = 0;
        this.start_ts = null;
        this.prev_ts = null;
        this.in_game_time = 0;
        this.id = "Tower Defense";
        this.map = null;
        this.tilesize = 64;
        this.htilesize = 32;
        this.cam = {x:0,y:0,z:0}
        this.entities = [];
        this.towers = [];
        this.projectiles = [];
        this.state_machine_config = {
            init: 'loading',
            states:{
                loading:{
                    actions:[]
                },
                mainmenu:{
                    actions:[]
                },
                playing:{
                    actions:[]
                },
                paused:{
                    actions:[]
                },
                exit:{
                    actions:[]
                }
            },
            transitions: {
                init:{ from: 'loading',  to: 'mainmenu' },
                quit:{ from: ['mainmenu','paused'], to: 'exit'  },
                start:{from:'mainmenu', to:'playing' },
                pause:{ from: 'playing', to: 'paused'    },
                unpause:{ from: 'paused', to: 'playing' }
            }
        }
        this.state_machine = new State(this.state_machine_config);

        // add actions to states
        this.state_machine.states.mainmenu.actions.push(function(transition_name){
            console.log('display main menu');
        });
        // start game from main menu to playing
        this.state_machine.states.playing.actions.push(function(transition_name){ 
            if (transition_name=='start') {
                window.game.start_ts = null;
                window.game.map = new Map('random'); 
                window.game.map.paths.push (new Path(window.game.map, 0, Math.floor(window.game.map.height/2), window.game.map.width-1, Math.floor(window.game.map.height/2)));
                if (window.debug) {
                    for (var x=0; x<game.map.width; x++) {
                        for (var y=0; y<game.map.height; y++) {
                            let tn = document.createElement('P');
                            tn.innerText = game.map.paths[0].route[x][y].distance;
                            document.getElementById(x.toString() + "," + y.toString()).appendChild(tn);
                        }
                    }
                }
                
                window.game.map.render();
                
                window.requestAnimationFrame(window.game.step);
                console.log('starting new game');
            }
        });

        this.state_machine.transition('init'); // go from loading to mainmenu

        this.setmoney(this.money);
    }

    setmoney(v) {
        this.money = v;
        document.getElementById('money').innerText = this.money;
    }
    incmoney(v) {
        this.money = this.money + v;
        document.getElementById('money').innerText = this.money;
    }
    decmoney(v) {
        this.money = this.money - v;
        document.getElementById('money').innerText = this.money;
    }

    incscore(v) {
        this.score += v;
        document.getElementById('score').innerText = this.score;
    }

    declives() {
        this.lives--;
        document.getElementById('lives').innerText = this.lives;
    }

    setcam(v3) {
        this.cam = v3;
        this.updatecam();
    }
    updatecam() {
        console.log('Updating cam: ',this.cam)
        let map = document.getElementById('map');
        map.style.transform = "translateX(" + this.cam.x.toString() + "px) translateY(" + this.cam.y.toString() + 'px) ';
    }

    update_entities(d) {
        this.entities.forEach(e => {
            e.update(d);
        });
        this.towers.forEach(t => {
            t.update(d);
        });
        this.projectiles.forEach(p => {
            p.update(d);
        });
    }

    step = function(ts) {
        if (window.game.start_ts == null) {
            window.game.start_ts = ts;
        }
        if (window.game.prev_ts) {
            var delta = ts - window.game.prev_ts;
            if (delta>0 && delta<9999) {
                // some reasonable time has elapsed - div by zero not possible :)
                if (window.game.state_machine.state=='playing') {
                    window.game.in_game_time += delta;
                    window.game.update_entities(delta);
                }
                //console.log(window.game.in_game_time);
            }
        }
        window.game.prev_ts = ts;
        window.requestAnimationFrame(window.game.step);
    }
    
}

export { Game };

