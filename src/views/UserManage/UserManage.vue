<template>
  <div class="manage">
    <!-- 
      1、如何实现添加与编辑使用同一个dialog 将title使用动态值传入 然后判断这个值时add还是edit就可以实现
      2、:visible.sync sync用来实现父组件可以监听子组件的改变
      3、:before-close 关闭dialog时做的事情
      4、form组件主要配合dialog实现新增、添加用户
     -->
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="dialogVisible" :before-close="handleClose">
      <!-- 使用form组件  operateFrom 代表绑定的每个值 operateFromLabel包含model、label、type、option -->
      <CommonForm :formLabel="operateFromLabel" :form="operateFrom" ref="parent" :rules="operateRules"></CommonForm>
      <span slot="footer" class="dialog-footer">
          <el-button @click="clear">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
     <div class="manage-header">
       <el-button type="primary" @click="addUser">新增</el-button>
       <common-form inline :formLabel="formLabel" :form="searchFrom">
         <el-button type="primary" @click="searchUser">搜索</el-button>
       </common-form>
     </div>
     <!-- 
       tab组件 
       主要就是将分页器的设置、以及列表数据、label传入子组件
      --> 
      <common-table :tabelData="tabelData" :tableLabel="tableLabel" :config="config" @changePage="getList" @edit = "editUser" @del = "delUser"></common-table>
  </div>
</template>

<script>
import CommonTable from '../../components/CommonTable'
import CommonForm from '../../components/CommonForm'
export default {
  components:{
    CommonTable,
    CommonForm
  },
  data(){
    return {
      dialogVisible: false,  //是否显示编辑框
      operateType: 'add',  //当前dialog的状态
      formLabel: [  //搜索框的相对应配置
        {
          model: 'keyword',
          label: '',
          options: ''
        }
      ],
      searchFrom: {  //model值
        keyword: ''
      },
      tabelData: [],  //列表数据
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {  //分页器配置
        page: 1,  //当前页
        total: 30,  //总页数
        loading: false  //是否显示loading框
      },
      operateFrom: {  //dialog表单model值
        name:'',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFromLabel:[  //dialog对应的model、label、type、rule、option
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts:[
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
        }
      ],
      operateRules:{  //校验规则
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //搜索数据
    searchUser(){
      this.config.loading = true;  //显示loading框
      this.$http
        .get("/api/user/search", {
          params: {
            name: this.searchFrom.keyword,
          },
        })
        .then((res) => {
          res = res.data;
          if(res.code !== 20000){
            this.config.loading = false;  //如果请求失败 显示所有数据
            this.getList();
          }else{
            this.tabelData = []  //将返回的数据清空
            res.list.sexLabel = res.list.sex === 0 ? "女" : "男";  //设置0/1的值为女或男
            this.tabelData.push(res.list)  //将获取的列表存入tabelData
            this.config.loading = false;  //loading框取消
            this.config.total = 1;  //当前页为1
          }
        });
    },
    //获取表格数据
    getList() {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
          },
        })
        .then((res) => {
          // 处理性别问题
          this.tabelData = []
          this.tabelData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    //改变当前页面
    changePage(val){
      console.log(val)
    },
    //修改数据
    editUser(row){
      this.operateType = 'edit'
      this.dialogVisible = true
      this.operateFrom = JSON.parse(JSON.stringify(row))
    },
    //添加数据
    addUser(){
      this.operateType = 'add'  //当前为添加数据
      this.dialogVisible = true  //当前状态框为显示状
      for(let key in this.operateFrom){
        this.operateFrom[key] = ''  //将数据都清空否则会显示编辑框数据
      }
    },
    //对数据进行确认
    confirm(){
      //valid 值为true/false 判断当前验证是否通过
      this.$refs.parent.$refs.form.validate((valid) => {
          if (valid) {
            if(this.operateType === 'edit'){
              //对数据进行修改
              this.$http.post('/api/user/edit',this.operateFrom).then(res =>{
              this.$message({
                  type: "success",
                  message: "编辑成功",
              });
              this.getList()
              this.dialogVisible = false
              })
            }else if(this.operateType === 'add'){
              //对数据进行添加
              this.$http.post('/api/user/add',this.operateFrom).then(res =>{
              this.$message({
                  type: "success",
                  message: "添加成功",
              }); 
                this.getList()
                this.dialogVisible = false
              })
              for(let key in this.operateFrom){
                this.operateFrom[key] = ''
              }
            }
          } else {
            return false;
          }
        })
    },
    //点击取消按钮
    clear(){
       this.$refs.parent.$refs.form.resetFields();  //取消错误提示
       this.dialogVisible = false;
    },
    //在dialog组件关闭时触发的函数
    handleClose(){
       this.$refs.parent.$refs.form.resetFields();
       this.dialogVisible = false;
    },
    //删除数据
    delUser(row){
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id,
              },
            })
            .then(res => {  //成功则为删除成功
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getList()
            });
        })
        .catch(() => {  //否则取消删除
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
  //获取数据列表
  created(){
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss'
</style>