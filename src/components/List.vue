<template>
  <div class="list">
    <el-table v-loading="loading" :data="songs" style="width:100%" height="580" @row-dblclick="playMusic">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <el-image style="width: 50px;height: 50px;" fir="fill" :preview-src-list="[scope.row.al.picUrl]"
            :src="scope.row.al.picUrl">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲" width="450">
      </el-table-column>
      <el-table-column label="歌手" width="330">
        <template slot-scope="scope">
          <span>{{ singers(scope.row.ar) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="350">
      </el-table-column>
      <el-table-column label="时长" width="80">
        <template slot-scope="scope">
          <span>{{ duration(scope.row.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <!-- :page-size="30" 每页30条 -->
      <!-- :hide-on-single-page="total<=30" 页数只有一页时隐藏分页 -->
      <!-- :total="total"> 总共total条数据 -->
      <!-- @current-change="handleCurrentChange" 当前页改变时触发 -->
      <el-pagination background layout="prev, pager, next" :hide-on-single-page="total <= 30" :current-page="curPageNO"
        @current-change="handleCurrentChange" :page-size="30" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// 组件js
export default {
  name: "List",
  computed: {
    ...mapState('search', ['songs', 'keywords', 'total', 'curPageNO']),
    ...mapState('pageState', ['loading']),
  },
  methods: {
    ...mapActions('search', ['playMusic', 'getSongs']),
    // 转换时长    
    duration(ms) {
      let min = Math.floor(ms / 1000 / 60);
      min < 10 ? min = "0" + min : min;
      let sec = Math.floor(ms / 1000 % 60);
      sec < 10 ? sec = "0" + sec : sec;
      return `${min}:${sec}`;
    },
    // 格式化歌手数据
    singers(singers) {
      let str = ""
      singers.forEach(singer => {
        str += singer.name + "、"
      });
      return str.substring(0, str.length - 1)
    },
    // 分页
    handleCurrentChange(pageNO) {
      this.$router.push({
        name: 'searchResult',
        params: {
          keywords: this.keywords,
          pageNO,
        }
      })
    },
  },
};
</script>

<style scoped>
/*  组件样式css */
.list {
  margin: 0 auto;
  width: 1420px;
}

.page {
  margin: 20px auto;
  width: 600px;
  text-align: center;
}
</style>