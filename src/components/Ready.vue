<template>
  <div>
    <p>시작 버튼을 눌러주세요.</p>
    <button @click="play">start</button>
  </div>
</template>

<script>
  import store from '../store/store';

  export default {
    name: 'ready',
    methods: {
      play: function() {
        store.commit('play');
      },
    },
  };
</script>
