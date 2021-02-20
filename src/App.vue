<template>
  <div id="app">
    <router-link to="/">To index</router-link>
    <router-link to="/detail">To detail</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
</style>
