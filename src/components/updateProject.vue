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
                   <el-card id="card" class="box-card">
              <div slot="header" class="clearfix">
                <span>修改项目</span> 
              </div>
              <div class="item">
              项目名称：<el-input v-model="name" placeholder="请输入内容"></el-input>
               </div><div class="item">
               负责人：<el-input v-model="leader" placeholder="请输入内容"></el-input>
              </div><div class="item">
               所属单位：<el-input v-model="unit" placeholder="请输入内容"></el-input>
              </div>
              <div class="item">
               活动编号：<el-input v-model="activityId" placeholder="请输入内容"></el-input>
              </div>
              <div class="item">
               相关信息：<el-input v-model="info" placeholder="请输入内容"></el-input>
              </div>
                <div class="item">
               超链接：<el-input v-model="docUrl" placeholder="请输入内容"></el-input>
              </div>
          <template class="item">
    <el-upload
     class="upload-demo"
      ref="upload"
      action="#"
      :auto-upload="false"
      :limit = num
      >
      <el-button slot="trigger" size="small" type="primary" icon="el-icon-document">选取文件</el-button>
     
      <div slot="tip" class="el-upload__tip">只能上传<b>一个压缩包(.zip格式)</b>文件</div>
    </el-upload>
</template>

              <div id='btn'>
               <el-button v-loading.fullscreen.lock="fullscreenLoading" id="button" @click="up"  type="primary" plain>确定</el-button>
               </div>
            </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
