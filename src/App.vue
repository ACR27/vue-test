<template>
  <div id="app">
    <h1>Vue APP</h1>
    <scoreboard sport="nfl"></scoreboard>
    <scoreboard sport="nba"></scoreboard>
  </div>
</template>

<script>
import Scoreboard from './components/Scoreboard'

export default {
  name: 'app',
  components: {
    Scoreboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
