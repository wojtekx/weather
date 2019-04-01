<template>
    <div class="login">
         <h3>Sign in</h3>
         <input type="email" v-model="email" placeholder="Email"><br>
         <input type="password" v-model="password" placeholder="Password"><br>
         <button class="btn btn-primary" @click="login">Connection</button>
         <p>You don't have an acount? You can  <router-link to="/SignUp">create one</router-link></p>
    </div>    
</template>

<script>
import firebase from 'firebase';
import {store} from '@/main.js';
export default {
name: 'Login',
data(){
    return{
        email:'',
        password:'',
    }
},
methods:{
    login:function(){
       firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
           (user) => {
               this.$router.replace('Result')
               localStorage.setItem("name", user.user.uid)
           },
          (err) => {
               alert('Oops. '+ err.message)
           }
       )
    }
},
}
</script>

<style scoped>
body{
    margin: 0;
    padding: 0;
}
.login{
     padding-top: 100px;
}
input{
    margin: 20px 0;
    width: 500px;
    padding-top: 10px;
    font-size: 15px;
    text-align: center;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    outline: none;
}
input::placeholder {
    color: white;
    text-shadow: 0 0 2px black;
}
button{
    margin-top: 20px;
    width: 100px;
    cursor: pointer;
}
p{
    margin-top: 40px;
    font-size: 16px;
    color: white;
    text-shadow: 0 0 2px black;
}
p a{
    cursor: pointer;
    color: #0000b9;
}
h3{
    color: #fdf047;;
    text-shadow: 0 0 1px black;
    margin: 0;
    padding: 23px 0;
}
@media(min-width:320px) and (max-width: 768px){
    input{
       width: 300px;
    }
}

</style>
