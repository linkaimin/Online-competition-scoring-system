<template>
  <div>

    <el-container class="con">
      <el-header class="header" height="80px">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"><img src="../assets/headLogo.png" class="header-logo"/> </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light text-right">
           <span ><i class="el-icon-share i_rd"></i><span @click="exit">安全退出</span></span>
          </div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px" class="aside">
     <div class="mean-top"><i class="el-icon-menu"></i> 功能导航</div>
          <el-menu  router :default-active="$route.path"
                    background-color="#dbe9f1"
                    active-text-color="#6ec673" id="menu"
                    >
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-location"></i>评估结果统计</template>
              <el-menu-item-group >
                <el-menu-item index="/show"><i class="el-icon-tickets"></i>评估结果展示</el-menu-item>
              
              
              </el-menu-item-group>
            </el-submenu>
           
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-location"></i>项目管理</template>
              <el-menu-item-group>
                <el-menu-item index="/newActivity"> <i class="el-icon-tickets"></i>新增活动</el-menu-item>
                <el-menu-item index="/manage"> <i class="el-icon-tickets"></i>活动管理</el-menu-item>
                <el-menu-item index="/addActivity"> <i class="el-icon-tickets"></i>活动项目添加</el-menu-item>
                <el-menu-item index="/manageActivity"> <i class="el-icon-tickets"></i>活动项目管理</el-menu-item>
               
               

              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-location"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item index="/newUser"><i class="el-icon-tickets"></i>新增用户</el-menu-item>
                <el-menu-item index="/manageUser"><i class="el-icon-tickets"></i>用户信息管理</el-menu-item>
              

              </el-menu-item-group>
            </el-submenu>

            </el-menu>

        </el-aside>            
        <div  id="table">
          <div id="box1">   
  <el-select id = "find1" v-model="activity" placeholder="请选择">
    <el-option
      
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.activityId"
     >
    </el-option>
  </el-select>
<el-button id="findBtn"  type="primary" plain @click="select">确定</el-button>  
   </div>
        <el-table     
    :data=tableData
    style="width: 100%">
    <el-table-column
      label="活动编号"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.activityId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="项目名称"
      width="250">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div> 
      </template>
    </el-table-column>
    <el-table-column
      label="负责人"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.leader }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="所属单位"
      width="230">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.unit }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="handledocument(scope.$index,scope.row)">查看文件</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

      </el-container>
    </el-container>
        <el-dialog title="查看文件" :visible.sync="dialogFormVisible">

        <label id="checkbox" v-for="item in file" :key = item.index>
        <a :href=item>{{item}}</a><br>
        </label>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {

  data(){
    return{
       tableData:[],
       find:"",
       activityId:"",
       file:[],
       dialogFormVisible: false,
       options:[],
       activity:''
    }
  },
   mounted(){
    this.select1()
  },
  methods: {
          select1(){
        var that = this;
        this.$axios.get('/activity', {
     })
     .then(function (response){
       console.log(response);
        console.log(that.options)
      if (response.data.resultCode === 200) {
         that.options = response.data.data;
       console.log(that.options)
      }
     })
      },
      handledocument(index, row){
        this.dialogFormVisible = true
        var that = this
       this.$axios.get('/document/preview/'+row.projectId, {
  
     }).then(function (response){
      if (response.data.resultCode === 200) {
          that.file = response.data.data.file
          console.log(response.data.data)
      }
     })
      },
      select(){
     var that = this;
     that.activityId = this.activity
        that.$axios({
       url:"/pro",
       method:"post",
        data:{
        "activityId" : that.activityId
      },

  })
  .then(function (response) {
    console.log(response.data);
     console.log(response.data.data);
    that.tableData = response.data.data;
      })
   },
       handleEdit(index, row) {
         console.log(row)
         this.$router.push({
          path: '/update',
          query: { ruleForm:row }
         })
      },
      handleDelete(index, row) {
        var that = this
        this.$axios({
          data:{
        "projectId" : row.projectId,
        "activityId" : row.activityId
      },
          method:"delete",
          url:"/project",
        })
        .then(function (response){
          if (response.data.resultCode === 200) {
        that.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        that.$axios({
       url:"/pro",
       method:"post",
        data:{
        "activityId" : that.activityId
      }
  })
  .then(function (response) {
    console.log(response.data.data);
    that.tableData = response.data.data
      })
          }
        })
      },
 exit: function () {
      var that = this;
             this.$axios.get('/logout', {

  })
  .then(function (response) {
    console.log(response);
      if (response.data.resultCode === 200) {
        sessionStorage.clear()
        that.$message({
            message: '退出成功',
            type: 'success',
            duration: 2000
          })
          that.$router.push('/')
       
        } else {
          that.$message({
            message: '退出失败，可能是网络故障',
            type: 'error',
            duration: 2000
          })
        }
  })
  .catch(function (error) {
    console.log(error);
  });
    } 
   
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

  }

</script>

<style>
*{
  margin: 0; padding: 0;
}
#findBtn{
 height: 50%;
 margin-right:2rem; 
 margin-top:1rem; 
}
#box{
  
}
#find1{
   margin: 1rem  0 1rem 1rem;
   width: 300px;
}
#table{
 width: 100%;
}
a{
  text-decoration:none; 
  color:rgb(21, 46, 112);
}
.con{
  width: 100%;
  height: 100%;
  position: absolute;
}

.test{
  width: 500px;
  height: 500px;
  background-color: red;
}
.header{
  width: 100%;


  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  background-color:#0d3349 ;
}
  .header-logo{
    margin-top: 8px;
    height: 64px;
  }
  .text-right{
    text-align: right;
    line-height: 80px;
  }
  .text-right span{
    margin-right: 10px;
  }
  .text-right span i{
    margin-right: 5px;
  }

  .aside{
    background-color: rgba(219, 233, 241, 0.45);
  }
  .el-submenu{
    border-bottom: 1px solid #bbe0f6;

  }
  .mean-top{
    width: 100%;
    height: 41px;
    line-height: 41px;
    text-indent: 5px;
  }
  .main{
    background-color: #eeeeee;
    width: 100%;
    padding: 0px;
  }
  .main-tab{
    width: 100%;
    line-height: 40px;
    border-bottom: 2px solid #0d3349;
    height: 40px;
  }

</style>
