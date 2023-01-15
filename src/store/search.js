import axios from "axios";
import router from "../router";
export default {
  namespaced: true,
  actions: {
    // 调用API获取数据
    // 获取歌曲列表
    async getSongs(context, { keywords, pageNO = 1 }) {
    
      if (pageNO === 1) {
        context.commit("setCurPageNO", pageNO);
      }
      await axios
        .get(
          `https://music-api.yujing.fit/cloudsearch?keywords=${keywords}&offset=${pageNO}`
        )
        .then((res) => {
          // 将请求到的数据提交到mutations
          context.commit("setSongs", res.data.result.songs);
          context.commit("setTotal", res.data.result.songCount);
          context.dispatch("message", {
            message: "bingo!",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          context.dispatch("message", {
            message: `出错了嘞, ${err}`,
            type: "error",
            duration: 10000,
          });
          // 跳转到错误页面
          router.push({ name: "error" });
        });
    },
    async playMusic(context, row) {
      let songId = row.id;
      // 发送请求
      await axios
        .get(`https://music-api.yujing.fit/song/url?id=${songId}`)
        .then((res) => {
          let url = res?.data?.data[0]?.url;
          if (res?.data?.code != 200 && url) {
            context.dispatch("message", {
              message: `换首歌试试叭，这首歌好像不能播放`,
              type: "warning",
            });
            return;
          }
          // 新窗口打开播放音乐
          window.open(url);
        })
        .catch((err) => {
          context.dispatch("message", {
            message: `出错了嘞, ${err}`,
            type: "error",
            duration: 10000,
          });
          // 跳转到错误页面
          router.push({ name: "error" });
        });
    },
    message(context, { duration = 1000, message, type }) {
      this._vm.$message({
        duration,
        showClose: true,
        message,
        type, // warning | error
      });
    },
  },
  mutations: {
    setKeywords(state, val) {
      state.keywords = val;
    },
    setSongs(state, val) {
      state.songs = val;
    },
    setTotal(state, val) {
      state.total = val;
    },
    setCurPageNO(state, val) {
      state.curPageNO = val;
    },
  },
  state: {
    keywords: "",
    songs: [],
    total: 0,
    curPageNO: 1,
  },
};
