import { Game } from './js/game.js';
import { Zombie } from './js/zombie.js';
import { Gun1 } from './js/gun1.js';

window.game = new Game();

function rr(a,b) {
    return a + (Math.floor(Math.random() * b));
}


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
        }
    }
    if (e.code === 'Digit4') {
        if (game.state_machine.state=='playing') {
            game.towers.push ( new Gun1({x:rr(0,6),y:rr(0,10)}) );
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

