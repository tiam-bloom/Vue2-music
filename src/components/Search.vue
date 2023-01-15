<template>
  <!-- @change="search" 失去焦点 或 回车时触发 -->
  <!-- trigger-on-focus 是否在输入框 focus 时显示建议列表 -->
  <!-- :highlight-first-item="true" 是否默认高亮第一个选项 -->

  <div class="search">
    <el-autocomplete style="width:300px" size="medium" type="text" placeholder="请输入关键字搜索歌曲" prefix-icon="el-icon-search"
      v-model="keywords" @keyup.enter.native="search" :fetch-suggestions="querySearchAsync" :trigger-on-focus="false"
      clearable />

    <el-button @click="search" type="primary" size="medium" icon="el-icon-search">Search</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Search",
  computed: {
    keywords: {
      get() {
        return this.$store.state.search.keywords;
      },
      set(v) {
        this.$store.state.search.keywords = v;
      }
    },
  },
  methods: {

    async search() {
      if(!this.keywords.trim()) {
        this.$message({
          showClose: true,
          message: '请输入关键字',
          type: 'warning',
          duration: 1000
        })
        return;
      }
      // 跳转搜索结果页面
      this.$router.push({
        name: 'searchResult',
        params: {
          keywords: this.keywords ,
          pageNO:1
        }
      })
    },
    // 异步获取搜索建议
    querySearchAsync(queryString, cb) {
      axios.get(`https://music-api.yujing.fit/search/suggest?keywords=${queryString}`).then(res => {
        const { songs } = res.data.result
        // 调用 callback 返回建议列表的数据, 只能显示数组且结构中属性值为value的
        songs.map((item) => {
          item.value = `${item.name}    ${item.artists[0].name}`
        })
        cb(songs);
      }).catch(err => {
        this.$message.error(`搜索建议获取失败: ${err}`)
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  margin: 50px;
}
</style>
