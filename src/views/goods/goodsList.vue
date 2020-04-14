<template>
  <el-card>
    <!-- 头部面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框  -->
    <el-row class="searchRow">
      <el-col class="searchCol">
        <el-input
          @clear="loadUserList()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputsearch"
        >
          <el-button slot="append" @click="searchGoods()" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="addGoods()">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格内容   -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格(元)"></el-table-column>
      <el-table-column prop="weight" label="商品重量(kg)"></el-table-column>
      <el-table-column label="创建时间">
        <!--1.如果单元格里面显示的内容不是字符串（文本）需要被显示的内容外层包裹一个template
            2.template 内部要用数据 设置slot-scope属性该属性的值是要用数据create_time的数据源 userList
            3.solt-scope的值 tableData 其实就是 el-table 绑定的数据 tableData
            4.tableData.row ->数组中的每个对象   
        -->
        <template slot-scope="scope">{{Number(scope.row.createTime+'000') |formatDate }}</template>
      </el-table-column> 
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="listEdit(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
    
          <el-button
            size="mini"
            @click="listDelet(scope.row.id)"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 40, 80]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pageSize: 2,
      userList: [],
      total: 52,
      userAdd: false, //添加
      userEdit: false, //修改
      userRol: false, //修改
      formLabelWidth: "100px",
      currRoleId: -1, //角色id
      userCurrRoleId: -1, //当前用户 id
      currUserName: "", //角色名
      currList: [
        { rid: 10, name: "主管" },
        { rid: 11, name: "管理员" },
        { rid: 12, name: "会员" }
      ], //角色列表
      form: {
        name: "",
        price: "",
        id: "",
        weight: ""
      },
      tableData: [
        {
          id: 1,
          name: "王小虎",
          price: "55625.36",
          weight: "215",
          createTime: 1515989322,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          name: "李巧茹",
          price: "6325.36",
          weight: "152",
          createTime: 1525989222,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          name: "把加快",
          price: "2625.36",
          weight: "415",
          createTime: 1485989346,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 4,
          name: "朱公乡",
          price: "4625.36",
          weight: "33",
          createTime: 1185989346,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods:{
   // 选择每页显示的条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGoodsList();
    },
    // 点击当前页 请求当前页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoodsList();
    },
    //   添加商品
    addGoods(){
        this.$router.push({name:"add"})
    },
    // 获取产品列表数据
    async getGoodsList(){
        const res = await this.$http.get(`goods`)
    }

  }
};
</script>

<style lang="scss" scoped>

</style>