<template>
  <div class="search">
    <input type="text" placeholder="请输入关键字搜索歌曲" v-model.trim="searchName" @keyup.enter="search"/>
    <button @click="search">搜索</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchName: "",
    };
  },
  methods: {
    search() {
      if(this.searchName==""){
        alert("请先输入关键字");
        return;
      }
      this.$bus.$emit("setState",1);
      // 将searchName传递给父组件
      this.$bus.$emit("search", this.searchName);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  margin: 50px;
}
input {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}
button {
  width: 60px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
