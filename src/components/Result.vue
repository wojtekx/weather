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
          <p>Humidity: {{ d.main.humidity }}</p>

         <div class="button-section">
            <button class="btn btn-info" v-on:click="more(d.name)">more</button>
            <button class="btn btn-danger" v-on:click="delCity(d.id)">delete</button>
         </div>
    </div>
  </main>
      <div class="moreInfo none">
        <button class="btn btn-danger" v-on:click="close()">powrót</button>
        <div class="container col-10" >
          <div class="box" v-for="temp in moreData.list" :key="temp.dt">
            <p> {{temp.dt_txt}}</p>
            <p>temp: {{Math.round(temp.main.temp)}}°C</p>
            <p>humidity: {{temp.main.humidity}}% </p>
            <p>pressure: {{Math.round(temp.main.pressure)}}hpa </p>
            <p>wind: {{Math.round(temp.wind.speed)}}m/s </p>
          </div>
        </div>
    </div>
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
      document.querySelector('.moreInfo').classList.remove("none");
    },
    close(){
      document.querySelector('.moreInfo').classList.add("none")
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
  computed: mapState(["data", "cities", "moreData"])
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
  .moreInfo {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top:  0;
    left: 50%;
    transform: translate(-50%, 0 );
    background-image: linear-gradient(to bottom right, #74d1fc, #525964);
    padding: 35px;
    border: 1px solid black;
    width: 100%;
    height: 100vh;
  }
  .none{
    display: none;
  }
  .moreInfo .container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: auto;
    box-shadow: 0 0 37px 2px #4141e9;
    border-radius: 12px;
    padding: 16px;
  }
  .moreInfo h5{
    font-size: 18px;
    color: #00ff21cf;
    margin-top: 10px;
  }
  .moreInfo button{
    width: 100px;
    margin: 50px auto 0;
  }
  .box {
    border-bottom: 1px solid;
    margin: 10px;
    padding: 2px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
  }
  

</style>
