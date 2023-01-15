<template>
  <div id="app">
    <Search/>
    <div class="first" v-show="(state===0)">
      <span>Welcome to Your Music App </span>
      <span>By Tiam</span>
      <span>HBNU-计信2014</span>
      <span>---【2022-12-6 10:18:23 星期二】</span>
    </div>
    <div class="loading" v-show="(state===1)">
      <span>Loading...</span> 
      <img src="./assets/MEnk3.gif" alt=""/>
      <img src="./assets/1669687393054.gif" alt=""/>
    </div>
    <div v-show="(state===2)"><List/></div>
    <div class="error" v-show="(state===-1)">请求出错啦, 请检查网络</div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'


export default {
  name: 'App',
  components: {
    Search,
    List,
  },
  data() {
    return {
      state: 0,
    }
  },
  methods: {
    setState(state){
      this.state = state;
    }
  },
  mounted() {
    this.$bus.$on("setState", this.setState);
  },
  beforeDestroy() {
    this.$bus.$off("setState", this.setState);
  },

} 
</script>

<style>
.first,.error,.loading {
  margin: 50px;
}
span {
  display: block;
  margin-bottom: 10px;
}
</style>
