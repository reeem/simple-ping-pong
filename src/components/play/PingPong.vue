<template>
  <div>
    <canvas id="pingPongCanvas"></canvas>
  </div>
</template>

<script>
  import ObjectProperties from '~src/config/ObjectProperties.js';
  export default {
    name: 'ping-pong',
    data: function() {
      return {
        canvas: null,
        op: null,
        rightPressed: false,
        leftPressed: false,
        interval: null,
      };
    },
    computed: {},
    watch: {},
    mounted() {
      this.init();
      document.addEventListener('keydown', this.keyDownHandler, false);
      document.addEventListener('keyup', this.keyUpHandler, false);
      document.addEventListener('mousemove', this.mouseMoveHandler, false);
      document.addEventListener('resize', this.resize);

      this.interval = setInterval(() => {
        this.draw();
      }, 10);
    },
    methods: {
      init: function() {
        this.canvas = document.getElementById('pingPongCanvas');
        this.op = new ObjectProperties(this.canvas.getContext('2d'), {
          onGameOverCallback: () => {
            this.interval && clearInterval(this.interval);
          },
          onCollisionDetectCallback: () => {
            this.$store.commit('score', 20);
            this.$nextTick(() => {
              if (this.$store.state.point === this.op.PerfectScore) {
                alert('YOU WIN, CONGRATULATIONS!');
                // document.location.reload();
                clearInterval(this.interval); // Needed for Chrome to end game
              }
            });
          },
        });

        this.canvas.width = this.op.CanvasWidth;
        this.canvas.height = this.op.CanvasHeight;
      },
      resize: function() {
        // this.canvas.width =
      },
      draw: function() {
        this.op.draw();

        if (this.rightPressed) {
          this.op.rightPressed();
        }

        if (this.leftPressed) {
          this.op.leftPressed();
        }

        this.x += this.dx;
        this.y += this.dy;
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
        // [todo]
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.op.canvasWidth) {
          this.op.PaddleX = relativeX - this.op.PaddleWidth / 2;
        }
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

<style scoped>
  div {
    margin: 20px auto;
    width: fit-content;
  }
</style>
