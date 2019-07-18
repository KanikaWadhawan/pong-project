import Paddle from './Paddle';

import Board from './Board';
import Ball from './Ball';

import { SVG_NS, KEYS, PaddleOptions } from "../settings";


export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.ball = new Ball(8, this.width, this.height, 'magenta');

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      PaddleOptions.paddleWidth,
      PaddleOptions.paddleHeight,
      PaddleOptions.boardGap,
      ((this.height - PaddleOptions.paddleHeight) / 2),
      'red',
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(
      this.height, //board height
      PaddleOptions.paddleWidth,
      PaddleOptions.paddleHeight,
      this.width - (PaddleOptions.boardGap + PaddleOptions.paddleWidth),
      ((this.height - PaddleOptions.paddleHeight) / 2),
      'blue',
      KEYS.up,
      KEYS.down
    );




    //  this.paddleOne = new Paddle( this.height, 8, 56, 10, this.height / 2 - 28, 'red');
    // this.paddleTwo = new Paddle( this.height, 8, 56, this.width - 18, this.height / 2 - 28);
  } // end of constructor

  render() {
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
    this.ball.render(svg);

  }
}
