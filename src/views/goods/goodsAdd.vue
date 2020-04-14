<template>
  <div class="elCard">
    <!-- 头部面包屑 -->
    <my-bread level1="商品管理" level2="添加商品"></my-bread>
    <el-alert class="alert" title="添加商品信息" type="success" :closable="false" center show-icon></el-alert>
    <!-- 进度条  -->
    <el-steps :space="200" :active="1*active_steps" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form :inline="true" :model="form" class="demo-form-inline fromtabPane" label-width="80px">
      <el-tabs @tab-click="tabChange()" v-model="active_steps" tab-position="left" class="tabPane">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
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
              :options="options"
              :props="defultProp"
              @change="handleChange"
            ></el-cascader>
            {{selectValue}}
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item :label="item.attr_name" v-for="(item,i) in checkboxData" :key="i">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="it" border v-for="(it,i) in item.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attributes_name" v-for="(item,i) in attributes" :key="i">
            <el-input v-model="item.attributes_text"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item class="elFormIitem">
            <el-upload
              :headers="headers"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handlSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item class="elFormIitem">
            <el-button size="small" type="primary" @click="addGoods()">点击提交--商品</el-button>
            <quill-editor class="quillEeditor" v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active_steps: "1",
      form: {
        goods_name: "",
        goods_car: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [], //图片的临时路径
        attrs: [] //文本的数据 对象数组  动态参数和静态数据
      },
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
      attributes: [
        {
          attributes_name: "属性一",
          attributes_text: "股市低迷发狂似的很多时候",
          id: "323"
        },
        {
          attributes_name: "属性二",
          attributes_text: "挂号包裹公开课发",
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
      checkboxData: [
        {
          attr_name: "版式",
          attr_id: 200,
          cat_id: 6,
          attr_sel: "many",
          attr_vals: ["版式一", "版式二", "版式三"]
        },
        {
          attr_name: "内存大小",
          attr_id: 200,
          cat_id: 6,
          attr_sel: "many",
          attr_vals: ["60G", "120G", "250G"]
        },
        {
          attr_name: "主板cpu",
          attr_id: 200,
          cat_id: 6,
          attr_sel: "many",
          attr_vals: ["主板cpu一", "主板cpu二", "主板cpu三"]
        }
      ],
      headers: {
        authorization: localStorage.getItem("token")
      }
    };
  },
  created() {
    // this.getGoodsCate()
  },
  methods: {
    // 提交 商品的所有数据
    // goods_cat  分类
    async addGoods() {
      console.log(this.form);
      // 处理  selectValue 分类
      this.form.goods_car = this.selectValue.join();

      // checkboxData  参数
      let arrCheck = this.checkboxData.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      console.log(arrCheck);
      // attributes  属性
      let arrButes = this.attributes.map(item => {
        return { attr_id: item.id, attr_value: item.attributes_text };
      });
      console.log(arrButes);
      this.form.attrs = [...arrCheck, ...arrButes];
      console.log(this.form.attrs);
      this.$message.success("创建商品成功")
       this.$router.push({name:"goods"});

      const res = await this.$http.post(`goods`, this.from);
     
    },
    // 图片上传 所用方法
    handlePreview(file) {
      console.log(file, "----");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList, "--ssss--");
      this.form.pics = [];
      fileList.forEach(item => {
        this.form.pics.push({
          pic: item.url
        });
      });
    },
    handlSuccess(response, file, fileList) {
      console.log(response, file, fileList, "--chengg--");
      // 返回图片的临时路径
      this.form.pics = [];
      fileList.forEach(item => {
        this.form.pics.push({
          pic: item.url
        });
      });
    },
    // 点击跳转 请求下一步数据
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
    handleChange() {},
    // 获取 商品三级分类
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
      if (this.options instanceof Array) {
        this.options.forEach(item => {
          if (item instanceof Array) {
            return;
          } else {
            item.attr_vals =
              item.attr_vals.length === 0
                ? []
                : item.attr_vals.trim().split(",");
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.elCard {
  height: 100%;
}
.alert {
  margin-bottom: 20px;
}
.fromtabPane {
  padding-top: 30px;
  // height: 300px;
  overflow: auto;
}
.el-tab-pane {
  padding-top: 20px;
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
 
</style>