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
                 <el-menu-item index="/newAdmin"><i class="el-icon-tickets"></i>新增管理员</el-menu-item>
                <el-menu-item index="/manageUser"><i class="el-icon-tickets"></i>用户信息管理</el-menu-item>
              

              </el-menu-item-group>
            </el-submenu>

            </el-menu>

        </el-aside>            
        <div  id="table">
        <el-table     
    style="width: 100%"
     :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    >
    
    <el-table-column
      label="活动名称"
      width="200">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tooltip effect="light" :content=scope.row.name placement="left-start">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
           </el-tooltip> 
          </div> 
      </template>
    </el-table-column>
   
      <el-table-column
      label="相关信息"
      width="100">
 
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tooltip effect="light" :content=scope.row.info placement="left-start">
            <el-tag size="medium">{{ scope.row.info }}</el-tag>
           </el-tooltip> 
          </div>
      </template>
       
    </el-table-column>
   
     <el-table-column
      label="所属单位"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.unit }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="开始时间"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.newstartTime }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="截止时间"
      width="180">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.newendTime }}</el-tag>
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
          @click="handleyulan(scope.$index,scope.row)">预览</el-button>
          <el-button
          size="mini"
          @click="handledownload(scope.$index,scope.row)">下载</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index,scope.row.activityId)">删除</el-button>
      </template>
    
    </el-table-column>
  
  </el-table>
    <el-dialog title="预览文件"  :visible.sync="dialogFormVisible">
     <div v-html=fileContent></div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  <div class="block">
 
  <el-pagination
    layout="prev, pager, next"
    @current-change="current_change"
    :page-size="pagesize"  
    :total=total>
  </el-pagination>
</div>
  </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {

  data(){
    return{
        tableData: [],
        find:"",
        pagesize:8,//每页的数据条数
        currentPage:1,//默认开始页面
        total:100,
        dialogFormVisible :false,
        fileContent:{},
        flag : 0
    }
  },
  mounted(){
  this.select()
  },
  methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
    convertUTCTimeToLocalTime(UTCDateString) {
        if(!UTCDateString){
          return '-';
        }
        function formatFunc(str) {    //格式化显示
          return str > 9 ? str : '0' + str
        }
        var date2 = new Date(UTCDateString);     //这步是关键
        var year = date2.getFullYear();
        var mon = formatFunc(date2.getMonth() + 1);
        var day = formatFunc(date2.getDate());
        var hour = date2.getHours();
        var noon = hour >= 12 ? '下午' : '上午';
        hour = hour>=12?hour-12:hour;
        hour = formatFunc(hour);
        var min = formatFunc(date2.getMinutes());
        var dateStr = year+'-'+mon+'-'+day+' '+noon +' '+hour+':'+min;
        return dateStr;
},
      select(){
     var that = this;
    this.$axios.get('/allActivity', {

     })
     .then(function (response){
       console.log(response);
      if (response.data.resultCode === 200) {
        that.tableData = response.data.data
       console.log(response.data.data.length)
       that.total = response.data.data.length
       for(let i of that.tableData){
       i.newstartTime = that.convertUTCTimeToLocalTime(i.startTime);
       i.newendTime = that.convertUTCTimeToLocalTime(i.endTime);
       }
       console.log(that.tableData)
      }
     })
   },
   handleyulan(index, row){
          var that = this
      this.$axios.get(`/excel/activity/export/${row.activityId}`, {
  })
  .then(function (response) {
    console.log(response.data.resultCode)
      if (response.data.resultCode !== 500) {


            that.dialogFormVisible = true; 
            that.$axios.get(`/excel/activity/export/${row.activityId}`,{  
                responseType: 'blob'
            })
            .then((response) => {
                console.log(response)
                var reader = new FileReader();  
                reader.onload = e => {  
                    //预处理  
                    var binary = '';  
                    var buf = new Uint8Array(e.target.result);  
                    var length = buf.byteLength;  
                    for (var i = 0; i < length; i++) {  
                    binary += String.fromCharCode(buf[i]);  
                    }  //读取excel  
                    const wb = XLSX.read(binary, {type: "binary"});  
                    console.log("wb",wb);  
                    //抓取第一个sheet
                    let wsname = wb.SheetNames[0];  
                    let ws = wb.Sheets[wsname];
                    
                    // 用来赋值 this.fileContent = XLSX.utils.sheet_to_html(ws);
                    that.fileContent = XLSX.utils.sheet_to_html(ws);
                };
                reader.readAsArrayBuffer(response.data);  
            }) 
            .catch(error => {  
                console.log(error);  
            });
        return that.fileContent; 

      }else{
         that.$message({
                message: '该活动下的项目还没有让全部专家评分！',
                type: 'error',
                duration: 2000
              })   
      }
 })
   },
   handledownload(index, row){
      var that = this
      this.$axios.get(`/excel/activity/export/${row.activityId}`, {
  })
  .then(function (response) {
    console.log(response.data.resultCode)
      if (response.data.resultCode === 500) {
                that.$message({
                message: '该活动下的项目还没有让全部专家评分！',
                type: 'error',
                duration: 2000
              })   
        } else {
  window.open(`http://140.143.194.109:8080/jwc/excel/activity/export/${row.activityId}`)  
        }
  })
   },
       handleEdit(index, row) {
         console.log(row)
         this.$router.push({
          path: '/updateActivity',
          query: { ruleForm:row }
         })
      },
      handleDelete(index, row) {
        var that = this
        this.$axios({
          method:"DELETE",
          url:"/activity/"+row,
        })
        .then(function (response){
          if (response.data.resultCode === 200) {
        that.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
         that.$axios.get('/activity', {
     })
     .then(function (response){
       console.log(response);
      if (response.data.resultCode === 200) {
        that.tableData = response.data.data
       for(let i of that.tableData){
       i.newstartTime = that.convertUTCTimeToLocalTime(i.startTime);
       i.newendTime = that.convertUTCTimeToLocalTime(i.endTime);
       }
       console.log(that.tableData)
      
      }
     })
           }else{
          that.$message({
            message: '删除失败！可能是网络问题',
            type: 'error',
            duration: 2000
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
         that.$router.push('/')
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
 margin-right:40%; 
 margin-top:1rem; 
}
#box{
  display: flex;
}
#find{
  display:inline;
  width: 70%;
  margin: 1rem 0 0 5rem;
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
