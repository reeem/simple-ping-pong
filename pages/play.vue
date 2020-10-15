<template>
  <div><ping-pong /></div>
</template>

<script>
  import store from '../src/store/store';
  import PingPong from '../src/components/play/PingPong.vue';

  export default {
    store,
    components: {
      PingPong,
    },
  };
</script>
