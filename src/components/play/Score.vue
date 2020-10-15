<template>
  <div>score: {{ count }}</div>
</template>

<script>
  export default {
    name: 'score',
    mounted() {
      console.log(this);
    },
    computed: {
      count() {
        return this.$store.state.point;
      },
    },
    // store,
  };
</script>
