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

input{
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}
button{
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}
p{
    margin-top: 40px;
    font-size: 13px;
    color: white;
}
p a{
    cursor: pointer;
    color: #0000b9;
}
h3{
    color: white;
    margin: 0;
    padding: 23px 0;
}

</style>
