<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name:"my-bread",//组件名
        data (){
            return{
            }
        },
        // props 值字符串数据
        // props 的值的用法和data数据用法一样
        // props 中的数据的值  来源于使用组件时穿的值
        // props 中的数据也是该组件的属性 <child-a :msg="abc">
        props:['level1','level2'],
    }
</script>

<style lang="scss" scoped>

</style>