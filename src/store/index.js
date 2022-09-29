import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  data(){
    return{
      url:"https://api.unsplash.com",
      accessKey:"gL8Ir-fJ9iLB0leVuENl1pOX12ipk9ESPktVSzNGwSk"
    }
  },
  state: {
    images:[],
    stats:{},
    photo:{},
    searchPhoto:[],
    downloadPhoto:{},
    url:"https://api.unsplash.com",
    accessKey:"gL8Ir-fJ9iLB0leVuENl1pOX12ipk9ESPktVSzNGwSk"
  },
  getters: {
    images: state => {
        return state.images;
    },
    stats: state =>{
      return state.stats
    },
    photo: state =>{
      return state.photo
    },
    searchPhoto: state =>{
      return state.searchPhoto
    },
    downloadPhoto: state =>{
      return state.downloadPhoto
    }
},
  mutations: {
    SET_ITEMS (state, images) {
      state.images = images
    },
    SET_STATS(state,stats){
      state.stats = stats
    },
    SET_PHOTO(state,photo){
      state.photo = photo
    },
    SET_DOWNLOAD(state,downloadPhoto){
      state.downloadPhoto = downloadPhoto
    },
    SET_SEARCH_PHOTOS(state,searchPhoto){
      state.searchPhoto = searchPhoto
    }
  },
  actions: {

    //INDEX PHOTOS
    async loadPosts ({ commit,state }) {
      try {   
         let request = state.url+'/photos?client_id='+state.accessKey;
         const response =  await axios.get(request);
         commit('SET_ITEMS', response.data)
       }
       catch (error) {
        console.log(error);
      }
    },

    //PHOTOS STATISTICS
    async loadstats ({ commit,state },This) {
      try {   
         let request = state.url+'/photos/'+This.this+'/statistics?client_id='+state.accessKey;
         const response =  await axios.get(request);
         commit('SET_STATS', response.data)
       }
       catch (error) {
        console.log(error);
      }
    },

    //PHOTO DETAILS
    async photoDetails ({ commit,state },This) {
      try {   
         let request = state.url+'/photos/'+This.this+'?client_id='+state.accessKey;
         const response =  await axios.get(request);
         commit('SET_PHOTO', response.data)
       }
       catch (error) {
        console.log(error);
      }
    },

      //SEARCH PHOTO
    async searchPhotos ({ commit,state },This)  {
      try {   
         let request = state.url+'/search/photos?page=1&query='+This.this+'&client_id='+state.accessKey;
         const response =  await axios.get(request);
         commit('SET_SEARCH_PHOTOS', response.data)
       }
       catch (error) {
        console.log(error);
      }
    },
    

    //DOWNLOAD PHOTO
    async downloadPhoto ({ commit,state },This) {
      try {   
         let request = state.url+'/photos/'+This.this+'/download?client_id='+state.accessKey;
         const response =  await axios.get(request);
         commit('SET_DOWNLOAD', response.data)
       }
       catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  }
})
