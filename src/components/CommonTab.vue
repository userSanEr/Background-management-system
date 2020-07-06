<template>
  <div class="tags">
    <!-- 
      主要是对跳转的标签列表在header中显示 
      点击可关闭 点击跳转的时候逻辑操作
     -->
    <!-- 标签 :closable 标签是否可关闭  disable-transitions：是否禁用渐变动画  effect：标签主题-->
    <el-tag
      :key="index"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
      :effect="$route.name===tag.name?'dark':'light'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  data() {
    return {
     
    };
  },
  components: {},
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,  //获取tablist
    }),
  },
  methods: {
    //关闭
    handleClose(tag) {
      this.close(tag);
    },
    // vuex
    ...mapMutations({
      close: "closeTab",
      clickfn: "selectMenu"
    }),
    //点击跳转路由
    changeMenu(tag){
      this.$router.push({name:tag.name})  //点击每个标签时进行跳转
      this.clickfn(tag)  //防止再次向tablist中添加该页面
    }
  },
};
</script>

<style scoped lang="scss">
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
