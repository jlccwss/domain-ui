<template>
  <div id="app" class="app">
    <home></home>
  </div>
</template>

<script>
import home from './components/home.vue';

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style scoped>
.app {
  height: 100%;
}
</style>
