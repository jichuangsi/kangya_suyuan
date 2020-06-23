<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    document.addEventListener("deviceready", function () {
      navigator.splashscreen.hide();
    }, false);
  }
}
</script>

<style>
#app {
}
</style>
