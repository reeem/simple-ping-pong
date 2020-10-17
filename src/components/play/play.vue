<template>
  <div>
    <score />
    <client-only>
      <ping-pong />
    </client-only>
  </div>
</template>

<script>
  import Score from './Score';

  export default {
    name: 'play',
    components: {
      PingPong: () => import('~src/components/play/PingPong.vue'),
      Score,
    },
  };
</script>
