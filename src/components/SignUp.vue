<template>
    <div class="sign-up">
        <p>Let's create a new account !</p>
        <input type="email" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signUp">Sign Up</button>
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
    margin-top: 40px;
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
span{
    display: block;
    margin-top: 20px;
    font-size: 11px;
     color: white;
}
</style>
