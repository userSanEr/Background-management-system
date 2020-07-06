<template>
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollage"
      active-text-color="#ffd04b"
      >
      <!-- 
          侧边栏组件
          主要是将角色返回的路由进行渲染 
          并点击各管理列表时进行跳转 实现与导航以及tab的联动
       -->
      <h3 v-show="!isCollage">后台管理系统</h3>
      <h3 v-show="isCollage">管理</h3>
      <!-- 路由信息中没有孩子节点的数据渲染 -->
      <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <!-- 路由中有孩子节点的数据渲染 -->
      <el-submenu index="index" v-for="(item,index) in hasChildren" :key="index">
        <template slot="title">
         <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
        </template>
        <!-- 当前路由的子节点 -->
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
            <i :class="'el-icon-' + subItem.icon"></i>
            <span slot="title">{{subItem.label}}</span>
        </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
    
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        
    },
    computed:{
        //renturn出没有children节点的路由
        noChildren(){
            return this.menu.filter(item => !item.children)
        },
        //renturn出带有children节点的路由
        hasChildren(){
            return this.menu.filter(item => item.children)
        },
        //使用header的菜单管理按钮控制左边栏的收缩
        isCollage(){
            return this.$store.state.tab.isCollapse
        },
        //接收返回的menu菜单
        menu(){
            return this.$store.state.tab.menu
        }
    },
    methods:{
        //点击之后跳转路由
        clickMenu(item){
            this.$router.push({name:item.name})  //跳转到对应页面
            this.$store.commit("selectMenu", item);  //对当前将要跳转的页面进行处理
        }

    }
}
</script>

<style lang="scss" scoped>
.el-menu{
     height: 100%;
     border: none;
     h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
     }
}  
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } 
</style>