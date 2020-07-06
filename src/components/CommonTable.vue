<template>
  <div class="common-table">
    <!-- 
      主要是对table列表、以及分页器的一个处理
      通过 Scoped slot 可以获取到 row, column, $index 
      $index 当前点击index
      row 当前行的每一列数据
      column 当前列的内容
     -->
    <el-table :data = "tabelData" height="90%" stripe v-loading = "config.loading">
      <!-- 序号列 -->
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page-1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 
        渲染重复列 
        show-overflow-tooltip:显示不全的情况下显示浮窗
        stripe：黑白变色每一行
        prop： 对应列内容的字段名
        label： 显示的标题
      -->
      <el-table-column show-overflow-tooltip stripe v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      layout 显示的内容，用逗号分隔，布局元素会依次显示  
      layout="prev, pager, next" 意思为：前一页 中间列表 后一页
      :current-page 当前页数
      @current-change 当前页改变时触发
    -->
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tabelData: Array,  //表格数据
    tableLabel: Array,
    config: Object
  },
  methods:{
    //进行编辑
    handleEdit(row){
      console.log(index,row,column)
      this.$emit('edit',row)
    },
    //删除
    handleDelete(row){
      this.$emit('del',row)
    },
    //改变当前页触发
    changePage(page){
      this.$emit('changePage',page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table{
  height: calc(100% - 40px);
  background: #fff;
  position: relative;
  .pager{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
}
</style>