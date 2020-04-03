<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col class="searchCol">
        <el-input placeholder="请输入内容" v-model="query" class="inputsearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="address" label="用户状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pageNum: 1,
      pageSize: 2,
      userList: [],
      total:-1,
      tableData: [
        {
          name: "王小虎",
          email: "15233333333@163.com",
          phone: "18122222222",
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  created() {},
  methods: {
    async getUserList() {
      //  设置请求头，获取token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(`users?query=${this.query}
        &pageNum=${this.pageNum}&pageSize=${this.pageSize}`);
      console.log(res);
    const {data:{users,total},meta:{mes,status}} = res.data;
    if(status === 200){
        // 给表格赋值， 给total赋值
        this.userList = users;
        this.total = total;
    }
    }
  }
};
</script>

<style lang="scss" scoped>
.searchRow {
  padding-top: 20px;
}

.inputsearch {
  width: 50%;
}
</style>