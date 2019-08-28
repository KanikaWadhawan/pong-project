import { SVG_NS } from "../settings";
import pingSound from "../../public/sounds/pong-01.wav";

export default class Ball {
  constructor(radius, boardWidth, boardHeight, colour = '#7f7f7f') {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.colour = colour;

    this.ping = new Audio(pingSound);


    this.reset();

  }
  // reseting the ball to the middle
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    // creating a random vector between +5 and -5

    this.vy = 0; // fixing the bug so that it doesn't throw any error in the while loop 
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
   
    this.vx = this.direction * (6 - Math.abs(this.vy));
    
  }
  // collision of the ball with the walls of the board
  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
     
    }

  }
  // paddle collision
  paddleCollision(player1, player2) {
    // moving right


    if (this.vx > 0) {
      // collision detection for right paddle
      if (this.x + this.radius >= player2.x && // right edge of the ball is >= left edge of the paddle
        this.x + this.radius <= player2.x + player2.width && // right edge of the ball is <= right edge of the paddle
        (this.y >= player2.y && this.y <= player2.y + player2.height) // ball Y is >= paddle top Y and <= paddle bottom Y
      ) {
        // if true then there's a collision  
        this.vx *= -1;
        this.ping.play();
        
        player1.height = Math.max(player1.height -5, 15);
        player2.height=Math.min(player2.height +10, 80);
       
        // -- decreasing the height of the opponent
        let playerColour = player2.colour;
        player2.colour = 'pink';
        setTimeout(function () { 
          //---changing the colour
          player2.colour = playerColour // reset the color
        }, 200);
      }
    } else {
      // moving left
      if (this.x - this.radius <= player1.x + player1.width &&
        this.x - this.radius >= player1.x &&
        (this.y >= player1.y && this.y <= player1.y + player1.height)
      ) {
        this.vx *= -1;

        player2.height=Math.max(player2.height -5, 15);
        player1.height=Math.min(player1.height +10, 80);
        
        this.ping.play();
        let playerColour = player1.colour;
        player1.colour = 'orange';
        setTimeout(function () { //
          //---changing the colour
          player1.colour = playerColour // reset the color
        }, 200);
      }
    }
  }



  //keeping track of score
  goal(player) {
    if (player.score <= 10) {
      player.score++;
      this.reset();

    } if (player.score === 10) {
      alert("GAME OVER");
      setTimeout(function(){
        window.location.reload();
      },3000)
  

    }

  }
  render(svg, player1, player2) {
    // vector addition for movement
    this.x += this.vx;
    this.y += this.vy;

    // call collion method
    this.wallCollision();
    // call paddle collision method
    this.paddleCollision(player1, player2);

    //create ball elements
    let circle = document.createElementNS(SVG_NS, 'circle');

    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', this.colour);
    svg.appendChild(circle);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }

  }
}