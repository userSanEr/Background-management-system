import Vue from 'vue'
import App from './App.vue'

//引入配置好的路由
import router from './router'

//导入全局样式表
import '@/assets/scss/reset.scss'

//引入element ui
import './plugins/element'

//引入store
import store from './store'

//引入axios
import http from './api/config'

//引入mockjs
import './mock'

Vue.config.productionTip = false

//挂载原型
Vue.prototype.$http = http

//to 即将进入的路由 from 离开的路由 next 钩子 进行下一步
//判断用户登录状态 未登录跳转登录页 已登录跳转首页
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

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    this.$store.commit('addMenu',this.$router)  //将返回的角色路由添加到路由中
  }
}).$mount('#app')
