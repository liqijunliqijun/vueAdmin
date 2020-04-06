<template>
  <div class="login">
    <el-form class="loginCent" :label-position="labelPosition" label-width="80px" :model="fromdata">
      <h2>用户登录</h2>
      <el-form-item label="名称: ">
        <el-input v-model="fromdata.name"></el-input>
      </el-form-item>
      <el-form-item label="密码: ">
        <el-input v-model="fromdata.password"></el-input>
      </el-form-item>
      <el-button class="btn" @click.prevent="handleLogin()" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            labelPosition: 'top',
            fromdata:{
                name:'',
                password:''
            }
        }
    },
    methods:{
        handleLogin() {
            this.$message.success('登陆成功')
            localStorage.setItem("token",'localStorage---token567')
            this.$router.push({ name: 'home' })

            this.$http.post("login",this.fromdata).then(res => {
            
                //对象解构赋值
                const {data,meta:{mes,status}} = res.data;
                if(status == 200){
                    // 保存token
                    localStorage.setItem("token",data.token)
                    // 跳转 home
                    this.$router.push({ name: 'home' })
                    this.$message.success(msg)
                }else{
                     this.$message.warning(msg)
                }
            })
        }
        // es7写法
        // 找到异步操作有结果的代码 前面加await 并定义变量 接受‘
        // 找到异步操作有结果代码-离他最近的方法前面加 async

        // async handleLogin () {
        //     const res = this.$http.post("login",this.fromdata);
        //     const {data,meta:{mes,status}} = res.data;
        //     if(status == 200){ 
        //         localStorage.setItem("token",data.token)
        //         this.$router.push({ name: 'home' })
        //         this.$message.success(msg)
        //     }else{
        //             this.$message.warning(msg)
        //     }  
        // }  

    }

};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: rgb(24, 2, 75);
  display: flex;
  justify-content: center;
  align-items: center;
  .loginCent {
    background: #ffffff;
    border-radius: 12px;
    padding: 0 20px;
    text-align: center;
    h2 {
      color: #3a3a3a;
    }
    .el-form-item {
      display: flex;
      .el-input {
        width: 300px;
      }
    }
    .btn {
      width: 100px;
      text-align: center;
      margin: 0 auto 20px auto;
    }
  }
}
</style>