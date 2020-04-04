<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
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
          <el-button slot="append" @click="searchUser()" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="userAdd = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格内容   -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <!-- 1.如果单元格里面显示的内容不是字符串（文本）需要被显示的内容外层包裹一个template
        2.template 内部要用数据 设置slot-scope属性该属性的值是要用数据create_time的数据源 userList
        3.solt-scope的值userList 其实就是 el-table 绑定的数据 userList
            userList.row ->数组中的每个对象
        -->

        <template slot-scope="tableData">{{ tableData.row.createTime |formatDate }}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scop">
          <el-switch
            @change="switchFn(scop.row)"
            v-model="scop.row.ms_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
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
            @click="userSwicthFn(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
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
    <!-- 弹出框 增加用户 -->
    <el-dialog title="添加用户" :visible.sync="userAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAdd = false">取 消</el-button>
        <el-button type="primary" @click="userAddFn()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="userEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEdit = false">取 消</el-button>
        <el-button type="primary" @click="userEditFn()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框 设置权限用户 -->
    <!-- Form -->

    <el-dialog title="分配角色" :visible.sync="userRol">
      <el-form :model="form">
        <el-form-item label="用户名 : " :label-width="formLabelWidth">{{currUserName}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- 如果select 的绑定的数据的值和option 的value 一样
        就会显示该option的label值
          -->
          {{currRoleId}}
          <el-select v-model="currRoleId" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="(item,i) in currList" :key="i" :label="item.name" :value="item.rid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userRol = false">取 消</el-button>
        <el-button type="primary" @click="userSwicthFnLogin()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
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
        password: "",
        emil: "",
        id: "",
        phone: ""
      },
      tableData: [
        {
          id: 1,
          name: "王小虎",
          email: "admin@163.com",
          phone: "18122222222",
          createTime: 15859893222,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          name: "李巧茹",
          email: "admin@163.com",
          phone: "18122222222",
          createTime: 1585989222,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 3,
          name: "把加快",
          email: "admin@163.com",
          phone: "18122222222",
          createTime: 1885989346,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 4,
          name: "朱公乡",
          email: "admin@163.com",
          phone: "18122222222",
          createTime: 1185989346,
          ms_state: true,
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    //    this.getUserList()
  },
  methods: {
    // 获取 所有用户信息
    async getUserList() {
      //  设置请求头，获取token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(`users?query=${this.query}
        &pageNum=${this.pageNum}&pageSize=${this.pageSize}`);
      console.log(res);
      const {
        data: { users, total },
        meta: { mes, status }
      } = res.data;
      if (status === 200) {
        // 给表格赋值， 给total赋值
        this.userList = users;
        this.total = total;
        this.pagenum = 1;
        this.$message.succcess(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    // 选择每页显示的条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getUserList();
    },
    // 点击当前页 请求当前页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索
    searchUser() {
      // 此处的query是双向绑定的 其值已改变
      console.log(this.query);
      this.getUserList();
    },
    // 搜索完成 显示第一页
    loadUserList() {
      this.getUserList();
    },
    // 添加 新用户
    userAddFn() {
      this.form.id = this.tableData.length;
      this.tableData.push(this.form);
      this.userAdd = false;
      this.$message.success("添加成功");
      this.form = {};
    },
    // 添加新用户 线上数据请求方法
    // async userAddFn() {
    //   this.userAdd = false;   // 关闭对话框
    //   const res = await this.$http.post(`users`, this.form);
    //   const {
    //     meta: { status, msg },
    //     data
    //   } = res.data;
    //   if (status === 201) {
    //     this.$message.success(msg);   // 提示成功
    //     this.getUserList();      // 更新用户列表
    //     this.form = {};      // 清空form文本狂
    //     // for(let key in this,form){
    //     //   if(this.form.hasOwnproperty(key)){
    //     //     this.form[key] = ''
    //     //   }
    //     // }
    //   }else{
    //      this.$message.warning(msg);
    //   }
    // },
    // 删除用户
    listDelet(userId) {
      this.tableData.splice(userId, 1);
      // this.$confirm('删除用户','提示',{
      //   confirmButtonText:'确定',
      //   cancelButtonText:'取消',
      //   type:"warning"
      // }).then(async ()=>{
      //   const res = await this.$http.delete(`users/${userId}`)
      //   const {
      //   meta: { status, msg },
      //   data
      // } = res.data;
      //   if( status === 200 ){
      //     this.pagenum = 1; //删除成功后，回到首页
      //     this.$message({
      //     type:"success",message:msg
      //   })
      //   this.getUserList()
      //   }
      // }).catch(()=>{
      //   this.$message({
      //     type:"info",message:"操作失败"
      //   })
      // })
    },
    // 修改用户
    listEdit(users) {
      console.log(users);
      this.form = users;
      this.userEdit = true;
    },
    userEditFn() {
      // this.tableData[this.currentRow] = this.form
      //  this.$set(this.tableData, this.form.id, this.form ); 此方法有问题
      this.$set(this.tableData, this.currentRow, this.form);
      this.userEdit = false;
      this.$message.success("修改成功");
      this.form = {};
    },
    // 提交修改的数据
    // async userEditFn(){
    //     const res = await this.$http.put(`users/${this.form.id}`,this.form)
    // },

    // 修改状态
    async switchFn(users) {
      const res = await this.$http.put(
        `users/${users.id}/state/${users.mg_state}`
      );
    },
    //  根据用户id  获取角色id
    async userSwicthFn(users) {
      console.log(users);

      this.userRol = true;
      this.userCurrRoleId = users.id;
      this.currUserName = users.name;
      const res = await this.$http.get(`user/${user.id}`);
      this.currRoleId = res.data.rid;
    },
    // 贴提交修改的角色id
    async userSwicthFnLogin() {
      console.log(this.currRoleId);
      this.userRol = false;
      this.$message.success("修改角色成功");
      const res = await this.$http.put(`users/${this.userCurrRoleId}/role`, {
        rid: this.currRoleId
      });
    
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