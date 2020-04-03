<template>
  <el-container class="box">
    <el-header class="hearder">
      <el-row class="row">
        <el-col class="col" :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/img/logo.png" alt />
            <el-radio-group v-model="isCollapse"
             style="margin-bottom: 20px;" >
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
        <el-menu 
            :router="true"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse" 
          :unique-opened = "true"
            >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="users">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
                </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">添加商品</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="2-1">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
                </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="3-1">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
                </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="4-1">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
                </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">会员管理</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="5-1">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="5-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
                </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
               <i class="el-icon-setting"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="6-1">
                <i class="el-icon-location"></i>
                <span slot="title">选项1</span>
              </el-menu-item>
              <el-menu-item index="6-2">
                <i class="el-icon-location"></i>
                <span slot="title">选项2</span>
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
    };
  },
  beforeCreate (){
      const token = localStorage.getItem('token')
      if(!token){
          this.$router.push({ name: "login" })
      }
  },

     methods: {
       closeBtn (){
           localStorage.clear()
           this.$message.success("退出成功")
           this.$router.push({ name:"login" })
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