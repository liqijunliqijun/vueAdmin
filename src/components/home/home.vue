<template>
  <el-container class="box">
    <el-aside class="left" width="isCollapse?'200px':'64px'">
      <!-- " 	是否只保持一个子菜单的展开 -->
      <!-- collapse 	是否水平折叠收起菜单 -->
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
        :unique-opened="true"
           default-active="1-1"
      >
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <span
          class="iconfont icon-nav toggleNavCollapse"
          :class="{active:isSidebarNavCollapse}"
          @click="toggleNavCollapse"
        ></span>
        <el-submenu
          v-for="(item1,i) in menus "
        
          :key="i"
          :index="item1.order.toString()" 
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item1.authName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item2,i) in item1.children " :key="i" :index="item2.path">
              <i class="el-icon-location"></i>
              <span slot="title">{{item2.authName}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header class="hearder">
        <el-row class="row">
          <el-col class="col" :span="8">
            <div class="grid-content bg-purple">
              <img src="../../assets/img/logo.png" alt />
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
      isSidebarNavCollapse: true,
      isCollapse: false,
      menus: [
        {
          authName: "用户管理",
          id: 125,
          order: 1,
          path: "users",
          children: [
            {
              authName: "用户列表",
              id: 110,
              order: null,
              path: "users"
            }
          ]
        },
        {
          authName: "商品管理",
          id: 126,
          order: 2,
          path: "goods",
          children: [
            {
              authName: "商品管理",
              id: 120,
              order: null,
              path: "goods"
            },
            {
              authName: "分类参数",
              id: 122,
              order: null,
              path: "goodsPara"
            },
            {
              authName: "商品分类",
              id: 123,
              order: null,
              path: "goodsCat"
            }
          ]
        },
        {
          authName: "订单管理",
          id: 127,
          order: 3,
          path: "orders",
          children: [
            {
              authName: "订单列表",
              id: 125,
              order: null,
              path: "order"
            },
            {
              authName: "数据分析",
              id: 125,
              order: null,
              path: "orderData"
            }
          ]
        },
        {
          authName: "数据管理",
          id: 128,
          order: 4,
          path: "report",
          children: [
            {
              authName: "用户数据",
              id: 125,
              order: null,
              path: "report"
            },
            {
              authName: "数据图表",
              id: 126,
              order: null,
              path: "reportTwo"
            },
            {
              authName: "数据图表",
              id: 127,
              order: null,
              path: "reportThree"
            }
          ]
        },
        {
          authName: "权限管理",
          id: 129,
          order: 5,
          path: "purview",
          children: [
            {
              authName: "角色列表",
              id: 151,
              order: null,
              path: "purview"
            },
            {
              authName: "权限管理",
              id: 152,
              order: null,
              path: "role"
            },
            {
              authName: "测试",
              id: 153,
              order: null,
              path: "text"
            }
          ]
        },
        {
          authName: "操作日志",
          id: 130,
          order: 6,
          path: "echarts",
          children: [
            {
              authName: "操作日志",
              id: 131,
              order: null,
              path: "echarts"
            }
          ]
        }
      ]
    };
  },

  methods: {
    toggleNavCollapse() {
      this.isSidebarNavCollapse = false;
    },
    // 获取 导航数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
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
  .left {
    .el-menu-vertical-demo {
      background: linear-gradient(
        to bottom,
        rgb(154, 218, 230),
        rgb(194, 248, 252)
      );
    }
  }
  .container {
    .hearder {
      background: linear-gradient(
        to right,
        rgb(66, 233, 163),
        rgb(63, 176, 252)
      );
      border-bottom: 1px solid #cccccc;
    }
    position: relative;
    .right {
      .footer {
        background: rgb(73, 73, 73);
        height: 40px !important;
        line-height: 40px !important;
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
.grid-content {
  color: #ffff;
  a {
    color: #ffff;
  }
  img {
    height: 100%;
    display: inline-block;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>