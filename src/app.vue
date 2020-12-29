<template>
    <div class="app">
      <home></home>
    </div>
</template>
<script>
import home from './components/home.vue';
export default {
  data() {
    return {
      vue: "vue"
    };
  },
  components: {
    home
  }
};
</script>
<style scoped>
.app {
  height: 100%;
}
</style>