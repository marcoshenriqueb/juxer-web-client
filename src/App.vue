<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted() {
    this.$store.dispatch('checkAuth');
  },
};
</script>
