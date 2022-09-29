<template>
	<div class=" md:cursor-grab p-2 m-2">
		<img
			:src="item.urls.small"
			class="item"
			width="300"
			height="300"
			@click="photoDetails(item)"
		/>
		<div v-if="stats.likes">
			<span class="pl-1">Name:{{ item.user.name }};</span>
			<span class="pl-1">Likes:{{ stats.likes.total }};</span>
			<span class="pl-1">Downloads:{{ stats.downloads.total }}</span>
			<!-- <span class="pl-1">views:{{ stats.views.total }}</span> -->
		</div>
	</div>
  </template>
  
<script>
	import { mapState, mapGetters } from "vuex";
    export default {
			name: 'Gallery',
			props:{
				item :{
					type:Object
				}
			},
			data(){
				return {
					likes:0,
				}
			},
			computed:{
    ...mapState({
      stats:"stats",
      
    }),
  },
		created() {
			this.$store.dispatch('loadstats',{this:this.item.id});
  },
	methods:{
		photoDetails(item){
			this.$router.push({path: './photo' , query: {id:item.id}})
		}
	}
    }
</script>