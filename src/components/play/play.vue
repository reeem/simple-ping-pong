<template>
  <div>
    <score />
    <client-only>
      <ping-pong />
    </client-only>
  </div>
</template>

<script>
  // import PingPong from './PingPong.vue';
  import Score from './Score';

  export default {
    name: 'play',
    components: {
      PingPong: () => import('~src/components/play/PingPong.vue'),
      Score,
    },
  };
</script>
