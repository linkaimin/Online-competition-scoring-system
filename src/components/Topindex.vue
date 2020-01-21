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
          <el-menu  default-active="1"

                    background-color="#dbe9f1"

                    active-text-color="#6ec673" id="menu">
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-location"></i>评估结果统计</template>
              <el-menu-item-group>
                <el-menu-item index="4-1"> <router-link to="/main/workrun"><i class="el-icon-tickets"></i>评估结果展示</router-link></el-menu-item>
                <el-menu-item index="4-2"> <router-link to="/main/twoschoolrun"><i class="el-icon-tickets"></i>评估内容反馈</router-link></el-menu-item>
              
              </el-menu-item-group>
            </el-submenu>
           
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-location"></i>项目管理</template>
              <el-menu-item-group>
                <el-menu-item index="8-1"> <router-link to="/main/humanflowsta"><i class="el-icon-tickets"></i>新增活动</router-link></el-menu-item>
                <el-menu-item index="8-2"> <router-link to="/main/controlstu"><i class="el-icon-tickets"></i>活动项目添加</router-link></el-menu-item>
                <el-menu-item index="8-3"> <router-link to="/main/nobacklist"><i class="el-icon-tickets"></i>活动项目管理</router-link></el-menu-item>
               
               

              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-location"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item index="9-1"> <router-link to="/main/user"><i class="el-icon-tickets"></i>新增用户</router-link></el-menu-item>
                <el-menu-item index="9-2"> <router-link to="/main/role"><i class="el-icon-tickets"></i>用户信息管理</router-link></el-menu-item>
              

              </el-menu-item-group>
            </el-submenu>

            </el-menu>

        </el-aside>
       
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dynamicTags: []
    }
  },
  mounted(){

  },
  methods: {
    exit: function () {
      sessionStorage.clear()
        this.$message({
            message: '退出成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/')
    }
   
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
   
  }

</script>

<style>
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
  .i_yellow{
    color: yellow;
  }
  .i_rd{
    color: red;
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
  .el-tag {
    background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
  }
  .router-view{
   margin-bottom: 5px;
    /*background-color: #ffffff;*/
    /*border:1px solid #eeeeee;*/
    border-radius: 5px;
    width: 100%;
    margin-top: 5px;

  }
</style>
