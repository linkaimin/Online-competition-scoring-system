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
          
          <div id="box">
               
      <el-select id="sell" v-model="activity" placeholder="活动名称" >
    <el-option
    
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.activityId"
     
     >
    </el-option>
  </el-select> 
  <el-select id="sell" v-model="project" placeholder="项目名称" @focus="selectPro">  
   <el-option
    
      v-for="item in newOptions"
      :key="item.value"
      :label="item.name"
      :value="item.projectId"
       
     >
    </el-option>
    </el-select> 
<el-button id="findBtn"  type="primary" plain @click="show">确定</el-button>  

   </div>

        <el-table     
    :data=tableData
    style="width: 100%">
    <el-table-column
      label="评分用户名"
      width="150">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userName }}</el-tag>
          </div> 
      </template>
    </el-table-column>
    <el-table-column
      label="评分用户账号"
      width="150">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="分数"
      width="100">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.sum }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="统计方式"
      width="450">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.type }}</el-tag>
          </div>
      </template>
      
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">下载评分表</el-button>
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
  <h2 id="lastScore" v-show=tag>最终得分：{{score}}</h2><h2 id="lastScore" v-show=!tag>（有评委未评分时无法展示最终结果）</h2>
  <el-button id="lastScore" v-show=tag @click="yulan">预览总评结果</el-button>
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
       tableData:[],
       find:"",
       activityId:"",
       activity:"",
       options:[],
       newOptions:[],
       project:'',
       score:0,
       projectId:'',
       tag:false,
       dialogFormVisible:false,
       fileContent:""
    }
  },
    mounted(){
    this.select()
  },
  methods: {
        yulan(){
          var that = this;
          that.dialogFormVisible = true;
            var vm = this;
            this.$axios.get(`/excel/preview/${that.project}`,{  
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
                    this.fileContent = XLSX.utils.sheet_to_html(ws);
                };
                reader.readAsArrayBuffer(response.data);  
            }) 
            .catch(error => {  
                console.log(error);  
            });
        return that.fileContent;  
        },
        handleEdit(index,row){
          window.open(`http://140.143.194.109:8080/jwc/excel/project/export/`+row.projectId+'/'+row.userId)
        },
        show(){
          this.score = '';
          console.log(this.activity)
          var that = this;
          if(that.project === ''){
            that.$message({
            message: '未选择需要查询的值！',
            type: 'error',
            duration: 2000
          })
          return;
          }
       that.$axios({
         url:'/scoreList',
         method:'post',
         data:{"projectId" :that.project}
     }).then(function (response){
       if (response.data.resultCode === 200) {
         that.tableData = response.data.data;
         let sum = 0;
         
         for(let i of that.tableData){
           for(let j of i.score){
            sum += Number(j.value);
            if(i.type =='1'){
              i.type = '所有专家总分取平均分'
            }else if(i.type =='2'){
 i.type = '所有专家每一项打分先取平均分，然后取和'
            }else if(i.type =='3'){
 i.type = '所有专家每一项打分去掉一对最高分和最低分后每一项平均分，然后取和'
            }else if(i.type =='4'){
 i.type = '所有专家总分去掉一对最高分和对低分后取平均分'
            }
            
         }
           i.sum = sum;
           sum = 0;
         }
      console.log(that.tableData)
      }
      if(1){
          that.$axios({
          method:'post',
          url:"/scoreOver",
          data:{
            projectId:that.project,
          }
        }).then(function (response){
           if (response.data.resultCode === 200) {
            that.tag = response.data.data;
        }
        })
        console.log(that.tag)
      }
      let temp = 0;
      if(that.tableData[0].type === 1){
        for(let i of that.tableData){
           temp += i.sum;
           that.score = (temp/that.tableData.length).toFixed(2);
        }
        that.$axios({
          method:'put',
          url:"/project",
          data:{
            projectId:that.project,
            score:that.score
          }
        }).then(function (response){
           if (response.data.resultCode === 200) {
          console.log(that.score)
        }
        })
      }
       if(that.tableData[0].type === 2){
        for(let i of that.tableData){
           temp += i.sum;
           that.score = temp.toFixed(2);
        }
           that.$axios({
          method:'put',
          url:"/project",
          data:{
            projectId:that.project,
            score:that.score
          }
        }).then(function (response){
           if (response.data.resultCode === 200) {
          console.log(that.score)
        }
        })
      }

       if(that.tableData[0].type === 3){
        that.$axios({
          method:'post',
          url:"/calculate",
          data:{
            projectId:that.project
          }
        }).then(function (response){
           if (response.data.resultCode === 200) {
          that.score = response.data.data;
          console.log(that.score)
        }
        })
      }

       if(that.tableData[0].type === 4){
           let max = 0;
           let array = [];
        for(let i of that.tableData){
          array.push(i.sum)
        }
        for(let j of array){
           max += j; 
        }
        
        max = max - Math.max(...array) - Math.min(...array)
        console.log(max)
        that.score = (max/(array.length-2)).toFixed(2);
          that.$axios({
          method:'put',
          url:"/project",
          data:{
            projectId:that.project,
            score:that.score
          }
        }).then(function (response){
           if (response.data.resultCode === 200) {
          console.log(that.score)
        }
        })
      }
 
     })       
        },
      
 selectPro(){
      console.log(this.project)
      var that = this; 
      that.project = '';
      if(that.newOptions != []){
       that.$axios({
       data:{"activityId" : that.activity},
       method:"post",
       url:'/pro'
       }).then(function (response){
       that.newOptions = response.data.data;
       console.log(that.newOptions)
 
       })
      }
    },
        select(){
        var that = this;
        this.$axios.get('/activity', {
     })
     .then(function (response){
       console.log(response);
        console.log(that.options)
      if (response.data.resultCode === 200) {
         that.options = response.data.data;
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
#lastScore{
  margin: 1rem;
}
#sell{
   margin: 1rem  0 1rem 1rem;
   width: 250px;
}
#findBtn{
 height: 50%;
 margin-right:40%;
 margin-left:1rem;
 margin-top:1rem; 
}
#box{
  display: flex;
}
#find{
  display:inline;
  width: 70%;
  margin: 1rem;
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
