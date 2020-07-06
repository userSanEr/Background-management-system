<template>
    <el-container style="height:100%">
        <!-- 
            在主页面存放所有的页面：侧边栏：管理的功能 头部：面包屑以及登录用户 tab：访问的标签列表
            主体：通过router-view 进行各页面切换
            tab、header、aside三者联系逻辑：
            aside点击跳转页面 并将当前跳转页面的路由信息存入currentMenu 在header中显示 存入tablist 在tab中进行使用
            header中显示state中的currentMenu的值
            tab中显示tablist中的标签 然后进行删除、点击 点击的时候也要通过commit进行存入 对currentMenu、main 
            通过currentMenu操作header 通过tablist操作tab

            main：
            



         -->
        <!-- 侧边栏 -->
        <el-aside width="auto">
            <CommonAside/>
        </el-aside>
        <!-- 右边主体 -->
        <el-container>
            <!-- 头部面包屑 -->
            <el-header> 
                <CommonHeader/>
            </el-header>
            <!-- tab标签 -->
            <CommonTab/>
            <!-- 页面主体 -->
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
//引入公用组件
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'
import CommonTab from '@/components/CommonTab.vue'
export default {
    components:{
        CommonHeader,
        CommonAside,
        CommonTab
    }
}
</script>

<style lang="scss" scoped>
    .el-header{
        background: black;
    }
    .el-main{
        padding-top:0; 
    }
</style>