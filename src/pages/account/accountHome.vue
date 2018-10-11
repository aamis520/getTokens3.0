<!-- 账户3.0首页 -->
<template>
  <div class="accountHomeContainer">
    <div class="accountHomeContainer_head">
      <div class="title">
        <span>账户</span>
      </div>
      <commlayout :content="content"></commlayout>
    </div>
    <div class="singFunc" @click="goPage('1')">
      <img class="imgone" src="../../assets/account/我的钱包.png" alt="icon">
      <span class="left">我的钱包</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="singFunc twoDiv" @click="goPage('2')">
      <img class="imgtwo" src="../../assets/account/糖果红包.png" alt="icon">
      <span class="left">糖果红包</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="singFunc" @click="goPage('3')">
      <img class="imgthree" src="../../assets/account/我的主页.png" alt="icon">
      <span class="left">我的主页</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="singFunc" @click="goPage('4')">
      <img class="imgFour" src="../../assets/account/邀请好友.png" alt="icon">
      <span class="left">邀请好友</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="singFunc fiveDiv" @click="goPage('5')">
      <img class="imgFive" src="../../assets/account/收支记录.png" alt="icon">
      <span class="left">收支记录</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="singFunc" @click="goPage('6')">
      <img class="imgSix" src="../../assets/account/设置.png" alt="icon">
      <span class="left">设置</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
  </div>
</template>

<script>
import commlayout from "../../components/commlayout"
export default {
  data () {
    return {
      content: {
        imgUrl:  require('../../assets/Testdemo/test.png'),
        title: 'Aaron',
        remark: '135****6772',
        status: false
      }
    };
  },

  components: {
    commlayout
  },

  computed: {},

  mounted() {},

  methods: {
    goPage(data){
      if(data == '3') {
        this.$router.push({
          path: '/Home'
        })
      } else if(data == '1'){
        this.$router.push({
          path: '/homeWallet'
        })
      } else if(data == '2'){
        this.$router.push({
          path: '/redPaper'
        })
      } else if(data == '4'){
        this.$router.push({
          path: '/RequestPage'
        })
      } else if(data == '5'){
        this.$router.push({
          path: '/income'
        })
      } else if(data == '6'){
        this.$router.push({
          path: '/loginOut'
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .accountHomeContainer{
    height: 100%;
    background:#EEEEEE;
    .twoDiv{
      margin-bottom: 20px;
    }
    .fiveDiv{
      margin-bottom: 20px;
    }
    .singFunc{
      border-bottom: 1px solid #e2e2e1;/*no*/
      // margin-top: 20px;
      padding: 0 38px;
      text-align: left;
      // display: flex;
      // justify-content:space-between;
      line-height: 100px;
      height: 100px;
      background: white;
      position: relative;
      img{
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        // float: left;
      }
      .imgone{
        height: 32px;
        width: 40px;
      }
      .imgtwo{
        height: 40px;
        width: 35px;
      }
      .imgthree{
        height: 39px;
        width: 38px;
      }
      .imgFour{
        height: 36px;
        width: 36px;
      }
      .imgFive{
        height: 42px;
        width: 37px;
      }
      .imgSix{
        height: 40px;
        width: 40px;
      }
      .left{
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #494949;
        text-align: left;
        margin-left: 120px;
      }
      .right{
        float: right;
        font-size: 40px;/*px*/
        color: #939393;
      }
    }
    .accountHomeContainer_head{
      background: #6698FF;
      height: 278px;
      width: 100%;
      .title{
        font-family: PingFangSC-Semibold;
        font-size: 36px;/*px*/
        color: #FFFFFF;
        height: 110px;
        line-height: 110px;
        text-align: center;
      }
    }
  }
</style>
