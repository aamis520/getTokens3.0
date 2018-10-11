<!--  -->
<template>
  <div class="loginOut">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="changeGo('1')">
        <div class="imgLeft one">
          <img src="../assets/setting/交易密码.png" alt="pic">
        </div>
        <div class="middle">
          <span>交易密码</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="changeGo('2')">
        <div class="imgLeft two">
          <img src="../assets/setting/修改昵称.png" alt="pic">
        </div>
        <div class="middle">
          <span>修改昵称</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="changeGo('3')">
        <div class="imgLeft three">
          <img src="../assets/setting/修改头像.png" alt="pic">
        </div>
        <div class="middle">
          <span>修改头像</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_container">
      <div class="loginOut_title" @click="changeGo(4)">
        <div class="imgLeft four">
          <img src="../assets/setting/关于我们.png" alt="pic">
        </div>
        <div class="middle">
          <span>关于我们</span>
        </div>
        <div class="right">
          <img src="../assets/Shape.png" alt="pic">
        </div>
      </div>
    </div>
    <div class="loginOut_foot">
      <button @click="loginOut">退出登录</button>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
import {api} from '@/static/api'
export default {
  data () {
    return {
      title: '设置',
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {},

  methods: {
    changeGo(data){
      if(data == '1'){
        this.$router.push({
          path: '/setPassword',
          query: {
            from: 'change'
          }
        })
      } else if(data == '2'){
        this.$router.push({
          path: 'setName'
        })
      } else if(data == '3'){
        this.$router.push({
          path: '/setHeadPortrait'
        })
      } else if(data == '4'){
        this.$router.push({
          path: '/aboutWe'
        })
      }
    },
    changePwd(){
    },
    loginOut(){
      api.userLogOut({user_id: this.$store.getters.UserId}, this.ApiConf).then(res => {
        if(res.error_code == 1000){
          this.$store.dispatch('UserLogout')
          this.$router.push({
            name: 'Home'
          })
        }
      }).catch(err => {
        this.$toast({
          message: err.error_desc,
          duration: 1000
        })
      })
    },
    goinSetName(){
      this.$router.push({
        path: 'setName'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .loginOut{
    height: 100%;
    .loginOut_container{
      width: 100%;
      height: 110px;
      .loginOut_title{
        margin: 10px 38px;
        border-bottom: 1px solid #eee;/*no*/
        height: 100%;
        // background: red;
        .one{
          height: 37px;
          width: 34px;
        }
        .two{
          height: 38px;
          width: 38px;
        }
        .three{
          height: 38px;
          width: 34px;
        }
        .four{
          height: 38px;
          width: 34px;
        }
        .imgLeft{
          float: left;
          margin: 50px 0 0 0;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .middle{
          font-size: 28px;/*px*/
          margin: 45px 0 0 50px;
          height: 30px;
          float: left;
        }
        .right{
          margin-top: 50px;
          float: right;
          height: 35px;
          width: 35px;
          img{
            height: 100%;
            width: 100%;
          }
        }
      }
      // border: 1px solid
    }
    .loginOut_foot{
      position:fixed;
      bottom: 0;
      width: 100%;
      height: 95px;
      button{
        letter-spacing: 5px;
        font-size: 28px;/*px*/
        color: #808080;
        background: #f1f1f1;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
