<template>
 <div class="container">
   <header class="header">
     <button v-on:click="logout()" class="btn btn-success">Logout</button>
     <div class="form">
        <v-select class="select" :options="options" label="name" v-model="selected"></v-select>
        <button class="btn btn-primary" v-on:click="addCity(selected.id)" >Add city</button>
     </div>
  </header>
  <main class="results">
    <div class="results-item" v-for="d in data.list" :key="d.id">
          <h4>{{ d.name }}</h4>
          <p>Temperature: {{ Math.round(d.main.temp) }}°C</p>
          <p>Humidity: {{ d.main.humidity }}%</p>

         <div class="button-section">
            <button class="btn btn-info" v-on:click="more(d.name)">more</button>
            <button class="btn btn-danger" v-on:click="delCity(d.id)">delete</button>
         </div>
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
      options2: options,
      selected: "",
    }
  },
  methods:{
    addCity(){
      this.$store.dispatch("saveCity", this.selected.id);
      this.selected = "";
      const savedCities = [...this.$store.state.cities];

      this.options = this.options.filter(e => !savedCities.includes(e.id.toString()));

      this.$store.dispatch("getData");
    },
    delCity(item){
      this.$store.dispatch("deleteCity", item.toString()).then(() => {
        const newOption = this.options2.filter(e => e.id.toString() === item.toString());
        this.options = [...this.options, ...newOption];
      });

      this.$store.dispatch("getData");
    },
    more(name){
      this.$store.dispatch("seeMore", name );
    },
     logout(){
        firebase.auth().signOut().then(()=>{
            this.$router.replace('login')
            this.$store.dispatch("clearStore");
            localStorage.removeItem("name")
        })
    },
  },
 
  mounted() {
    let path = localStorage.getItem("name");
    let users = base.database().ref(`users/${path}`);

    users.on("value", data => {
      this.$store.dispatch("saveCities", data.val().cities);
      this.$store.dispatch("getData");

      const savedCities = [...this.$store.state.cities];

      this.options = this.options.filter(e => !savedCities.includes(e.id.toString()));

    });
  },
  computed: mapState(["data", "cities"])
};
</script>
<style >
  body{
      margin: 0;
      padding: 0;
  }
  .v-select{
    max-width: 30%;
    margin: 10px auto;
  }
  button.clear{
    display: none;
  }
  .results{
    display: flex;
    flex-wrap: wrap;
  }
  .results-item{
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    width: 30%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .dropdown-toggle::after{
    display: none!important;
  }
  h4{
    padding-bottom: 10px;
  }
  .btn{
    margin: 0 3px;
  }
  .btn.btn-success{
    margin-top: 13px;
  }

</style>
