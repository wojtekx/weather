<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Result from "./components/Result";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
export default {
   name: "App",
  components: {
    Result,
    Login,
    SignUp,
  }
}
</script>

<style>

body{
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to bottom right, #a1cce0, #01050c);
  height: 100vh;
 
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
