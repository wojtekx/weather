import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import vSelect from "vue-select";
import firebase from 'firebase';

Vue.component('v-select', vSelect)

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
    apiKey: "2a95b28d85da7537f3700af9254d76e7",
    cities: [],
    data: []
  },
  actions: {
    getData({ state, commit }) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/group?id=${state.cities.map(e => e.id).join(
            ","
          )}&units=metric&appid=${state.apiKey}`
        )
        .then(r => r.data)
        .then(data => {
          commit("SET_DATA", data); 
        });
    },
    saveCity({ commit }, payload) {
      if(payload){
        store.state.cities.push(payload)
      }
      console.log(payload);
      
    },
    deleteCity({ commit }, payload){
      store.state.cities = store.state.cities.filter(e => e.id != payload );
      if(store.state.cities.length == 0){
        store.state.cities = [{
          id:"0"
        }]
      }
    }
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    }
  }
});


let app = "";

let base = firebase.initializeApp(
  {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
  }
);

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store:store,
      render: h => h(App),
    }).$mount('#app')
    
  }
});
export {base}