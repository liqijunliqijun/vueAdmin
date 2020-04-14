<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
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
      </el-col>
    </el-row>
    <!-- 表格内容   -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" sortable label="id" width="55"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" sortable label="价格"></el-table-column>
      <el-table-column prop="order" label="订单号"></el-table-column>
      <el-table-column prop="isPay" label="是否付款">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.isPay?'success':'info'"
          >{{scope.row.isPay?"已付":"未付"}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="isShip" label="是否发货">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.isShip?'primary':'info'"
          >{{scope.row.isShip?"已发":"未发"}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="创建时间" sortable>
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

    <!-- 添加 动态属性弹窗 -->
    <el-dialog title="修改地址" :visible.sync="isOrderEdit">
      <el-form :model="form">
        <el-form-item label="选择地址" :label-width="formLabelWidth" type="expand">
          <template>
            <el-cascader
              clearable
              class="elCacader"
              v-model="selectValue"
              :props="defultProp"
              :options="address"
              @change="handleChange"
            ></el-cascader>
            {{selectValue}}
          </template>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input
            v-model="inputName"
            　placeholder="例如：浙江省 杭州市 余杭区 丽水家园小区 88 冻１单元235"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOrderEdit = false">取 消</el-button>
        <el-button type="primary" @click="orderEditFn()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import json from "../../assets/address.json";
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pageSize: 2,
      userList: [],
      total: 52,
      isOrderEdit: false, //修改
      inputName: "",
      selectValue: [],
      defultProp: {
        label: "name",
        value: "name",
        children: "sub"
      },
      id: "",
      address: [],
      formLabelWidth: "100px",
      form: {
        addcity: []
      },
      tableData: [
        {
          id: 1,
          name: "王小虎",
          price: "525.36",
          order: "sdsdfsdf44444215",
          createTime: 1515989322,
          isPay: true,
          isShip: true,
          addcity: ["上海市", "普陀区"],
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          name: "李巧茹",
          price: "6325.36",
          order: "sdsdfsdf44444215",
          createTime: 1525989222,
          isPay: true,
          isShip: true,
          addcity: ["浙江省", "杭州市", "江干区"],
          address: "浙江省杭州市江干区金沙江路 1518 弄"
        },
        {
          id: 3,
          name: "把加快",
          price: "2625.36",
          order: "sdsdfsdf44444215",
          createTime: 1485989346,
          isPay: false,
          isShip: false,
          addcity: ["上海市", "普陀区"],
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 4,
          name: "朱公乡",
          price: "4625.36",
          order: "sdsdfsdf44444215",
          createTime: 1185989346,
          isPay: true,
          isShip: false,
          addcity: ["上海市", "普陀区"],
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    listEdit(row) {
      this.address = json;
      this.isOrderEdit = true;
      console.log(row);
      this.id = row.id;
    },
    // 修改订单地址
    orderEditFn() {
      var value = [...this.tableData];
      this.tableData.splice(0, this.tableData.length);
      value.forEach(i => {
        if (i.id === this.id) {
          i.address = this.inputName;
          i.createTime = Math.round(new Date() / 1000);
        }
      });
      this.tableData = [...value];
      this.inputName = '';
      this.$message.success("修改成功")
      this.isOrderEdit = false;
    },
    handleChange() {},
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
    // 获取列表数据
    async getGoodsList() {
      const res = await this.$http.get(`goods`);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchCol {
  width: 50%;
  margin: 0 0 20px 0;
  float: right;
}
.alert {
  margin: 20px 0;
}
.btnClass {
  margin-bottom: 22px;
  margin-left: 20px;
}

.elCacader {
  min-width: 220px;
}
</style>