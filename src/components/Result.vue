<template>
 <div class="container">
   <header class="header">
     <button v-on:click="logout()" class="btn btn-success">Wyloguj się</button>
      <v-select  :options="options" label="name" v-model="selected"></v-select>
    <button v-on:click="addCity(selected.id)">Zapisz</button>
  </header>
  <main class="results">
    <div class="results-item" v-for="d in data.list" :key="d.id">
          <p>{{ d.id }}</p>
          <p>{{ d.name }}</p>
          <button>More</button>
          <button v-on:click="delCity(d.id)">Delete</button>
    </div>
  </main>
 </div>
</template>

<script>
import options from "@/assets/city.list.json";
import { mapState } from "vuex";
import Vue from 'vue';
import firebase from 'firebase';
import {base} from '@/main.js'


export default {
  name: "Result",
  data(){
    return{
      options: options,
      selected: "",
      
    }
  },
  methods:{
    addCity(item){
      this.$store.dispatch("saveCity", this.selected);
      console.log(this.selected);
      
      this.options = this.options.filter(e => e.id != item)
      this.selected = ""
      
      this.$store.dispatch("getData");
    },
    delCity(item){
      this.$store.dispatch("deleteCity", item );
      
      this.$store.dispatch("getData");
    },
     logout(){
        firebase.auth().signOut().then(()=>{
            this.$router.replace('login')
            localStorage.removeItem("name")
        })
    },
  },
 
  mounted() {
    let downloadCity
    let path = localStorage.getItem("name");
    let users = base.database().ref(`users/${path}`);
    users.on("value", data =>  downloadCity =  data.val()  );
    console.log(downloadCity);
    
    this.$store.dispatch("saveCity", downloadCity.id);
    
    this.$store.dispatch("getData"); 
  },
  computed: mapState(["data"])
  
  
};
</script>
<style>
  .v-select{
    max-width: 30%;
    margin: 10px auto;
  }
  button.clear{
    display: none;
  }
</style>
