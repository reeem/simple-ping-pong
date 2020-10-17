import {getWidth} from '~src/utils/getSize';

const minCanvasWidth = 300;
const maxCanvasWidth = 900;

export default class ObjectProperties {
  #ctx = null;

  #canvasWidth = 0;
  #canvasHeight = 0;

  #ballRadius = 0;

  #x = 0;
  #y = 0;
  #dx = 2;
  #dy = -2;

  #paddleX = 0;
  #paddleHeight = 0;
  #paddleWidth = 0;

  #brickWidth = 0;
  #brickHeight = 0;
  #brickPadding = 10;
  #brickOffsetTop = 30;
  #brickOffsetLeft = 0;
  #brickColumnCount = 0;
  #brickRowCount = 0;
  #brickCount = 20;
  #bricks = [];

  #onGameOverCallback = null;
  #onCollisionDetectCallback = null;
  #onScoreCallBack = null;

  constructor(
    ctx,
    {onGameOverCallback, onCollisionDetectCallback, onScoreCallback},
  ) {
    this.#ctx = ctx;
    this.onResize(); // [todo]

    this.#x = this.#canvasWidth / 2;
    this.#y = this.#canvasHeight - this.#paddleHeight;

    this.#paddleX = (this.#canvasWidth - this.#paddleWidth) / 2;
    this.#onGameOverCallback = onGameOverCallback;
    this.#onCollisionDetectCallback = onCollisionDetectCallback;
    this.#onScoreCallBack = onScoreCallback;
  }

  onResize() {
    this.#canvasWidth = Math.floor(
      Math.max(
        Math.min((getWidth() * minCanvasWidth) / 320, maxCanvasWidth),
        minCanvasWidth,
      ),
    );
    this.#canvasHeight = Math.floor(this.#canvasWidth * 0.6);

    this.#brickWidth = this.#canvasWidth * 0.1;
    this.#brickHeight = Math.ceil(this.#brickWidth * 0.35);

    this.#paddleWidth = Math.ceil(this.#brickWidth * 1.3);
    this.#paddleHeight = this.#brickHeight;
    this.#ballRadius = this.#brickHeight * 0.7;

    this.#brickColumnCount = Math.floor(
      this.#canvasWidth / (this.#brickWidth + this.#brickPadding),
    );

    this.#brickRowCount = Math.ceil(this.#brickCount / this.#brickColumnCount);
    this.#bricks = [];

    outer: for (var c = 0; c < this.#brickColumnCount; c++) {
      this.#bricks[c] = [];
      inner: for (var r = 0; r < this.#brickRowCount; r++) {
        if ((c + 1) * (r + 1) >= this.#brickCount) {
          console.log(c, r, this.#brickCount);
          break inner;
        }
        this.#bricks[c][r] = {x: 0, y: 0, status: 1};
      }
    }
  }

  get BallRadius() {
    return this.#ballRadius;
  }

  get CanvasWidth() {
    return this.#canvasWidth;
  }

  get CanvasHeight() {
    return this.#canvasHeight;
  }

  set PaddleX(x) {
    this.#paddleX = x;
  }

  get PaddleWidth() {
    return this.#paddleWidth;
  }

  get PaddleHeight() {
    return this.#paddleHeight;
  }

  get BrickWidth() {
    return this.#brickWidth;
  }

  get BrickHeight() {
    return this.#brickHeight;
  }

  get PerfectScore() {
    return this.#brickCount * 20;
  }

  draw() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.collisonDetection();

    if (
      this.#x + this.#dx > this.#canvasWidth - this.#ballRadius ||
      this.#x + this.#dx < this.#ballRadius
    ) {
      this.#dx = -this.#dx;
    }

    if (this.#y + this.#dy < this.#ballRadius) {
      this.#dy = -this.#dy;
    } else if (this.#y + this.#dy > this.#canvasHeight - this.#paddleHeight) {
      if (
        this.#x > this.#paddleX &&
        this.#x < this.#paddleX + this.#paddleWidth
      ) {
        this.#dy = -this.#dy;
      } else {
        this.#onGameOverCallback();
      }
    }

    this.#x += this.#dx;
    this.#y += this.#dy;
  }

  rightPressed() {
    if (this.#paddleX < this.#canvasWidth - this.#paddleWidth) {
      this.#paddleX += 7;
    }
  }

  leftPressed() {
    if (this.#paddleX > 0) {
      this.#paddleX -= 7;
    }
  }

  drawBricks(draw) {
    outer: for (let c = 0; c < this.#brickColumnCount; c++) {
      inner: for (let r = 0; r < this.#brickRowCount; r++) {
        const brickX =
          c * (this.#brickWidth + this.#brickPadding) + this.#brickOffsetLeft;
        const brickY =
          r * (this.#brickHeight + this.#brickPadding) + this.#brickOffsetTop;
        if ((c + 1) * (r + 1) >= this.#brickCount) {
          break inner;
        }

        if (this.#bricks[c][r].status !== 0) {
          this.#bricks[c][r].x = brickX;
          this.#bricks[c][r].y = brickY;

          this.#ctx.beginPath();
          this.#ctx.rect(brickX, brickY, this.#brickWidth, this.#brickHeight);
          this.#ctx.fillStyle =
            this.#bricks[c][r].status === 1 ? '#0095DD' : '#FF5733';
          this.#ctx.fill();
          this.#ctx.closePath();
        }
      }
    }
  }

  drawBall() {
    this.#ctx.beginPath();
    this.#ctx.arc(this.#x, this.#y, this.#ballRadius, 0, Math.PI * 2);
    this.#ctx.fillStyle = '#0095DD';
    this.#ctx.fill();
    this.#ctx.closePath();
  }

  drawPaddle() {
    this.#ctx.beginPath();
    this.#ctx.rect(
      this.#paddleX,
      this.#canvasHeight - this.#paddleHeight,
      this.#paddleWidth,
      this.#paddleHeight,
    );
    this.#ctx.fillStyle = '#0095DD';
    this.#ctx.fill();
    this.#ctx.closePath();
  }

  collisonDetection() {
    outer: for (let c = 0; c < this.#brickColumnCount; c++) {
      inner: for (let r = 0; r < this.#brickRowCount; r++) {
        if ((c + 1) * (r + 1) >= this.#brickCount) {
          break inner;
        }

        const b = this.#bricks[c][r];

        // calculation
        if (b.status == 1) {
          if (
            this.#x > b.x &&
            this.#x < b.x + this.#brickWidth &&
            this.#y > b.y &&
            this.#y < b.y + this.#brickHeight
          ) {
            this.#bricks[c][r].status = -1;
            setTimeout(() => this.collisionEffect(c, r), 200);
            this.#dy = -this.#dy;

            this.#onCollisionDetectCallback();
          }
        }
      }
    }
  }

  collisionEffect(x, y) {
    this.#bricks[x][y].status = 0;
  }
}
