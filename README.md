#### 1、使用vue-cli3以及element-ui进行构建

实现功能：

登录：

主要逻辑：

- 根据用户名以及密码 后台返回用户角色以及token值 
- 在点击登录时先清空之前的路由信息、将角色路由、token存如cookie
- 然后添加返回的角色路由
- 跳转主页面

注意细节：

- 在路由前置：判断用户登录状态 未登录跳转登录页 已登录跳转首页 ==> 防止路由死循环

  ```
  router.beforeEach((to,from,next)=>{
    //从cookie中获取token 防止刷新后token丢失
    store.commit('getToken') 
    //从cookie中获取menu
    store.commit('getMenu') 
    let token = store.state.user.token
    // 过滤登录页，防止死循环
    if(!token && to.name !== 'login'){
      next({name:'login'})
    }else{
      next()  //放行
    }
  })
  ```

  最后要注意添加路由到动态路由中

- 在退出登录时清空token、menu、刷新页面

首页：

主要逻辑：

- 主要实现侧边栏、导航栏、tab栏三级联动
- 在侧边栏点击时将当前点击的route对象存入state中 分别存如current、tabList两者分别控制header、tab
- 在header中显示currentpath、label
- 在tab中对点击的历史记录进行显示 tablist中取出 然后展示 点击x号关闭 点击标签跳转
- 对echarts的封装 具体思路代码中有 

用户

主要逻辑：

- 实现对用户数据的增、删、改、查以及分页器的使用 
- 对form表单的封装
