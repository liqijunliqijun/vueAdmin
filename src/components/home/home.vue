<template>
  <el-container class="box">
    <el-header class="hearder">
      <el-row class="row">
        <el-col class="col" :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/img/logo.png" alt />
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light">
            <h2>后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a @click="closeBtn" href="javascript:;">推出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="left" width="isCollapse?'200px':'64px'">
       <!-- :unique-opened="true" 	是否只保持一个子菜单的展开 -->
       <!-- collapse 	是否水平折叠收起菜单 -->
        <el-menu
        class="el-menu-vertical-demo" 
        @open="handleOpen"
         @close="handleClose"
          :collapse="isCollapse"
          :router="true"  
          >
          <el-submenu
          v-for="(item1,i) in menus " :key="i"
           :index="item1.order.toString()">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item1.authName}}</span>
            </template>
             <el-menu-item-group>
              <el-menu-item
                v-for="(item2,i) in item1.children " :key="i"
               :index="item2.path">
                <i class="el-icon-location"></i>
                <span slot="title">{{item2.authName}}</span>
              </el-menu-item>
               </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="right">
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menus:[
        {
          authName:"用户管理",
          id:125,
          order:1,
          path:"users",
          children:[
            {
              authName:"用户列表",
              id:110,
              order:null,
              path:"users",
            }
          ]
        },
        {
          authName:"商品管理",
          id:126,
          order:2,
          path:"goods",
          children:[
            {
              authName:"添加商品",
              id:120,
              order:null,
              path:"goods",
            },
            {
              authName:"删除商品",
              id:122,
              order:null,
              path:"goods",
            },
            {
              authName:"商品分类",
              id:123,
              order:null,
              path:"goods",
            },
           
          ]
        },
        {
          authName:"订单管理",
          id:127,
          order:3,
          path:"orders",
          children:[
            {
              authName:"用户管理",
              id:125,
              order:null,
              path:"users",
            },
            {
              authName:"用户管理",
              id:125,
              order:null,
              path:"users",
            }
          ]
        },
        {
          authName:"数据管理",
          id:128,
          order:4,
          path:"erports",
          children:[
            {
              authName:"用户数据",
              id:125,
              order:null,
              path:"users",
            },
            {
              authName:"数据图表",
              id:125,
              order:null,
              path:"users",
            }
          ]
        },
        {
          authName:"权限管理",
          id:129,
          order:5,
          path:"purview",
          children:[
            {
              authName:"角色列表",
              id:151,
              order:null,
              path:"purview",
            },
            {
              authName:"权限管理",
              id:152,
              order:null,
              path:"role",
            }
          ]
        },
        
      ]
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },

  methods: {
    // 获取 导航数据
    async getMenus(){
      const res = await this.$http.get(`menus`)
      this.menus -= res.data.data;

    },
    closeBtn() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  .hearder {
    background: rgb(192, 215, 241);
  }
  .container {
    // background: #999999;
    .left {
      background: #efefef;
    }
    .right {
      .main {
        // background: #f37c22;
      }
      .footer {
        background: rgb(78, 2, 199);
      }
    }
  }
}
.row {
  display: flex;
  align-items: center;
  height: 100%;
  .col {
    height: 100%;
    .grid-content {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
.grid-content img {
  height: 100%;
  display: inline-block;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>