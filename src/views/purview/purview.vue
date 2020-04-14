<template>
  <el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 列表内容 -->
    <el-table :data="list" border stripe style="width: 100%">
     <el-table-column type="index" align="center" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope" >
          <span v-if="Number(scope.row.level) ==0"> 一级</span>
          <span v-if="Number(scope.row.level) ==1"> 二级</span>
          <span v-if="Number(scope.row.level) ==2"> 三级</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template  slot-scope="scope" >
          {{Number(scope.row.date+'000') | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [{
          date: '1586074010',
          name: '王小虎',
          path:'users',
          level: '1'
        }, {
          date: '1586074010',
          name: '王小虎',
          path:'goods',
          level: 2
        }, {
          date: 1586074010,
          name: '王小虎',
          path:'shows',
          level: 0
        }, {
          date: 1586074010,
          name: '王小虎',
          path:'users',
          level: 2
        }, {
          date: 1586074010,
          name: '王小虎',
          path:'goods/list',
          level: 1
        }, 
        ]
    };
  },
  created() {
    // this.getPurview()
  },
  methods: {
    async getPurview() {
      const res = await this.$http.get(`rights/list`);
      this.list = res.data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>