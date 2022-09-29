<template>
    <div v-if="this.photo.urls" class="md:cursor-grab grid grid-cols-1 p-5 m-10">
			<img
				:src="photo.urls.regular"
				class="item"
				@click="download(photo)"
		/>
   </div>
 </template>

 <script>
		import { mapState, mapGetters } from "vuex";
	export default {
		computed:{
    ...mapState({
      photo:"photo",
			downloadPhoto:"downloadPhoto"
      
    }),
	},
		created(){
			this.$store.dispatch('photoDetails',{this:this.$route.query.id});
		},
		methods:{
		download(obj){
			this.$store.dispatch('downloadPhoto',{this:this.$route.query.id});
			this.fileSaver(this.downloadPhoto)
		},
		fileSaver : async function(obj){
			const a = document.createElement("a");
        a.href = await this.toDataURL(obj.url);
        a.download = "myImage.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
			//delete link;
		},
		toDataURL(url) {
    return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
		}
	}
	}
 </script>