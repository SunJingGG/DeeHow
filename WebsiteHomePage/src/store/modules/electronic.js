/**
 * 业务层全局状态管理
 */

const electronic ={
  state:{
    category:[],
    categoryIndex:1,
  },
  mutations:{
    SET_category: (state, category) => {
      state.category = category
    },
    SET_categoryIndex: (state, index) => {
      state.categoryIndex = index
    },
  },
  actions:{
    // 获取类目树形结构
    GetCategoryList({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
}
export default electronic