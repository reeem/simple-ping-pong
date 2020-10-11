<template>
  <div>
    <p>게임 오버</p>
    <button @click="ready">처음으로 돌아가기</button>
  </div>
</template>

<script>
  import store from '../store/store';

  export default {
    name: 'game-over',
    methods: {
      ready: function() {
        store.commit('ready');
      },
    },
  };
</script>
