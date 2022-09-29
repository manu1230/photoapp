<template>
  <div class="grid grid-cols-1 p-5 m-10">
    <SearchPhoto  :search_placeholder="this.search" @input ="photoSearch($event)" />
    <div class="flex justify-between flex-wrap p-5 m-5">
      <Gallery  v-for="(item, index) in images" v-bind:item="item" :key="index"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Gallery from '@/components/Gallery.vue'
import SearchPhoto from '@/components/SearchPhoto.vue'
export default {
  
  name: 'HomeView',
  components: {
    Gallery,
    SearchPhoto
  },
  data(){
    return{
      photosSearch:false,
      search:"Search for Country"
    }
  },
  computed: {
      images() {
        this.photosSearch = false
        if(this.$route.query.q){
          let details = this.$store.getters.searchPhoto
          return details.results;
        }
        else {
          return this.$store.getters.images
          
        }
      },
  },
  created() {
   if(this.$route.query.q){
    this.$store.dispatch('searchPhotos',{this:this.$route.query.q})
   }
   else{
    this.$store.dispatch('loadPosts');
   }
  },
  methods:{
    photoSearch(obj){
      this.$router.go()
    }
  }
}
</script>
