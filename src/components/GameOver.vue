<template>
  <div>
    <p>Game Over</p>
    <form>
      <input name="name" />
    </form>
    <!-- <NuxtLink to="/">처음으로 돌아가기</NuxtLink> -->
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
