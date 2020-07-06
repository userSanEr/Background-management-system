<template>
  <div class="login_container">
      <!-- 
          登录页：涉及的思路
          在进行登录时，将用户名以及密码传给后台
          由后台通过对登录的用户角色进行判断然后返回给我们唯一标志token以及用户的角色

          在返回数据之后
          1、删除之前的路由信息
          2、将返回的路由信息存入state中
          3、将返回的唯一标志存入state中
          4、将返回的路由信息添加到路由对象中
          5、跳转首页

          在路由导航前置守卫添加判断
          1、判断当前用户状态
          2、从cookie中获取token
          3、有token则已登录跳转页面
          4、如果没有token且不在登录页则跳转登录页

          在退出登录时进行操作
          1、清空cookie中的token、menu
          2、刷新页面
       -->
    <div class="login_box">
        <!-- 头像区 -->
        <div class="avatar_box">
            <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 登录表单区 --> 
        <el-form :model="form"  label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item>
                 <el-input  prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
            </el-form-item>
             <!-- 密码 -->
            <el-form-item>
                 <el-input  prefix-icon="el-icon-s-goods" v-model="form.password" type="password"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //这是登录表单的数据
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login:function(){
            this.$http.post('api/permission/getMenu',this.form).then(res =>{
                res = res.data
                if(res.code === 20000){
                    this.$store.commit('clearMenu')  //清空之前的路由信息  防止路由重复添加
                    this.$store.commit('setMenu',res.data.menu)  //将返回的角色对应路由存入state
                    this.$store.commit('setToken',res.data.token)  //将返回的token存入cookie
                    this.$store.commit('addMenu',this.$router)  //将返回的角色对应路由添加到路由上
                    this.$router.push({name: 'home'})  //跳转主页
                }else{
                    this.$message.warning(res.data.message)
                }
            })
        }
    }
}
</script>

<style scoped>
    .login_container{
        background: #2b4b6b;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background: #fff;
        border-radius: 3px;
        position: relative;
    }
    .avatar_box{
        height:130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        background: #fff;
    }
    .avatar_box img{
        height:100%;
        width: 100%;
        border-radius: 50%;
        background: #eee;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>