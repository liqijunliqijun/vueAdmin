<template>
  <el-card>
    <!-- 头部面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <el-alert class="alert" title="只允许为三级分类,设置参数" type="success" :closable="false" left show-icon></el-alert>
    <el-form>
      <el-row>
        <el-form-item>
          <span class="demonstration">商品分类</span>
          <!--
            :options 表单数据
            v-model="selectValue" 最终选择的label对应的value 会在 selectValue数组中
            :props = "{label:'label' ,value:'value' ,children:'children' }"
          -->
          <el-cascader
            clearable
            class="elCacader"
            v-model="selectValue"
            :show-all-levels="false"
            :options="options"
            :props="defultProp"
            @change="handleChange"
          ></el-cascader>
          {{selectValue}}
        </el-form-item>
      </el-row>
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <el-row>
              <el-button type="danger" @click="addMoverInfo">添加动态参数</el-button>
              <el-table class="elTable" :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-tag
                      :key="tag"
                      v-for="tag in scope.row.attr_vals"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(scope.row,tag)"
                    >{{tag}}</el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
                    ></el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                    >+ New Tag</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="商品 ID" prop="id"></el-table-column>
                <el-table-column label="属性名称" prop="name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="listMoveEdit(scope.row)"
                      size="mini"
                      plain
                      type="primary"
                      icon="el-icon-edit"
                      circle
                    ></el-button>

                    <el-button
                      size="mini"
                      @click="listMoveDelet(scope.row)"
                      plain
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <el-row>
              <el-button type="danger">添加静态参数</el-button>
              <el-table class="elTable" :data="attributes" style="width: 100%">
                <el-table-column label="商品 ID" prop="id"></el-table-column>
                <el-table-column label="商品属性" prop="attributes_text"></el-table-column>
                <el-table-column label="属性名称" prop="attributes_name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="staticEdit(scope.row)"
                      size="mini"
                      plain
                      type="primary"
                      icon="el-icon-edit"
                      circle
                    ></el-button>

                    <el-button
                      size="mini"
                      @click="staticDelet(scope.row)"
                      plain
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-form>
    <!-- 添加 动态属性弹窗 -->
    <el-dialog title="添加动态属性" :visible.sync="isMove">
      <el-form :model="moveform">
        <el-form-item label="属性id" :label-width="formLabelWidth">
          <el-input v-model="moveform.id" disabled autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="属性名" :label-width="formLabelWidth">
          <el-input v-model="moveform.name" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="属性" :label-width="formLabelWidth" type="expand">
          <template >
            <el-tag
              :key="tag"
              v-for="tag in moveform.attr_vals"
              closable
              :disable-transitions="false"
              @close="movehandleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="moveinputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="movehandleInputConfirm()"
              @blur="movehandleInputConfirm()"
            ></el-input>
            <el-button v-else class="button-new-tag" type="success" size="small"
             @click="showInput">+ 点击添加</el-button>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isMove = false">取 消</el-button>
        <el-button type="primary" @click="moveAddFn()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- x修改  动态属性弹窗-->
    <el-dialog title="修改动态属性" :visible.sync="isMoveEdit">
      <el-form :model="moveformEdit">
        <el-form-item label="属性id" :label-width="formLabelWidth">
          <el-input v-model="moveformEdit.id" disabled autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="属性名" :label-width="formLabelWidth">
          <el-input v-model="moveformEdit.name" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="属性" :label-width="formLabelWidth" type="expand">
          <template >
            <el-tag
              :key="tag"
              v-for="tag in moveformEdit.attr_vals"
              closable
              :disable-transitions="false"
              @close="moveEditAttrsFn(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="moveinputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handMoveEditAttrsFn()"
              @blur="handMoveEditAttrsFn()"
            ></el-input>
            <el-button v-else class="button-new-tag" type="success" size="small"
             @click="showInput">+ 点击添加</el-button>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isMoveEdit = false">取 消</el-button>
        <el-button type="primary" @click="moveEditFn(moveformEdit)">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      selectValue: [],
      defultProp: {
        label: "label",
        value: "id",
        children: "children"
      },
      // 商品分类三级联动
      options: [
        {
          id: 1,
          pid: 0,
          label: "指南",
          children: [
            {
              id: 11,
              pid: 1,
              label: "设计原则",
              children: [
                { id: 12, pid: 11, label: "一致" },
                { id: 13, pid: 11, label: "反馈" }
              ]
            },
            {
              id: 15,
              pid: 1,
              label: "导航",
              children: [{ id: 16, pid: 15, label: "侧向导航" }]
            }
          ]
        },
        {
          id: 2,
          pid: 0,
          label: "组件",
          children: [
            {
              id: 21,
              pid: 2,
              label: "Basic",
              children: [
                { id: 22, pid: 21, label: "Layout 布局" },
                {
                  id: 23,
                  pid: 21,
                  label: "Color 色彩"
                }
              ]
            },
            {
              id: 25,
              pid: 2,
              label: "Form",
              children: [
                {
                  id: 26,
                  pid: 25,
                  label: "Radio 单选框"
                },
                {
                  id: 27,
                  pid: 25,
                  label: "Checkbox 多选框"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          pid: 0,
          label: "资源",
          children: [
            {
              id: 31,
              pid: 3,
              label: "组件交互文档",
              children: [
                {
                  id: 32,
                  pid: 31,
                  label: "交互文档"
                }
              ]
            }
          ]
        }
      ],
      activeName: "first",
      formLabelWidth: "100px",
         inputVisible: false,
      // 动态参数 列表
      tableData: [
        {
          id: "1",
          name: "规格",
          shopId: "122",
          attr_vals: ["规格一", "规格二", "规格三"]
        },
        {
          id: "2",
          name: "尺寸",
          shopId: "123",
          attr_vals: ["尺寸一", "尺寸二", "尺寸三"]
        },
        {
          id: "3",
          name: "颜色",
          shopId: "124",
          attr_vals: ["朱红色", "瓦灰色", "米兰色"]
        },
        {
          id: "4",
          name: "套餐",
          shopId: "125",
          attr_vals: ["套餐一", "套餐二", "套餐三"]
        }
      ],
      form: {},
      isMove:false,
      isMoveEdit: false, 
      moveinputValue:'', 
      moveformEdit:{
          id:'',
            name:'', 
            attr_vals:[]
      }, //单击修改 弹出当前 属性数据 
      moveform: {
              id:'',
            name:'', 
            attr_vals:[]
        
      },
      // 静态参数
      attributes: [
        {
          attributes_name: "属性一",
          attributes_text: "股市低迷发狂 候",
          id: "323"
        },
        {
          attributes_name: "属性二",
          attributes_text: "挂号包 课发",
          id: "324"
        },
        {
          attributes_name: "属性三",
          attributes_text: "广汇股份规定",
          id: "325"
        },
        {
          attributes_name: "属性四",
          attributes_text: "广汇股份撒旦",
          id: "326"
        }
      ], 
      inputValue: ""
    };
  },
  methods: {
    //添加动态数据
    addMoverInfo () {
      this.isMove = true;
      this.moveform.id = this.tableData.length+1;
    },
    movehandleInputConfirm(){
       let inputValue = this.moveinputValue;
        if (inputValue) { 
          this.moveform.attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.moveinputValue = ''; 
      console.log(this.moveform)
    },
    movehandleClose(tag){
       this.moveform.attr_vals.splice(this.moveform.attr_vals.indexOf(tag), 1);
    },
    // 提交 添加的参数
    moveAddFn(){
      this.tableData.push(this.moveform)
      this.isMove = false;
      this.$message.success('添加成功')
    },


    // 删除 角色属性
    listMoveDelet(row) {
      this.tableData.splice(this.tableData.indexOf(row), 1);
      // 此处提交数据
      // .....
    },
 // 点击修改
    listMoveEdit(row) { 
      this.isMoveEdit = true;
      this.moveformEdit = row; 
      console.log("代理及修改",row)
    },
    moveEditAttrsFn(tag){
         this.moveformEdit.attr_vals.splice(this.moveformEdit.attr_vals.indexOf(tag), 1);
        console.log("删除",this.moveformEdit)
    },
    handMoveEditAttrsFn(){
       let inputValue = this.moveinputValue;
        if (inputValue) { 
          this.moveformEdit.attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.moveinputValue = ''; 
        console.log("回车视角",this.moveformEdit)
    },
    // 修改  提交
    moveEditFn(row){
      // this.tableData.indexOf(row.id)=this.moveformEdit;
      let index = this.tableData.indexOf(row)
          console.log(index)
          console.log(row)
          console.log("提交",this.moveformEdit.id)
          if(this.tableData instanceof Array){
             this.tableData.map((i) =>{
            if(i.id*1 == this.moveformEdit.id){
              i = {...this.moveformEdit};
            }
          })
          } 
          this.$message.success("修改成功")
           this.isMoveEdit = false;
    },



    
    //点击 X按钮
    async handleClose(row, tag) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
      // 发  put 请求
      // categors/:id/attributes/:attrId
      // attr_name  参数名
      // attr_sel [only,many] 静态还是动态
      // attr_vals 如是manny 需填写值的选项
      let putData = {
        attr_name: row.name,
        attr_sel: "many",
        attr_vals: row.attr_vals.join(",")
      };
      const res = await this.$http.put(
        `categors/${this.selectValue[2]}/attributes/${row.attr_id}`,
        putData
      );
    },
    // 点击 newTag+按钮
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 回车 失去焦点  提交修改的数据
    async handleInputConfirm(row) {
      let inputValue = this.inputValue;
      console.log(row)
      if (inputValue) {
        row.attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      let putData = {
        attr_name: row.name,
        attr_sel: "many",
        attr_vals: row.attr_vals.join(",")
      };
      const res = await this.$http.put(
        `categors/${this.selectValue[2]}/attributes/${row.attr_id}`,
        putData
      );
    },
    handleChange() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击 请求  该商品下的 动态参数和静态参数
    async tabChange() {
      if (this.active_steps === "2") {
        if (this.selectValue.length !== 3) {
          this.$message.warning("请选择商品分类");
        } else {
          // 获取商品  参数  数据
          const res = await this.$http.get(
            `categories/${this.selectValue[2]}/attributes?sel=many`
          );
          this.checkboxData = res.data.data;
        }
      } else if (this.active_steps === "3") {
        // 获取商品 属性的  数据
        const res = await this.$http.get(
          `categories/${this.selectValue[2]}/attributes?sel=sul`
        );
        this.attributes = res.data.data;
      }
    },
    //修改静态数据
    staticEdit(val) {},
    //删除静态数据
    staticEelet(val) {
      this.$message.success("删除成功");
      this.attributes.splice(this.attributes.indexOf(row), 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.alert {
  margin-bottom: 20px;
}

.demonstration {
  padding-right: 20px;
  text-align: right;
  vertical-align: middle;
  width: 80px;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.elCacader {
  width: 300px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>