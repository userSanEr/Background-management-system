<template>
  <div style="height:100%" ref="echart">
    <!-- 存放echarts的容器 -->
    <!-- 
        封装echarts组件 
        echart组件所涉及的范围十分广泛 在这里只考虑折线图、柱状图、饼图 但是考虑还是有一定的局限性
        1、首先考虑echart使用 主要设置xData、series两个即可
        2、父组件传值：- 传入值判断是否需要坐标轴 - 传入横轴坐标轴数据、以及图表类型及数据
        3、计算属性：- 根据当前父组件是否需要坐标轴对图表进行渲染
                    - 获取当前侧边栏的状态
                    
        4、监听属性：- 根据是否收缩侧边栏对图表进行重新绘制
                    - 当父组件传入的数据改变时，对图表配置项进行重新渲染

        5、分为两种图表配置项  
        图例：legend  图表位置：grid  悬浮条：tooltip 横轴设置：xAxis 纵轴设置：yAxis 颜色：color 图表系列：series
            - 有坐标轴
            - 无坐标轴

        6、初始化：echart.init(dom结构)
        7、渲染：this.echart.setOption(配置项)
        8、自动响应式重新渲染：echart.resize()
    -->
  </div>
</template>

<script>
// 引入echart图
import echart from 'echarts'
export default {
    //父传子
    props:{
        chartData: {  //图表数据
            type:Object,  
            default() {  //没有任何值的时候默认的值
                return {
                    xData: [],  //坐标轴配置
                    series: []  //系列列表。每个系列通过 type 决定自己的图表类型
                }
            }
        },
        isAxisChart: {  //是否需要坐标轴
            type: Boolean,
            default: true
        }
    },
    computed: {
        options(){
            return this.isAxisChart ? this.axisOption : this.normalOption //判断父组件传过来的图表类型
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse  //获取当前侧边栏的状态
        }
    },
    watch: {
        chartData: {  //当chartData改变时触发的函数
            deep:true,
            handler: function(){
                this.initChart()
            }
        },
        isCollapse(){
            setTimeout(() => {
                this.resizeChart();  //当收缩或者放开时对图表进行处理
            }, 300);
        }
    },
    data(){
        return {
            echart: null,
            axisOption: {
                legend: {  //图例
                    textStyle: {  //文字样式
                        color: '#333'
                    }
                },
                grid: {  //图表位置
                    left: '20%'  //左边20%
                },
                tooltip: {  
                    trigger: 'axis'
                },
                xAxis:  //横轴设置
                    {
                        type: 'category',  //类目
                        data: [],  //存放数据
                        axisLine: {  //线条颜色
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        },
                        axisLabel: {  //文字颜色
                            color: '#333'
                        }
                    }
                ,
                yAxis: [  //y轴
                    {
                        type: 'value',  //数量
                        axisLine: {
                            lineStyle: {  //线条颜色
                                color: '#17b3a3'
                            }
                        }
                    }
                ],
                color: [  //每一个种类的颜色  依次循环取出其中的颜色
                '#2ec7c9',
                '#b6a2de',
                '#5ab1ef',
                '#ffb980',
                '#d87a80',
                '#8d98b3',
                '#e5cf0d',
                '#97b552',
                '#95706d',
                '#dc69aa',
                '#07a2a4',
                '#9a7fd1',
                '#588dd5',
                '#f5994e',
                '#c05050',
                '#59678c',
                '#c9ab00',
                '#7eb00a',
                '#6f5553',
                '#c14089'
                ],
                series: []  //数据
            },
            normalOption: {  //没有x，y轴
                series: [],  //数据
                tooltip: {  //浮动条 在每个区域上方出现
                    trigger: 'item'  
                },  
                color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
            }
        }
    },
    methods: {
        //初始化图表
        initChart(){
            this.initChartData();  
            if(this.echart){  //如果有echart
                this.echart.setOption(this.options)  //则直接使用刚指定的配置项和数据显示图表。
            }else{
                this.echart = echart.init(this.$refs.echart)  //图表对象的初始化
                this.echart.setOption(this.options)  //使用刚指定的配置项和数据显示图表。
            }
        },
        //初始化数据
        initChartData() {  
            if (this.isAxisChart) {  //如果有x，y轴
                this.axisOption.xAxis.data = this.chartData.xData  //x轴数据
                this.axisOption.series = this.chartData.series  //series数据
            } else {  //如果没有
                this.normalOption.series = this.chartData.series  //series数据
            }
        },
        resizeChart(){
            this.echart ? this.echart.resize() : ''  //当尺寸改变时触发resize 重绘尺寸
        },

    },
    mounted(){
        window.addEventListener('resize',this.resizeChart);  //当刚开始的时候监听
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeChart);  //当组件销毁前移除监听
    }
}
</script>

<style>

</style>