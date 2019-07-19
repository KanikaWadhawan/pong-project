import { SVG_NS } from "../settings";
export default class Ball {
    constructor(radius, boardWidth, boardHeight, colour = 'white') {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.colour = colour;

        this.reset();
    }
    // reseting the ball to the middle
    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
    // creating a random vector between +5 and -5
        
    this.vy=0; // fixing the bug so that it doesn't throw any error in the while loop 
    while(this.vy===0){
        this.vy = Math.floor(Math.random() * 10 - 5);
    }
       // this.vy = Math.floor(Math.random() * 10 - 5);
        console.log("vy",this.vy);
        this.vx = this.direction * (6 - Math.abs(this.vy));
        console.log( "vx",this.vx);
    }
   // collision of the ball with the walls of the board
    wallCollision(){
    const hitLeft = this.x - this.radius <=0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <=0;
    const hitBottom = this.y + this.radius >=this.boardHeight;
    
    if(hitLeft || hitRight){
        this.vx = -this.vx;
    } else if(hitTop || hitBottom){
        this.vy = -this.vy;
       // or  this.vy *= -1;
    }

    }
    render(svg) {
        // vector addition for movement
        this.x += this.vx;
        this.y += this.vy;

        // call collion method
        this.wallCollision();
        //create ball elements
        let circle = document.createElementNS(SVG_NS, 'circle');

        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'fill', this.colour);


        svg.appendChild(circle);
    }
}