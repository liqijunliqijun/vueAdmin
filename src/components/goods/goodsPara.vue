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
              <el-button type="danger">设置动态参数</el-button>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="所属店铺">
                        <span>{{ props.row.shop }}</span>
                      </el-form-item>
                      <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.shopId }}</span>
                      </el-form-item>
                      <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="商品描述">
                        <span>{{ props.row.desc }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="商品 ID" prop="id"></el-table-column>
                <el-table-column label="属性名称" prop="name"></el-table-column>
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
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
            <el-row>
              <el-button type="danger">设置静态参数</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-form>
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
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  methods: {
    handleChange() {},
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
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