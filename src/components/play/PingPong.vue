<template>
  <div>
    <canvas id="pingPongCanvas" width="900" height="540"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'ping-pong',
    data: function() {
      const bricks = [];
      const brickColumnCount = 5;
      const brickRowCount = 3;

      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          bricks[c][r] = {x: 0, y: 0, status: 1};
        }
      }

      return {
        canvas: null,
        ctx: null,
        x: null,
        y: null,
        dx: 2,
        dy: -2,
        ballRadius: 10,
        paddleHeight: 10,
        paddleWidth: 100,
        paddleX: null,
        rightPressed: false,
        leftPressed: false,
        bricks,
        brickRowCount,
        brickColumnCount,
        brickWidth: 75,
        brickHeight: 20,
        brickPadding: 10,
        brickOffsetTop: 30,
        brickOffsetLeft: 30,
        interval: null,
      };
    },
    computed: {},
    watch: {},
    created() {
      console.log('create');
    },
    mounted() {
      console.log('pingpong', this);
      this.init();
      document.addEventListener('keydown', this.keyDownHandler, false);
      document.addEventListener('keyup', this.keyUpHandler, false);
      document.addEventListener('mousemove', this.mouseMoveHandler, false);

      this.interval = setInterval(() => {
        this.draw();
      }, 10);
    },
    methods: {
      init: function() {
        this.canvas = document.getElementById('pingPongCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;

        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        console.log('init');
      },
      draw: function() {
        // this.canvas[0].focus();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBrick();
        this.drawBall();
        this.drawPaddle();
        this.collisonDetection();

        if (
          this.x + this.dx > this.canvas.width - this.ballRadius ||
          this.x + this.dx < this.ballRadius
        ) {
          this.dx = -this.dx;
        }

        if (this.y + this.dy < this.ballRadius) {
          this.dy = -this.dy;
        } else if (this.y + this.dy > this.canvas.height - this.paddleHeight) {
          if (
            this.x > this.paddleX &&
            this.x < this.paddleX + this.paddleWidth
          ) {
            this.dy = -this.dy;
          } else {
            this.interval && clearInterval(this.interval);
            // alert('Game Over');
            // location.href = '/gameover';
            // store.commit('gameover');
          }
        }

        if (
          this.rightPressed &&
          this.paddleX < this.canvas.width - this.paddleWidth
        ) {
          this.paddleX += 7;
        }

        if (this.leftPressed && this.paddleX > 0) {
          this.paddleX -= 7;
        }

        this.x += this.dx;
        this.y += this.dy;
      },
      drawBall: function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
      },
      drawPaddle: function() {
        this.ctx.beginPath();
        this.ctx.rect(
          this.paddleX,
          this.canvas.height - this.paddleHeight,
          this.paddleWidth,
          this.paddleHeight,
        );
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
      },
      drawBrick: function() {
        for (let c = 0; c < this.brickColumnCount; c++) {
          for (let r = 0; r < this.brickRowCount; r++) {
            const brickX =
              c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
            const brickY =
              r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
            if (this.bricks[c][r].status !== 0) {
              this.bricks[c][r].x = brickX;
              this.bricks[c][r].y = brickY;
              this.ctx.beginPath();
              this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
              this.ctx.fillStyle =
                this.bricks[c][r].status === 1 ? '#0095DD' : '#FF5733';
              this.ctx.fill();
              this.ctx.closePath();
            }
          }
        }
      },
      keyDownHandler: function(e) {
        if (e.code === 'ArrowRight') {
          this.rightPressed = true;
        } else if (e.code === 'ArrowLeft') {
          this.leftPressed = true;
        }
      },
      keyUpHandler: function(e) {
        if (e.code === 'ArrowRight') {
          this.rightPressed = false;
        } else if (e.code === 'ArrowLeft') {
          this.leftPressed = false;
        }
      },
      mouseMoveHandler: function(e) {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
          this.paddleX = relativeX - this.paddleWidth / 2;
        }
      },
      collisonDetection: function() {
        for (let c = 0; c < this.brickColumnCount; c++) {
          for (let r = 0; r < this.brickRowCount; r++) {
            const b = this.bricks[c][r];

            // calculation
            if (b.status == 1) {
              if (
                this.x > b.x &&
                this.x < b.x + this.brickWidth &&
                this.y > b.y &&
                this.y < b.y + this.brickHeight
              ) {
                this.dy = -this.dy;
                this.bricks[c][r].status = -1;
                this.$store.commit('score', 20);

                // 여기 작동 안함
                if (
                  this.$store.state.score ==
                  this.brickRowCount * this.brickColumnCount * 20
                ) {
                  alert('YOU WIN, CONGRATULATIONS!');
                  document.location.reload();
                  clearInterval(this.interval); // Needed for Chrome to end game
                }

                setTimeout(() => this.collisionEffect(c, r), 200);
              }
            }
          }
        }
      },
      collisionEffect: function(x, y) {
        this.bricks[x][y].status = 0;
      },
      gameover: function() {
        this.$store.commit('gameover');
      },
      score: function() {
        this.$store.commit('score', 20);
      },
    },
  };
</script>
