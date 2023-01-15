<template>
  <div id="app">
    <Search />
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "App",
  components: {
    Search,
  },
};
</script>

<style >
.first,
.error,
.loading {
  margin: 50px;
}

</style>