data(){
  return{
    name:"",
    leader:"",
    unit:"",
    info:"",
    activity:"",
    fileList: [],
    url:"",
    options:[],
    projectUrl:'',
    upData:{},
    activityId:"",
    fullscreenLoading: false,
    num:1,
    docUrl:""
  }
},
mounted(){
    this.text()
},
methods: {
  text(){
    var data = this.$route.query.ruleForm;
    this.name = data.name;
    this.leader = data.leader;
    this.unit = data.unit;
    this.info = data.info;
    this.activityId = data.activityId;
    this.projectId = data.projectId
    this.docUrl = data.docUrl
    this.url ="http://39.97.112.80:8080/jwc/document/upload/"+this.projectId;
  },
  handleRemove(file, fileList) {
    console.log(file, fileList);
  },
  handlePreview(file) {
    console.log(file);
  },
  up: function () {
    var that = this;
    if(that.activityId!='' &&that.unit!=''&&that.leader!=''&&that.name!=''){

      let file

      console.log(that.$refs.upload.uploadFiles[0])
      if(that.$refs.upload.uploadFiles[0] == undefined){
        file = []
      } else {
        file = that.$refs.upload.uploadFiles[0].raw;
      }

      // 有文件
      if (that.$refs.upload.uploadFiles[0] != undefined) {
          console.log("有文件")
          console.log("文件名 ：" + file.name)
          var fileName = file.name
          var suffix1 = '';
          var suffix = '';
          
          try {
              var flieArr = fileName.split('.');
              suffix1 = flieArr[flieArr.length - 1];
              suffix = suffix1.toLowerCase();
              console.log("文件后缀名 ：" + suffix)
          } catch (err) {
            suffix = '';
            console.log("error : 获取文件后缀名出现异常 ：" + suffix + " , err = " + err)
          }

          var result = '';
          // 只能上传一个文件或者一个zip压缩包
          var flist = ['zip','png', 'jpg', 'jpeg', 'bmp', 'gif', 'tif', 'pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','wmf','webp', 'doc','docx','ppt','pptx','xlsx','xls','pdf','mp4'];
          result = flist.some(function (item) {
            return item == suffix;
          });

          console.log(result)
          
          // 文件合法，就执行上传文件操作。
          if (result) {
            that.$axios({
              data:{
                "activityId" : that.activityId,
                "info" : that.info,
                "unit" : that.unit,
                "leader" : that.leader,
                "score"  : 0,
                "name" : that.name,
                "projectId" : that.projectId,
                },
                method:'PUT',
                url:'/project ',
            })
            .then(function (response) {
              that.fullscreenLoading = true;
              let file
              console.log(response);
              if (response.data.resultCode === 200) { 
                console.log(that.$refs.upload.uploadFiles[0])
                if(that.$refs.upload.uploadFiles[0] == undefined){
                  file = []
                } else {
                  file = that.$refs.upload.uploadFiles[0].raw;
                }
                console.log(file.length)

                let formData = new FormData();
                formData.append('file', file);
                formData.append("document", new Blob([JSON.stringify({"projectId": that.projectId, "docUrl": that.docUrl})], {type: "application/json"}));
                that.$axios.put(`/document/update`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                  .then(response => {
                      that.fullscreenLoading = false;
                      if (response.data.resultCode === 200) {
                        that.$message({
                          message: '更新成功',
                          type: 'success',
                          duration: 2000
                        })
                         that.$router.push('/manage')
                      } else {
                        that.$message({
                          message: '更新失败，可能是网络问题！',
                          type: 'error',
                          duration: 2000
                        })
                      }
                  })
                  .catch(() => {
                      that.fullscreenLoading = false;
                  });
              } else {
                  that.fullscreenLoading = false;
                  that.$message({
                    message: '更新失败，可能是网络故障',
                    type: 'error',
                    duration: 2000
                  })
              }
            })
            .catch(function (error) {
              console.log(error);
            });

          } else {
            // 文件非法，提示错误。不执行操作。
            that.fullscreenLoading = false;
            that.$message({
              message: '更新失败，文件不符合规定格式，请重新选择文件！',
              type: 'error',
              duration: 2000
            })
          }
      } else {
        console.log("无文件")
        // 无文件
        that.$axios({
          data:{
            "activityId" : that.activityId,
            "info" : that.info,
            "unit" : that.unit,
            "leader" : that.leader,
            "score"  : 0,
            "name" : that.name,
            "projectId" : that.projectId,
            },
            method:'PUT',
            url:'/project ',
        })
        .then(function (response) {
          that.fullscreenLoading = true;
          let file
          console.log(response);
          if (response.data.resultCode === 200) { 
            console.log(that.$refs.upload.uploadFiles[0])
            if(that.$refs.upload.uploadFiles[0] == undefined){
              file = []
            } else {
              file = that.$refs.upload.uploadFiles[0].raw;
            }

            let formData = new FormData();
            formData.append('file', file);
            formData.append("document", new Blob([JSON.stringify({"projectId": that.projectId, "docUrl": that.docUrl})], {type: "application/json"}));
            that.$axios.put(`/document/update`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
              .then(response => {
                  that.fullscreenLoading = false;
                  if (response.data.resultCode === 200) {
                    that.$message({
                      message: '更新成功',
                      type: 'success',
                      duration: 2000
                    })
                    that.$router.push('/manage')
                  } else {
                    that.$message({
                      message: '更新失败，可能是网络问题！',
                      type: 'error',
                      duration: 2000
                    })
                  }
              })
              .catch(() => {
                  that.fullscreenLoading = false;
              });
          } else {
              that.fullscreenLoading = false;
              that.$message({
                message: '更新失败，可能是网络故障',
                type: 'error',
                duration: 2000
              })
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      } 

    } else {
      that.fullscreenLoading = false;
      that.$message({
          message: '该项目信息未填全！',
          type: 'error',
          duration: 2000
      })
    }

  } ,

  exit: function () {
    var that = this;
    this.$axios.get('/logout', {})
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
#up{
   width: 70%;
  margin: 1%;
}
#btn{
  margin:5% auto;
  width:68px;
}
.item #item{

  text-align:center; 
  width: 70%;
  margin: 1%;
}

  #card{
    margin:3% auto;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
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
*{
  margin: 0; padding: 0;
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
