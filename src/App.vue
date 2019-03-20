<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Result from "./components/Result";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
   name: "App",
  components: {
    Result,
    Login,
    SignUp,
  }
}
</script>

<style scoped>

body{
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-image: linear-gradient(to bottom right, #74d1fc, #525964);
  height: auto;
  min-height: 100vh;
}

</style>
