<template>
  <div><Play /></div>
</template>

<script>
  import store from '../src/store/store';
  import Play from '~src/components/play/Play.vue';

  export default {
    store,
    components: {
      Play,
    },
  };
</script>
