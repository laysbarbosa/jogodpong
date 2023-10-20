let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(400, 300);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);
  
  leftPaddle.show();
  rightPaddle.show();
  leftPaddle.update();
  rightPaddle.update();
  
  ball.show();
  ball.update();
  
  // Check for collisions
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
  
  // Check for scoring
  if (ball.isOffScreen()) {
    if (ball.x < 0) {
      rightScore++;
    } else {function setup() {
2
  createCanvas(400, 400);
3
}
4
5
function draw() {
6
  background(220);
7
}
      leftScore++;
    }
    ball.reset();
  }
  
  // Display scores
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text(leftScore + " - " + rightScore, width / 2, 30);
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    this.isLeft = isLeft;
    this.speed = 5;
    this.ySpeed = 0;
  }
  
  show() {
    fill(255);
    noStroke();
    rect(this.isLeft ? 0 : width - this.w, this.y, this.w, this.h);
  }
  
  update() {
    if (this.isLeft) {
      if (keyIsDown(87)) { // 'W' key
        this.ySpeed = -this.speed;
      } else if (keyIsDown(83)) { // 'S' key
        this.ySpeed = this.speed;
      } else {
        this.ySpeed = 0;
      }
    } else {
      if (keyIsDown(UP_ARROW)) {
        this.ySpeed = -this.speed;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.ySpeed = this.speed;
      } else {
        this.ySpeed = 0;
      }
    }
    
    this.y += this.ySpeed;
    this.y = constrain(this.y, 0, height - this.h);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = random(2, 3) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(1, 2) * (random() > 0.5 ? 1 : -1);
  }
  
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  checkCollision(paddle) {
    if (
      this.x - this.radius < paddle.w &&
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h
    ) {
      this.xSpeed *= -1;
    }
  }
  
  isOffScreen() {
    return this.x < 0 || this.x > width;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(2, 3) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(1, 2) * (random() > 0.5 ? 1 : -1);
  }
}

