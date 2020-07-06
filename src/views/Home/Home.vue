<template>
  <el-row class="home" :gutter = "20">
    <!-- 
      该页面主要对页面的主页部分进行布局
      分为：用户信息 消费列表 表格 3个echart图
      主要是对每个图表部分进行传值 以及类型设置 主要包含 坐标轴、series、是否需要坐标轴三个传值
     -->
      <el-col :span="8">
        <!-- 左上部分 个人信息展示 -->
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg"/>
            <div class="userInfo">
              <div class="name">Saner</div>
              <div class="access">超级管理员</div>
            </div>
          </div>
          <div class="loginInfo">
            <p>上次登陆时间：<span>2019-10-20</span></p>
            <p>上次登录地点: <span>北京</span> </p>
          </div>
        </el-card>
        <!-- 左下部分 tab组件 -->
        <el-card shadow="hover" style="height:522px;margin-top:20px;">
          <!-- 表格组件 -->
          <el-table :data="tableData">
            <el-table-column show-overflow-tooltip v-for="(val,key) in tabelLabel" :key="key" :prop="key" :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <!-- 6个卡片 -->
          <el-card shadow="hover" v-for = "item in countData" :key = "item.name" :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card shadow="hover">
          <div style="height:280px;">
            <Echart :chartData="echartData.order"/>
          </div>
        </el-card>
        <!-- 图表 -->
        <div class="graph">
          <!-- 柱状图 -->
          <el-card shadow="hover">
            <div  style="height:260px;">
              <Echart :chartData="echartData.user"/>
            </div>
          </el-card>
          <!-- 饼图 -->
          <el-card shadow="hover">
            <div style="height:260px;">
             <Echart :chartData="echartData.video" :isAxisChart="false"/>
            </div>
          </el-card>
        </div>
      </el-col>
  </el-row>
</template>

<script>
import Echart from '@/components/Echarts.vue'
export default {
  components:{
    Echart
  },
  data(){
    return {
      userImg:require('../../assets/images/user.png'),  //引入个人信息部分头像
      countData:[  //浮动的6个卡片
        {
          name: '今日支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: '210',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: '1267',
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: '1290',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: '210',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: '1234',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      tableData:[],  //每个列表的数据
      tabelLabel: {  //每个列表的名称
        name:'课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData: {  //图标数据及传值
        order: {
          xData:[],
          series: []
        },
        user: {
          xData:[],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  created(){
    this.getTableData();
  },
  methods:{
    getTableData(){
      this.$http.get('/home/getData').then(
      res =>{
        res = res.data;
        this.tableData = res.data.tableData  //表格数据
        //订单折线图
        const order = res.data.orderData  //订单折线图数据
        this.echartData.order.xData = order.date  //设置x轴的数据
        //第一步去除series中的name部分-键名
        let keyArray = Object.keys(order.data[0])  //获取所有的名称
        keyArray.forEach(key =>{
          this.echartData.order.series.push({  
            name:key === 'wechat'? '小程序' : key,  //name
            data:order.data.map(item =>item[key]),  //每一个key对应的一组数值
            type:'line'  //图表类型
          })
        })
        // 用户柱状图
        this.echartData.user.xData = res.data.userData.map(
          (item) => item.date  //横轴数据
        );
        this.echartData.user.series.push({
          name: "新增用户",  //该条名称
          data: res.data.userData.map((item) => item.new),  //数据
          type: "bar",  //图表类型
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map((item) => item.active),
          type: "bar",
          barGap: 0,  //两者之间的距离 在最后一个图表设置
        });
        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,  //数据
          type: "pie",  //饼图
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="scss" scoped> 
@import '~@/assets/scss/home'
</style>