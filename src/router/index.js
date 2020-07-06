// 引入 Vue
import Vue from 'vue';
// 引入 vue-router
import VueRouter from 'vue-router';
// 安装使用 vue-router
Vue.use(VueRouter);

// 开始使用 vue-router
let routes = new VueRouter({
    routes: [
        {
          path: '/login',
          name: 'login',
          component: () =>import ('@/views/Login/login.vue')
        }
      ]
});
// 提供接口给外面使用
export default routes;