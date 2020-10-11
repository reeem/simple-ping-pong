<template>
  <div class="wrapper">
    <button @click="toggle">{{ status }}</button>
    <button disabled>PAUSE</button>
  </div>
</template>

<script>
  import store from '../store/store';

  export default {
    name: 'controller',
    computed: {
      status() {
        return store.state.status;
      },
    },
    methods: {
      toggle: function() {
        store.commit('toggleStatus');
      },
    },
  };
</script>

<style scoped>
  div.wrapper {
  }
</style>
