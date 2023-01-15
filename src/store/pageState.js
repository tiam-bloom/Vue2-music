// 控制页面显示的状态
export default {
  namespaced: true,
  mutations: {
    setLoading(state, val) {
      state.loading = val;
    }
  },
  state: {
    loading: false,
  },
};
