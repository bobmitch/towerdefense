import { State } from './state.js';
import { Map } from './map.js';

class Game {
    constructor() {
        this.start_ts = null;
        this.prev_ts = null;
        this.in_game_time = 0;
        this.id = "Tower Defense";
        this.map = null;
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
                window.requestAnimationFrame(window.game.step);
                console.log('starting new game');
            }
        });

        this.state_machine.transition('init'); // go from loading to mainmenu
    }

    step = function(ts) {
        if (window.game.start_ts == null) {
            window.game.start_ts = ts;
        }
        if (window.game.prev_ts) {
            var delta = ts - window.game.prev_ts;
            if (delta>0) {
                // some time has elapsed - div by zero not possible :)
                if (window.game.state_machine.state=='playing') {
                    window.game.in_game_time += delta;
                }
                //console.log(window.game.in_game_time);
            }
        }
        window.game.prev_ts = ts;
        window.requestAnimationFrame(window.game.step);
    }

}

export { Game };