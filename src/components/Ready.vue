<template>
  <div>
    <NuxtLink to="/play" class="anchor">start</NuxtLink>
    <!-- <button @click="play">start</button> -->
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

<style lang="scss" scoped>
  @import './common/common.scss';
</style>
