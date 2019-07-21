import Paddle from './Paddle';
import Score from './Score';
import Board from './Board';
import Ball from './Ball';
//import Winner from './Winner';

import pingSound1 from "../../public/sounds/game_of_thrones.mp3";
import { SVG_NS, KEYS, PaddleOptions } from "../settings";


export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.ball = new Ball(8, this.width, this.height, '#ff0066');
    //this.ball1 = new Ball(6, this.width, this.height, 'orange'); if you want to add a 2nd ball

    this.score1 = new Score(this.width / 2 - 50, 30, 30);

    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;
   
    //this.winner = new Message(90, 150, 40);
    // adding sound in the background
    this.ping1 = new Audio(pingSound1);
    this.ping1.play();
    this.ping1.loop = true;
   
    

    this.megaBall = false;
    this.megaBallArray = [];

    this.player1 = new Paddle(
      this.height,
      18,
      70,
     // PaddleOptions.paddleWidth,
     // PaddleOptions.paddleHeight,
      PaddleOptions.boardGap,
      ((this.height - PaddleOptions.paddleHeight) / 2),
      '#00ff99',
      KEYS.a,
      KEYS.z
    );


    this.player2 = new Paddle(
      this.height, //board height
      18,
      70,
      //PaddleOptions.paddleWidth,
      //PaddleOptions.paddleHeight,
      this.width - (PaddleOptions.boardGap + PaddleOptions.paddleWidth),
      ((this.height - PaddleOptions.paddleHeight) / 2),
      'blue',
      KEYS.up,
      KEYS.down
    );

    // adding action listener for pause with the space bar
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;

        // case 'm':
        //     this.spawnMegaBall();
        //     break;

        case 'm':
          if (this.megaBall === false) {
            this.spawnMegaBall();
          
          
          } else {
            this.megaBall = false;
          }
          break;
      }
    }
    );


    //  this.paddleOne = new Paddle( this.height, 8, 56, 10, this.height / 2 - 28, 'red');
    // this.paddleTwo = new Paddle( this.height, 8, 56, this.width - 18, this.height / 2 - 28);

  } // end of constructor

  
  spawnMegaBall() {
    this.megaBall = true;
    for (let i = 0; i <= 70; i++) {
      this.megaBallArray[i] = new Ball(10, this.width, this.height);
    }
  }


  render() {

    // adding the pause to render method
    if (this.pause) {
      return;
    }
    // More code goes here....
    this.gameElement.innerHTML = ""; // clear the HTML before appending to fix a render bug 
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    //this.ball1.render(svg);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    if (this.megaBall) {
      this.megaBallArray.forEach(ball => {
        ball.render(svg, this.player1, this.player2);
      })
    }

    // if(this.player1.score === 10 || this.player2.score === 10){
    //   this.pause = true;
    		// Declare Winner
				var player1Msg = 'Player 1 Wins!';
				var player2Msg = 'Player 2 Wins!';
				if (this.player1.score === 10) {
					this.winner.render(svg, player1Msg);
				} else if (this.player2.score === 10) {
					this.winner.render(svg, player2Msg);
				}
       // document.location.reload();

      // declare winner here, try to do something other than an alert e.g. appending to the DOM
      //alert("YOU WIN, CONGRATULATIONS!");
      // also try to reset the game
     
    

  }
}
