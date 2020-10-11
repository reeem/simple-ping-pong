<template>
  <div id="app">
    <!-- <controller /> -->
    <ping-pong v-if="isPlayMode" />
    <ready v-if="isReadyMode" />
    <game-over v-if="isGameOverMode" />
  </div>
</template>

<script>
  import store from './store/store';
  import PingPong from './components/PingPong.vue';
  // import Controller from './components/Controller.vue';
  import Ready from './components/Ready.vue';
  import GameOver from './components/GameOver.vue';

  export default {
    name: 'App',
    computed: {
      isReadyMode() {
        console.log('isReadyMode', store.state.status, 'ready');
        return store.state.status === 'ready';
      },
      isPlayMode() {
        return store.state.status === 'play';
      },
      isGameOverMode() {
        return store.state.status === 'gameover';
      },
    },
    components: {
      PingPong,
      // Controller,
      Ready,
      GameOver,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
