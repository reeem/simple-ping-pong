<template>
  <div>
    <score />
    <ping-pong />
  </div>
</template>

<script>
  import PingPong from './PingPong.vue';
  import Score from './Score';

  export default {
    name: 'play',
    components: {
      PingPong,
      Score,
    },
  };
</script>
