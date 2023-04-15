import { Game } from './js/game.js';
import { Zombie } from './js/zombie.js';
import { Zoomie } from './js/zoomie.js';
import { Gun1 } from './js/gun1.js';
import { Barrier } from './js/barrier.js';
import { Path } from './js/path.js';

window.game = new Game();
window.debug = false;

function rr(a,b) {
    return a + (Math.floor(Math.random() * b));
}

window.pick_up_tower = function(tower_btn) {
    let cost = parseInt(tower_btn.dataset.cost);
    if (cost<=game.money) {
        game.place_tower = tower_btn.dataset.tower;
        game.place_tower_placement = tower_btn.dataset.placement;
        game.place_tower_cost = cost;
        document.body.dataset.mode = 'place_tower_' + game.place_tower_placement;
    }
    else {
        // can't afford it
        console.warn('Not enough money sir');
    }
}

document.addEventListener('click',function(e){
    if ( (document.body.dataset.mode=='place_tower_buildable' || document.body.dataset.mode=='place_tower_both') && e.target.classList.contains('tile') && e.target.classList.contains('buildable')) {
        // place buildable/both tower
        let x = parseInt(e.target.dataset.x);
        let y = parseInt(e.target.dataset.y);
        // dynamically generate tower instance
        eval(`
            game.towers.push ( new ${game.place_tower} ({x:x,y:y}) );
        `);
        game.place_tower = null;
        document.body.dataset.mode=null;
        game.decmoney(game.place_tower_cost);
    }
    if ( (document.body.dataset.mode=='place_tower_path' || document.body.dataset.mode=='place_tower_both') && e.target.classList.contains('tile') && e.target.classList.contains('passable')) {
        // place path/both tower
        // TODO: check path is good! (ie. not blocking exit)
        // also check no entities in 'cell' when placed
        let x = parseInt(e.target.dataset.x);
        let y = parseInt(e.target.dataset.y);
        // check via temp path
        game.map.tiles[x][y].passable = false; // temp set to false for path check
        let temp_path = new Path(window.game.map, 0, Math.floor(window.game.map.height/2), window.game.map.width-1, Math.floor(window.game.map.height/2));
        console.log('TEMP PATH',temp_path);
        if (!temp_path.path_found) {
            console.warn('Exit blocked - invalid barrier');
            game.map.tiles[x][y].passable = true; // set back to true
        }
        else {
            // check entities not affected
            var ok = true;
            for (var i=0; i<game.entities.length; i++) {
                if (game.entities[i].cur_cell.x==x && game.entities[i].cur_cell.y==y) {
                    ok = false;
                    break;
                }                
            }
            if (ok) {
                game.map.tiles[x][y].buildable = true;
                /* eval(`
                    game.towers.push ( new ${game.place_tower} ({x:x,y:y}) );
                `); */
                game.map.paths[0].recalc();
                //game.place_tower = null;
                document.body.dataset.mode=null;
                game.decmoney(game.place_tower_cost);
                window.game.map.render();
            }
            // reach here, cant alter path, already being used by entity
            console.warn('Unable to alter path, entity already using it')
        }  
    }
});


document.addEventListener('keyup',function(e){
    console.log(e.code);
    if (e.code === 'Space') {
        if (game.state_machine.state=='paused') {
            game.state_machine.transition('unpause');
        }
        else {
            game.state_machine.transition('pause');
        }
    }
    if (e.code === 'Digit1') {
        if (game.state_machine.state=='mainmenu') {
            game.map = new Map();
            game.state_machine.transition('start');
            console.log('Game started!');
        }
    }
    if (e.code === 'Digit2') {
        if (game.state_machine.state=='playing') {
            game.map.make_random_path();
            game.map.paths[0].recalc();
            game.map.render();
            console.log('Random path made!');
            if (window.debug) {
                for (var x=0; x<game.map.width; x++) {
                    for (var y=0; y<game.map.height; y++) {
                        let tn = document.createElement('P');
                        tn.innerText = game.map.paths[0].route[x][y].distance;
                        document.getElementById(x.toString() + "," + y.toString()).appendChild(tn);
                    }
                }
            }
        }
    }
    if (e.code === 'Digit4') {
        if (game.state_machine.state=='playing') {
            game.entities.push ( new Zoomie({x:32,y:32,pathindex:0}) );
        }
    }
    if (e.code === 'Digit3') {
        if (game.state_machine.state=='playing') {
            game.entities.push ( new Zombie({x:32,y:32,pathindex:0}) );
        }
    }
    if (e.code === 'Escape') {
        if (game.state_machine.state=='playing') {
            game.state_machine.transition('pause');
        }
        else if (game.state_machine.state=='paused') {
            game.state_machine.transition('unpause');
        }
    }
    if (e.code === 'KeyW') {
        if (game.state_machine.state=='playing') {
            game.cam.y += 64;
            game.updatecam(); 
        }
    }
    if (e.code === 'KeyS') {
        if (game.state_machine.state=='playing') {
            game.cam.y -= 64;
            game.updatecam(); 
        }
    }
    if (e.code === 'KeyA') {
        if (game.state_machine.state=='playing') {
            game.cam.x += 64;
            game.updatecam(); 
        }
    }
    if (e.code === 'KeyD') {
        if (game.state_machine.state=='playing') {
            game.cam.x -= 64;
            game.updatecam(); 
        }
    }
});

document.addEventListener('wheel',function(e){
    /* game.map.scale = game.map.scale + (e.deltaY * -0.001);
    document.getElementById('tiles').style.transform = "scale(" + game.map.scale.toString() + ")"; */
});

