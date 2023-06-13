<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="loading" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
      
    </div>
    
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改"/>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)"  title="删除"/>
            <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showAssignAuth(scope.row)" title="分配权限"/>
          </template>
      </el-table-column>
    </el-table>
    <!-- 添加按钮 -->
      <div class="tools-div">
        <el-button type="success" icon="el-icon-plus" size="mini" @click="add" :disabled="$hasBP('bnt.sysRole.add')  === false">添 加</el-button>
        <el-button class="btn-add" size="mini" @click="batchRemove()" >批量删除</el-button>
      </div>
    <!-- 分页组件 -->
    <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="fetchData"
    />
    
    <!-- 弹出层 用于添加角色-->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>




<script>
//引入定义接口js文件
import api from '@/api/system/sysRole'
import ItemVue from '../../../layout/components/Sidebar/Item.vue'

export default {
    //vue代码结构
    //初始值
    data(){
        return{
            //角色列表
            list:[],
            //当前页
            page:1,
            //每页显示记录数
            limit:3,
            //总记录数
            total:0,
            //条件对象
            searchObj:{},
            //是否弹窗
            dialogVisible:false,
            //弹窗添加角色值 封装
            sysRole:{},
            // 多个复选框值
            selections:[],
        }
    },
    created(){//渲染之前执行
        this.fetchData()
    },
    methods:{//操作方法
        //跳转到分配菜单页面
        showAssignAuth(row) {
          this.$router.push('/system/assignAuth?id='+row.id+'&roleName='+row.roleName);
        },
        //条件分页查询
        fetchData(current=1){
            this.page = current
            api.getPageList(this.page,this.limit,this.searchObj)
                .then(response=>{
                    this.list = response.data.records
                    this.total = response.data.total
                })
        },
        //删除by ID
        removeDataById(id){
           //提示确认删除？
           this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                 //删除请求
                // promise
                // 点击确定，远程调用ajax
                return api.removeById(id)
            }).then(response=> {
                //刷新页面
                this.fetchData()
                //删除成功
                this.$message.success(response.message || '删除成功')
            
            })
        },
        //添加角色 按钮响应方法
        add(){
          //让弹框弹出
          this.dialogVisible =true
        },
        //修改角色 按钮响应方法
        edit(val){
           //让弹框弹出
          this.dialogVisible =true
          //在弹框中赋值
          console.log(val);
          /*id: 8
            roleCode: "yhgly"
            roleName:  "用户管理员" */
          this.sysRole = {
                    id: val.id,
                    roleCode: val.roleCode,
                    roleName: val.roleName}
        },
        //添加、修改弹窗点击确定后执行的方法
        saveOrUpdate(){
          //判断弹窗是添加还是修改 更具id值有无  有为修改 没有id为添加
          if(!this.sysRole.id){
            this.save();
          }else{
            this.update();
          }
        },
        //添加
        save(){
            
          api.saveRole(this.sysRole).then(response => {
            this.$message.success(response.message||'操作成功')
            this.dialogVisible = false
            this.fetchData(this.page)
          })
        },
        //修改
        update(){
            // console.log("进入修改");
            api.updateRole(this.sysRole).then(response => {
              this.$message.success(response.message||'操作成功')
              this.dialogVisible = false
              this.fetchData(this.page)
            })
        },
        // 重置表单
        resetData() {
            console.log('重置查询表单')
            this.searchObj = {}
            this.fetchData()
        },
        //复选框 涉及批量删除
        //选择复选框，把复选框所在行内容传递
        handleSelectionChange(selection){
            this.selections = selection;
            //(3) [0:{…}, 1:{…}, 2:{…}, __ob__: Observer]
            console.log(this.selections);
        },
        //批量删除
        batchRemove(){
          //判断
          if(this.selections.length == 0){
            this.$message.warning('请选择要删除的记录！')
            return
          }
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            var ids = []
            this.selections.forEach(item => {
              var id = item.id
              ids.push(id)
            });
            api.batchRemove(ids)
          }).then((response) => {
            this.fetchData()
            this.$message.success(response.message)
          })
        },
        //ff
    }
}
</script>