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
        
           <el-main>
               
 活动名称：<el-select id="sel" v-model="activity" placeholder="请选择">
    <el-option
    
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.activityId"
     >
    </el-option>
  </el-select>
    <el-col :span="24" class="warp-main" v-loading="">
      <el-form :inline="true" class="demo-form-inline" v-for="(item, i) in FormArr" :key="i">
        <el-form-item label="评分方向：">
          <el-input v-model="item.value" placeholder="例：创新性"></el-input>
        </el-form-item>
         <el-form-item label="总分占比：">
          {{part}}
        </el-form-item>
        <el-button type="primary" @click="Delete(item.index)">删除</el-button>
      </el-form>
      <el-button type="primary" @click="AddForm">增加更多</el-button>
      <el-button type="primary" @click="make">确定</el-button>
    </el-col>
  </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
   
  data(){
    return{
         activity:'', 
        val:'',
         options: [],
       FormArr: [
        {
          index: 0,
          value: '',
        }
      ],
     part:1
    }
  },
  mounted(){
    this.select()
  },
  methods: {
       select(){
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
  make:function() {
          var that = this;
         
             this.$axios({
               data:{
                 part:that.part,
                 form : that.FormArr,
                 activity : that.activity
               },
               method:"post",
               url:"/activityId"
     })
     .then(function (response){
         that.$message({
            message: '定制成功',
            type: 'success',
            duration: 2000
          })
          })
    
          
        },
	   AddForm :function() {
      this.FormArr.push({
        index: this.FormArr.length,
        value: '',
      })
      this.part = (1/this.FormArr.length).toFixed(2)
      console.log(this.FormArr)
    },
    Delete:function (index) {
      this.FormArr.splice(index, 1)
     this.part = (1/this.FormArr.length).toFixed(2)
      for (let i in this.FormArr) {
        this.FormArr[i].index = i
      }
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
   
  }
    }
  

</script>

<style>
#sel{
    margin: 10%
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
