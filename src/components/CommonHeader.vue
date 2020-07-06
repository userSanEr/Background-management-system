<template>
  <div class="header">
      <!-- 
          header组件
          将当前显示的页面显示在面包屑上
          以及点击退出时的操作逻辑
       -->
       <div class="l-content">
           <!-- 收缩aside -->
           <el-button @click="closeMenu" type="default" icon="el-icon-menu" size="mini"></el-button>
           <!-- 面包屑导航 separator：分隔符 每个面包屑之间用什么进行分离-->
           <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- 如果存在新的页面 则显示 ：to 跳转路径  label：跳转页面名称-->
                <el-breadcrumb-item :to="current.path" v-if = "current">
                    {{ current.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
       </div>
       <!-- 登录的头像框 以及点击下拉 -->
       <div class="r-content">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link" size="mini">
                    <img :src="userImg" class="user"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
       </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            current: state =>state.tab.currentMenu  //当前页面
        })
    },
    data(){
        return {
            userImg: require('../assets/images/user.png')  //头像
        }
    },
    methods: {
        //改变侧边栏状态
        closeMenu(){
            this.$store.commit('collapseMenu')  
        },
        //退出登录
        logOut(){
             this.$store.commit('clearToken')  //清空存入的token
             this.$store.commit('clearMenu')  //清空存入的角色列表
             location.reload()  //刷新
        }

    }
}
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-breadcrumb{
            margin-left: 20px;
        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>

<style lang="scss">
    .el-breadcrumb__item{
        .el-breadcrumb__inner{
            color: #666;
            font-weight: 400;
        }
        &:last-child{
            .el-breadcrumb__inner{
                color:#ffffff;
            }
        }
    }
</style>