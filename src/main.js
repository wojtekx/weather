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
    data: [],
    moreData:[],
  },
  actions: {
    getData({ state, commit }) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/group?id=${state.cities.join(
            ","
          )}&units=metric&appid=${state.apiKey}`
        )
        .then(r => r.data)
        .then(data => {
          commit("SET_DATA", data); 
        });
    },
    saveCity({ state, commit }, payload) {
      let path = localStorage.getItem("name");
      let users = base.database().ref(`users/${path}/cities`);
      if(payload){
        const newCities = [...state.cities, payload.toString()];
        users.set(newCities);
      }
    },
    seeMore({state, commit}, payload){
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${payload}&units=metric&appid=${state.apiKey}`
        )
        .then(r => r.data)
        .then(data => {
          commit("MORE_DATA", data)
          console.log(data);
          
        });
        
    },
    saveCities({ commit }, payload) {
      commit('SAVE_CITIES', payload);
    },
    deleteCity({ state, commit }, payload){
      let path = localStorage.getItem("name");
      let users = base.database().ref(`users/${path}/cities`);

      let newCities = [...state.cities].filter( e => e !== payload);
      
      if(!newCities.length){
        newCities = ["0"]
      }
      
      users.set(newCities, () => {
        commit('SAVE_CITIES', newCities);
      });
    },
    clearStore({ commit }) {
      commit('CLEAR_STORE');
    }
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    MORE_DATA(state, data) {
      state.moreData = data;
    },
    SAVE_CITIES(state, cities) {
      state.cities = cities;
    },
    CLEAR_STORE(state) {
      state.cities = [];
      state.data = [];
    }
  }
});


let app = "";

let base = firebase.initializeApp(
    {
      apiKey: "AIzaSyC6FzZ0j5N8vGuoaAvpZK3matpGpjDXVwg",
      authDomain: "weatherapp-ccdc0.firebaseapp.com",
      databaseURL: "https://weatherapp-ccdc0.firebaseio.com",
      projectId: "weatherapp-ccdc0",
      storageBucket: "weatherapp-ccdc0.appspot.com",
      messagingSenderId: "677299154605"
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