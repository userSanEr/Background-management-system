<template>
  <div>
    <!-- 
      对表格进行封装
      1、label、value、type
      2、form表单接收 
        ref from的dom结构对校验进行重置、判断当前验证是否通过
        model 表单数据对象
        rules 表单校验规则
      3、date的格式必须加上value-format="yyyy-MM-dd" 否则格式会不正确
      4、如果传入的数据带有input类型则不可以使用默认的类型
     -->
  <el-form inline :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label" :prop="item.model ? item.model : ''">
      <el-input v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="!item.type">
      </el-input>
      <el-select v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="item.type === 'select'">
          <el-option v-for="item in item.opts" :key="item.value" :value="item.value" :label="item.label" ></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="item.type === 'switch'"></el-switch>
      <el-date-picker v-model="form[item.model]" format="yyyy - MM - dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间" v-if="item.type === 'date'"></el-date-picker>
    </el-form-item>
    <!-- 可以传入任何一种input框 为有动态插入值的表单做准备 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  props:{
    inline: Boolean,  //是否为行标签
    form: Object,  //表格的v-model对应的值
    formLabel: Array,  //
    rules: Object  //校验规则
  },
}
</script>

<style>

</style>