<template>
  <el-card>
    <my-bread level1="角色管理" level2="角色列表"></my-bread>
    <!--角色列表 -->
    <el-row>
      <el-button>添加角色</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand" style="width: 150">
        <template slot-scope="scope">
          <el-row v-for="(item,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                effect="dark"
                @close="deleRole(scope.row,item.id)"
                :type="item.type"
                closable
              >{{ item.name}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(itemtage,ind) in item.children" :key="ind">
                <el-col :span="4">
                  <el-tag
                    @close="deleRole(scope.row,itemtage.id)"
                    :type="itemtage.type"
                    closable
                  >{{ itemtage.name}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="(value,index) in itemtage.children"
                    :key="index"
                    @close="deleRole(scope.row, value.id)"
                    :type="value.type"
                  >{{ value.name}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--无权限提示 -->
          <span v-if="scope.row.children.length === 0 ">未分配权限,请联系管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="roleFn(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="roleEditFn(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            size="mini"
            @click="roleDeletFn()"
            plain
            type="warning"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 角色权限用户 -->
    <el-dialog title="添加用户" :visible.sync="isRoleEdit">
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="expandedRoleId"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isRoleEdit = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRightFn()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isRoleEdit: false,
      tableData: [
        {
          id: "1",
          name: "主管",
          desc: "技术负责人",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              id: "1",
              name: "商品管理",
              type: "success",
              children: [
                {
                  id: "11",
                  name: "用户列表",
                  type: "warning",
                  children: [
                    { id: "111", name: "标签五", type: "info" },
                    { id: "112", name: "标签五", type: "info" },
                    { id: "113", name: "标签五", type: "info" },
                    { id: "114", name: "标签五", type: "info" }
                  ]
                },
                {
                  id: "12",
                  name: "添加商品",
                  type: "warning"
                }
              ]
            },
            {
              id: "2",
              name: "数据统计",
              type: "success"
            }
          ]
        },
        {
          id: "2",
          name: "管理员",
          category: "开发人员",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              name: "用户管理",
              type: "success",
              children: [
                {
                  name: "用户列表",
                  type: "warning"
                }
              ]
            }
          ]
        },
        {
          id: "3",
          name: "店员",
          desc: "用户--二级代理",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: []
        },
        {
          id: "4",
          name: "会员",
          desc: "会员--c端客户",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: []
        }
      ],
      treeData: [
        {
          id: 1,
          label: "商品管理",
          pid: 0,
          children: [
            {
              id: 11,
              label: "商品列表",
              pid: 1,
              children: [
                {
                  id: 111,
                  pid: 11,
                  label: "添加商品"
                },
                {
                  id: 112,
                  pid: 11,
                  label: "修改商品"
                },
                {
                  id: 3,
                  pid: 11,
                  label: "修改商品图片"
                },
                {
                  id: 114,
                  pid: 11,
                  label: "修改商品价格"
                },
                {
                  id: 115,
                  pid: 11,
                  label: "修改商品描述"
                }
              ]
            },
            {
              id: 12,
              label: "商品分类",
              pid: 1
            }
          ]
        },
        {
          id: 2,
          label: "订单管理",
          pid: 0,
          children: [
            {
              id: 21,
              pid: 2,
              label: "删除订单"
            },
            {
              id: 22,
              pid: 2,
              label: "修改订单"
            }
          ]
        },
        {
          id: 3,
          label: "用户管理",
          pid: 0,
          children: [
            { id: 31, pid: 3, label: "删除用户" },
            {
              id: 32,
              pid: 3,
              label: "添加用户",
              children: [
                {
                  id: 321,
                  pid: 32,
                  label: "修改电话"
                },
                {
                  id: 322,
                  pid: 32,
                  label: "修改密码"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      expandedRoleId: [], //当前角色又有的权限
      surrRoleId: "" //当前角色的id
    };
  },
  created() {
    //   this.getRoleInfo()  获取所有权限 数据
  },
  methods: {
    async getRoleInfo() {
      //   获取 权限列表数据
      const res = await this.$http.get(`role`);
      this.tableData = res.data.data;
    },
    //   删除角色权限
    async deleRole(role, rightid) {
      //  roleId 角色id
      //  rightid 权限id
      const res = await this.$http.delete(`role/${role.id}/rights/${rightid}`);
      this.$message.success("删除成功");
      // 只刷新当前 角色的权限
      // 删除成功后必须返回 剩余权限
      role.children = res.data.data;
      //从新获取数据
    },
    //   修改权限
    async roleEditFn(role) {
      console.log("=======");
      this.isRoleEdit = true;
      //保存当前角色的id
      this.surrRoleId = role.id;

      //   获取 树形结构角色的所有权限
      const res = await this.$http.get(`rights/tree`);
      // 赋值给 treeData
      // this.treeData = res.data.data
      // 获取当前角色  拥有的id 通过 role传经来的数据
      console.log(role.children instanceof Array);
      if (role.children instanceof Array == true) {
        role.children.forEach(item => {
          if (item.children instanceof Array == true) {
            console.log(item.id);
            // arrId1.push(item.id);
            item.children.forEach(item1 => {
              //   arrId1.push(item1.id);
              if (item1.children instanceof Array == true) {
                item1.children.forEach(item2 => {
                  arrId1.push(item2.id);
                });
              }
            });
          }
        });
      }
      console.log(arrId1);
      this.expandedRoleId = arrId1;
    },
    //   提交 修改的权限
    async setRoleRightFn() {
      // role/:roleId/rights
      // roleId 当前要修改权限的角色 id  => surrRoleId
      // 树形结构节点  所有有全选和半选
      this.isRoleEdit = false;
      console.log(this);
      console.log(this.$refs);

      // 获取 全选的权限id  方法=》  getCheckedKeys()
      let arr1 = this.$refs.tree.getCheckedKeys();

      // 获取半选节点权限的id 方法=》  getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys();

      let arr = [...arr1, ...arr2];
      console.log(arr);
      console.log(arr.join(","));
      const res = await this.$http.get(`roles/${this.surrRoleId}/rights`, {
        rids: arr.join(",")
      });
      // 更新数组

      // 注意：
      // el-tree -->js 方法 getCheckedKeys
      // 1. 给操作的dom元素 设置ref 属性值   eg: ref = "txt"
      // 2. this.$refs.ref 属性值 .js 方法名  eg: this.$refs.txt.foucs()
    },
    roleFn() {
      class Arr extends Array{
          constructor(){
            super()
          }
        }
          let arr1 = new Arr()
          arr1.push('1')
          console.log(arr1); 
          console.log(Object.prototype)
    },
    roleDeletFn() {}
  }
};
</script>

<style lang="scss" scoped>
// .demo-table-expand {
//   font-size: 0;
// }
// .demo-table-expand label {
//   width: 90px;
//   color: #99a9bf;
// }
// .demo-table-expand .el-form-item {
//   margin-right: 0;
//   margin-bottom: 0;
//   width: 50%;
// }
</style>