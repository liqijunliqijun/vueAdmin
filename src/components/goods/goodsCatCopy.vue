<template>
  <el-card>
    <!-- 头部面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-alert class="alert" title="只允许为三级分类,设置参数" type="success" :closable="false" left show-icon></el-alert>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      stripe
      ref="refs" 
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
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
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "sdsd对数函数的 ",
          levels: 1,
          address: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "万二份",
              levels: 2,
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 111,
                  date: "2016-05-01",
                  levels: 3,
                  name: "王三",
                  address: "上海市普陀区金沙江路 1519 弄"
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
          address: "上海市普陀区金沙江路 1517 弄",
          children: [
            {
              id: 21,
              date: "2016-05-01",
              levels: 2,
              name: "李二爷",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "张大爷",
          levels: 1,
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              levels: 2,
              name: "张儿子",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              levels: 2,
              name: "张松之",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        }
      ]
    };
  },

  methods: {
    sortDelet(row) {
      //   console.log(this);
      console.log(row);
      console.log(row.levels);

      if (row.levels * 1 == 1) {
        this.tableData.splice(this.tableData.indexOf(row), 1);
      } else if (row.levels * 1 == 2) {
        // debugger;
        let child1 = [];
        for (let i = 0; i <= this.tableData.length; i++) {
          child1 = this.tableData[i].children;
          console.log(child1)
          for (let j = 0; j < child1.length; j++) {
            if (child1[j].id * 1 == row.id*1) {
              child1.splice(child1.indexOf(child1[j]), 1);
            //   if(){

            //   }
            }
          }
        }
      } else if (row.levels * 1 == 3) {
        let child1 = [];
        let child2 = [];
        for (let i = 0; i <= this.tableData.length; i++) {
         

          child1 = this.tableData[i].children;
          for (let j = 0; j < child1.length; j++) {
            child2 = this.tableData[i].children[j].children;
            for (let k = 0; k < child2.length; k++) {
              if (child2[k].id * 1 == row.id*1) {
                child2.splice(child2.indexOf(child2[k]), 1);
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
</style>