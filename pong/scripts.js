/** @type {HTMLCanvasElement}  */

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = (1000);
const CANVAS_HEIGHT = canvas.height = (500);

canvas.style.border = ("2px solid black");
canvas.style.margin = ("100px");
canvas.style.marginBottom = ("unset");
canvas.style.overflow = ("hidden");

const G = 0.7

let ballImg = new Image();
ballImg.src = "ball.png"
let cancha = new Image();
cancha.src = "cancha.jpg"

class Player {

    constructor({
        position = {
            x: 0,
            y: 0
        },
        size = {
            w: 50,
            h: 200
        },
        speed = {
            x: 0,
            y: 0
        },
        gravity = false,
        controls = {
            up: false,
            down: false
        }
    }){

        this.position = position;
        this.size = size;
        this.speed = speed;
        this.gravity = gravity
        this.controls = controls

    }
    draw(){

        c.fillRect( this.position.x, this.position.y, this.size.w, this.size.h )

    }
    update(){
        

        this.draw();

        if(this.gravity){
            this.speed.y += G
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.y + this.size.h > CANVAS_HEIGHT){

            this.position.y = CANVAS_HEIGHT - this.size.h;
            this.speed.y = (0);

        }else if (this.position.y < 0){

            this.position.y = (0);
            this.speed.y = (0)

        }

    }
    bounce(){

        c.drawImage( ballImg, this.position.x, this.position.y, this.size.w, this.size.h )
        
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.y + this.size.h >= CANVAS_HEIGHT){
            this.speed.y += 0.5

            this.speed.y = -this.speed.y

        }else if(this.position.y <= 0){
            
            this.speed.y = -this.speed.y
            
        }

        if(this.position.x >= CANVAS_WIDTH){
            window.location.reload();
            alert("player1 wins")
        }else if(this.position.x <= 0){
            window.location.reload();
            alert("player2 wins")
        }


    }
}   

let playerOne = new Player({});
let enemyOne = new Player({});

let ball = new Player({
    position: {
        x: CANVAS_WIDTH/2,
        y: CANVAS_HEIGHT/2
    },
    size: {
        w: 50,
        h: 50
    },
    speed: {
        x: 5,
        y: 5
    }
})

enemyOne.position = {
    x: CANVAS_WIDTH - enemyOne.size.w,
    y: CANVAS_HEIGHT/2 - enemyOne.size.h/2
};
playerOne.position = {
    x: 0,
    y: CANVAS_HEIGHT/2 - enemyOne.size.h/2
}

function game(){

    c.drawImage( cancha, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    playerOne.update();
    enemyOne.update();
    ball.bounce()

    if(ball.position.x == playerOne.position.x + playerOne.size.w &&
        ball.position.y < playerOne.size.h + playerOne.position.y&&
        ball.position.y > playerOne.position.y){
        
        ball.speed.x = -ball.speed.x
    }

    if(ball.position.x + ball.size.w == enemyOne.position.x&&
        ball.position.y < enemyOne.size.h + enemyOne.position.y&&
        ball.position.y > enemyOne.position.y){

        ball.speed.x = -ball.speed.x
    }

    requestAnimationFrame(game)

};

function controller(player, keyBind = "", action = ""){
    player.controls[action] = keyBind
}

window.addEventListener('keydown', (event) => {
    controller(playerOne, "w", "up")
    controller(playerOne, "s", "down")

    controller(enemyOne, "ArrowUp", "up");
    controller(enemyOne, "ArrowDown", "down");


    switch(event.key){

        case playerOne.controls.up:
            playerOne.speed.y = -10
            break;
        case playerOne.controls.down:
            playerOne.speed.y = 10
            break;
        case enemyOne.controls.up:
            enemyOne.speed.y = -10
            break;
        case enemyOne.controls.down:
            enemyOne.speed.y = 10
            break;
    }
  });
window.addEventListener("keyup", (event)=>{
    switch(event.key){
        case playerOne.controls.up:
            playerOne.speed.y = 0
            break;
        case playerOne.controls.down:
            playerOne.speed.y = 0
            break;
        case enemyOne.controls.up:
            enemyOne.speed.y = 0
            break;
        case enemyOne.controls.down:
            enemyOne.speed.y = 0
        
    }
    switch(event.code){
        case "Space":
            alert("pausa")
    }
})
game();