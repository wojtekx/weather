<template>
    <div class="sign-up">
        <h3>Let's create a new account !</h3>
        <input type="email" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button class="btn btn-primary" @click="signUp">Sign Up</button>
        <span>or go back to <router-link to="/">login</router-link></span>
    </div>
</template>

<script>
import firebase from 'firebase';
import users from '@/main.js';
export default {
name:'SignUp',
data(){
    return{
        email:'',
        password:'',
    }
},
methods:{
    signUp:function(){
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password).then(
            (user) => {
                alert('Your account has been created !');
               localStorage.setItem("name", user.user.uid)
                
                this.$router.replace('Result')
            },
            function(err){
                alert('Oops. ' + err.message)
            }
        )
        
    }
}
}
</script>

<style scoped>

.sign-up{
        padding-top: 25%;
}
h3{
    color: #fdf047;
    text-shadow: 0 0 1px black;
    margin: 0;
    padding: 23px 0;
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
    font-size: 25px;
    color: white;
}
span{
    display: block;
    margin-top: 40px;
    font-size: 16px;
    color: white;
    text-shadow: 0 0 2px black;
}
span a{
    color: #0300aa;
}
@media(min-width:320px) and (max-width: 768px){
    input{
       width: 300px;
    }
}
</style>
