import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    cont:0
  },
  mutations: {
    //处理 同步方法
    add(state){
      state.cont ++
    }
    
  },
  actions: {
    // 处理 异步方法
    delayAdd(context){
      setTimeout(() => {
        context.commit("add")
      }, 1000);
    }
  },
  modules: {
  }
})
