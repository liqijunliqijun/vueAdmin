<template>
  <div>
    <el-button @click="add">点击测试</el-button>
    <el-button>{{cont}}</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      stateData: ""
    };
  },
  // computed: {
  //   contAdd() {
  //     return this.$store.state.cont;
  //   }
  // },
  computed: {
    ...mapState({
      cont: "cont"
    })
  },
  methods: {
    add() {
      // this.$store.commit('add') //用同步方法改变store里面的数据方法
      this.$store.dispatch("delayAdd") //用异步的方法 改变 store的 数据
    }
  }
};
</script>

<style lang="scss" scoped>
</style>