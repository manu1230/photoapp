<template>
    <form v-on:submit.prevent="search()">
      <div class="flex">
        <div class="flex items-stretch flex-grow">
          <div class="px-2 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            name="page_search"
            ref="page_search"
            id="page_search"
            class="
              -mx-9
              block
              w-full
              px-9
              border border-gray-300
              rounded-none
              focus:border focus:border-gray-300 focus:rounded-none focus:outline-none
              active:outline-none
              z-10
            "
            :placeholder="search_placeholder"
            v-model="query"
          />
        </div>
        <button
          class="
            -ml-px
            relative
            inline-flex
            items-center
            px-4
            py-2
            border border-gray-300
            text-lg
            font-medium
            text-gray
            hover:text-white
            bg-silver-20
            hover:bg-azure
            focus:outline-none focus:ring-1 focus:ring-red
          "
          @click="search()"
        >
          <svg class="h-5 w-5 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  </template>
  <script>
  export default {
    props: {
      search_placeholder: {}    
    },
		name: 'SearchPhoto',
    data: function () {
      return {
        query: null,
      }
    },
    mounted: function () {
      if (this.$route.query.q) {
        this.query = this.$route.query.q
      }
      this._keyListener = function (event) {
        if (event.code === "KeyF" && event.ctrlKey && event.shiftKey) {
          event.preventDefault()
          document.getElementById("page_search").focus()
        }
      }
      document.addEventListener("keypress", this._keyListener.bind(this))
    },
    beforeDestroy() {
      document.removeEventListener("keypress", this._keyListener)
    },
    methods: {
      search() {
        if (this.query) {
          this.$router.replace({ query: { ...this.$route.query, q: this.query, p: undefined } })
          this.$emit("input",this.query)
        } else {
          this.$router.replace({ query: { ...this.$route.query, q: undefined, p: undefined } })
          this.$emit("input",this.query)
        }
      },
    },
    // watch:{
    //   query :{
    //     deep:true,
    //     handler(query){
    //       this.$emit("input",query)
    //     }
    //   }
    // }
  }
  </script>