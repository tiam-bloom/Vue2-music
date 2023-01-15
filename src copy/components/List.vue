<template>
  <div class="list">
    <!-- 组件结构HTML -->
    <ul>
      <li
        v-for="(song, index) in songs"
        :key="song.id" @click="playMusic(song.id)" >
        <img :src="song.al.picUrl" alt="图片链接失效" />
        <span>{{ index + 1 }}、</span>
        <span>{{ song.name }}</span>---
        <span v-for="songer in song.ar" :key="songer.id">{{songer.name}}</span>
        <span>专辑:《{{ song.al.name }}》</span>
        <span>{{ song.alia[0] }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// 组件js
export default {
  name: "List",
  data() {
    return {
      songs: [],
    };
  },
  methods: {
    // 获取歌曲列表
    getSongs(searchName) {
      // 发送请求 增加Loading过程
      axios
        .get(`https://autumnfish.cn/cloudsearch?keywords=${searchName}`)
        .then((res) => {
          // 将请求到的数据保存到songs中
          this.songs = res.data.result.songs;
          this.$bus.$emit("setState", 2);
        })
        .catch((err) => {
          console.log(err);
          this.$bus.$emit("setState", -1);
        });
    },
    async playMusic(songId) {
      // 发送请求
      await axios
        .get(`https://autumnfish.cn/song/url?id=${songId}`)
        .then((res) => {
          let url = res.data.data[0].url;
          if(res.data.code!=200 || url == null|| url == undefined || url == "" ){
            alert("换首歌试试叭");
            // this.$bus.$emit("setState", -1);
            return;
          }
          // 新窗口打开链接
          window.open(
            url,
          );
        })
        .catch((err) => {
          console.log(err);
          this.$bus.$emit("setState", -1);
        });
    },
  },
  mounted() {
        this.$bus.$on("search", this.getSongs);
    },
    beforeDestroy() {
        this.$bus.$off("search", this.getSongs);
    },
};
</script>

<style>
/*  组件样式css */
li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
li:hover {
  background-color: #eee;
  cursor: pointer;
}
img {
  width: 50px;
  height: 50px;
}
span {
  margin: 0 10px;
}
</style>