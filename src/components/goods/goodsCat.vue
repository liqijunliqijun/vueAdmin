<template>
  <el-card>
    <!-- 头部面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-button type="success" @click="addClass">添加分类</el-button>
    <el-alert class="alert" title="提交数据之后再填写" type="success" :closable="false" left show-icon></el-alert>

    <el-form :model="classform" class="dialogClass">
      <el-row>
        <el-col class="span" :span="24">
          <el-form-item label="一级分类：" :label-width="formLabelWidth">
            <el-input v-model="claseInputOne" class="inputClass" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" class="btnClass" @click="classAddFn()">提交数据</el-button>
        </el-col>
        <el-col class="span" :span="24">
          <el-form-item label="二级分类：" :label-width="formLabelWidth" type="expand">
            <el-cascader
              clearable
              class="elCacader"
              v-model="selectValueTwo"
              :props="defultProp"
              :options="classDataTwo"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="输入二级分类" class="formTwoLable" :label-width="formLabelWidth">
            <el-input v-model="claseInputTwo" class="inputClass" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" class="btnClass" @click="classAddFn()">提交数据</el-button>
        </el-col>
        <el-col class="span" :span="24">
          <el-form-item label="三级分类：" :label-width="formLabelWidth" type="expand">
            <el-cascader
              clearable
              class="elCacader"
              v-model="selectValueThree"
              :props="defultProp"
              :options="classDataThree"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="输入三级分类" class="formTwoLable" :label-width="formLabelWidth">
            <el-input v-model="claseInputThree" class="inputClass" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" class="btnClass" @click="classAddFn()">提交数据</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="classData">
      <!--treekey => nodekey => 节点的唯一标识 id
          prarentkey  =>父节点的id
          levelkey  => 当前节点的级别
      childkey  => 子节点-->
      <el-table-tree-column
        prop="name"
        label="分类名称"
        treeKey="id"
        parentKey="prantid"
        levelKey="levels"
        childKey="children"
        folder-icon="icon icon-folder"
      ></el-table-tree-column>
      <el-table-column prop="levels" label="是否有效">
        <template slot-scope="scope">
          <span>{{scope.row.levels == 1?"一级":scope.row.levels == 2?"二级":"三级"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="grade" label="是否有效"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="sortEdit(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            size="mini"
            @click="sortDelet(scope.row)"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 动态属性弹窗 -->
    <el-dialog title="添加分类" :visible.sync="isClass">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="inputName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类类别" :label-width="formLabelWidth" type="expand">
          <template>
            <el-cascader
              clearable
              ref="refs"
              class="elCacader"
              v-model="selectValue"
              :props="defultPropTan"
              :options="newchangeData"
              @change="handleChange"
            ></el-cascader>
            {{selectValue}}
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isClass = false">取 消</el-button>
        <el-button type="primary" @click="classAddAlertFn()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  //局部注册组件 组件名   element-tree-grid
  // components: { ElTreeGrid },
  data() {
    return {
      isClass: false,
      isMyClass: false,
      formLabelWidth: "100px",
      classform: {
        id: "",
        name: "",
        attr_vals: []
      },
      claseInputOne: "",
      claseInputTwo: "",
      claseInputThree: "",
      classDataTwo: [],
      classDataThree: [],
      selectValueTwo: [],
      selectValueThree: [],
      defultPropTan: {
        label: "name",
        value: "id",
        children: "children",
        checkStrictly: true
      },
      defultProp: {
        label: "name",
        value: "id",
        children: "children"
      },
      classData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王麻子 ",
          levels: 1,
          prantid: 0,
          grade: "有效",
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "万二份",
              levels: 2,
              prantid: 1,
              grade: "有效",
              children: [
                {
                  id: 111,
                  date: "2016-05-01",
                  levels: 3,
                  prantid: 11,
                  name: "王三",
                  grade: "有效"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "李大爷",
          levels: 1,
          prantid: 0,
          grade: "有效",
          children: [
            {
              id: 21,
              date: "2016-05-01",
              levels: 2,
              prantid: 2,
              name: "李二爷",
              grade: "有效"
            }
          ]
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "张大爷",
          levels: 1,
          prantid: 0,
          grade: "有效",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              levels: 2,
              prantid: 3,
              name: "张儿子",
              grade: "有效"
            },
            {
              id: 32,
              date: "2016-05-01",
              levels: 2,
              prantid: 3,
              name: "张松之",
              grade: "有效"
            }
          ]
        }
      ],
      selectValue: [],
      inputName: "",
      newchangeData: [],
      newClassData: [],
      info: []
    };
  },
  created() {
    this.infoFn();
  },
  methods: {
    // 处理分级数据 方法
    infoFn() {
      var twoData = JSON.parse(JSON.stringify(this.classData));
      var threeData = JSON.parse(JSON.stringify(this.classData));
      // 筛选一级分类
      twoData.forEach(i => {
        delete i.children;
      });
      // 筛选 一二级 分类数据
      threeData.forEach(i => {
        i.children.forEach(k => {
          delete k.children;
        });
      });
      this.classDataTwo = twoData;
      this.classDataThree = threeData;
    },

    // 添加分类
    addClass() {
      // 筛选 一二级 分类数据
      var changeData = JSON.parse(JSON.stringify(this.classData));
      changeData.forEach(i => {
        if (i.children) {
          i.children.forEach(k => {
            delete k.children;
          });
        } else {
          return;
        }
      });
      this.newchangeData = changeData;
      this.isClass = true;
    },
    // 提交添加的数据
    classAddAlertFn() {
      console.log(this.inputName);
      console.log(this.selectValue);
      var value = [...this.selectValue];
      console.log(value);
      if (value.length === 0) {
        this.newClassData[0] = {
          id: this.classData.length + 1,
          date: new Date(),
          name: this.inputName,
          levels: 1,
          prantid: 0,
          grade: "有效",
          children: []
        };
        this.classData.push(this.newClassData[0]);
        this.inputName = "";
        this.isClass = false;
        this.$message.success("添加成功");
      } else if (value.length === 1) {
        if (this.classData instanceof Array) {
          this.classData.forEach(i => {
            if (i.id === value[0]) {
              if (i.children != []) {
                this.info[0] = {
                  id: value[0] * 10 + i.children.length + 1,
                  date: new Date(),
                  name: this.inputName,
                  levels: 2,
                  prantid: value[0],
                  grade: "有效",
                  children: []
                };
                i.children.push(this.info[0]);
                this.inputName = "";
                this.isClass = false;
                this.$message.success("添加成功");
              } else {
                this.info[0] = {
                  id: value[0] * 10 + i.children.length + 1,
                  date: new Date(),
                  name: this.inputName,
                  levels: 2,
                  prantid: value[0],
                  grade: "有效",
                  children: []
                };

                i.children.push(this.info[0]);
                this.inputName = "";
                this.isClass = false;
                this.$message.success("添加成功");
                console.log(this.classData);
              }
            }
          });
        }
      } else if (value.length === 2) {
        if (this.classData instanceof Array) {
          this.classData.forEach(item => {
            item.children.forEach(i => {
              if (i.id === value[1]) {
                if (i.children == undefined) {
                  i.children = [];
                  this.info[0] = {
                    id: value[0] * 100 + value[1] + i.children.length + 1,
                    date: new Date(),
                    name: this.inputName,
                    levels: 3,
                    prantid: value[1],
                    grade: "有效"
                  };
                  i.children.push(this.info[0]);
                  this.inputName = "";
                  this.isClass = false;
                  this.$message.success("添加成功");
                } else {
                  this.info[0] = {
                    id: value[0] * 100 + value[1] + i.children.length + 1,
                    date: new Date(),
                    name: this.inputName,
                    levels: 3,
                    prantid: value[1],
                    grade: "有效"
                  };
                  debugger;
                  i.children.push(this.info[0]);
                  this.inputName = "";
                  this.isClass = false;
                  this.$message.success("添加成功");
                }
              }
            });
          });
        }
      }
    },
    changeValue(e) {
      console.log(e);
    },
    handleChange() {
      console.log(this.selectValue);
    },
    classAddFn() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sortEdit(row) {
      console.log(row);
    },
    sortDelet(row) {
      if (row.levels * 1 == 1) {
        this.classData.splice(this.classData.indexOf(row), 1);
      } else if (row.levels * 1 == 2) {
        var value = [...this.classData];
        this.classData.splice(0, this.classData.length);
        var index1, index2;
        for (var i = 0; i < value.length; i++) {
          for (var j = 0; j < value[i].children.length; j++) {
            if (value[i].children[j].id * 1 == row.id * 1) {
              index1 = i;
              index2 = j;
            }
          }
        }
        value[index1].children.splice(value[index1].children[index2], 1);
        this.classData = [...value];
      } else if (row.levels * 1 == 3) {
        var value = [...this.classData];
        this.classData.splice(0, this.classData.length);
        var index1, index2, index3;
        for (var i = 0; i < value.length; i++) {
          for (var j = 0; j < value[i].children.length; j++) {
            for (var k = 0; k < value[i].children[j].children.length; k++) {
              if (value[i].children[j].children[k].id * 1 == row.id * 1) {
                debugger;
                // child2[0].splice(child2.indexOf(child2[k]), 1);
                index1 = i;
                index2 = j;
                index3 = k;
                console.log(index1, index2, index3);
                value[index1].children[index2].children.splice(
                  value[index1].children[index2].children[index3],
                  1
                );
                this.classData = [...value];
                  return;
              }else{ 
                 return;
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  margin: 20px 0;
}
.btnClass {
  margin-bottom: 22px;
  margin-left: 20px;
}

.inputClass {
  max-width: 220px;
}
.span {
  display: flex;
  align-items: center;
}
</style>