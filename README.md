# vue_admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### git 上传
```
1. git init
2. git add README.md
3. git commit -m "first commit"
4. git remote add origin https://github.com/liqijunliqijun/vueAdmin.git
5. git push -u origin master
```
### 创建分支
```
git branch 查看分支
git checkout -b dev-login 创建分支 
git add .
git commit -m "信息"
git push 

切换分支
git checkout master
git add .
git commit -m "版本信息"
git push //之后会提示 没有和远程仓库关联，此时需要以下操作
git push --set-upstream origin  master  
```
 ### 富文本插件使用
 ```
 安装  npm install vue-quill-editor --save

 当前组件使用的应用
 // require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
 
export default {
  components: {
    quillEditor
  }
}



 ```