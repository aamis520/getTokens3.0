<!--  -->
<template>
  <div class="groupDetailWrapper">
    <!-- <tar-header :isSowBack='true' :title="title" :addIcon="addIcon" @isShowAddClick="isShowAddClick($event)"></tar-header> -->
    <div class="group_head">
      <div class="head_icon">
        <i @click="goBack" class="iconfont backIcon">&#xe60f;</i>
      </div>
    <commlayout :content="content"></commlayout>
    </div>
    <div class="group_body">
      <div class="group_body_title">
        <div class="left_div">
          <span class="left">社群成员</span>
          <span class="middle">人员限定{{number}}人</span>
        </div>
        <div class="right_div" @click="goMembers">
          <span class="right">共{{numPeople}}人</span>
          <i class="iconfont rightIcon">&#xe616;</i>
        </div>
      </div>
      <div class="group_body_foot">
        <comm-members :content="imgContent"></comm-members>
      </div>
    </div>
    <div class="kickPeople" @click="GroupKickPeople">
      <span class="kickSpan left">踢人</span>
      <i class="iconfont right">&#xe616;</i>
    </div>
    <div class="secret">
      <span class="kickSpan left">私密</span>
      <mt-switch class="right" v-model="switchValue"></mt-switch>
    </div>
    <div class="detailFooter" @click="jiesanClick">
      <span>解散</span>
    </div>
    <mt-popup
      v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContentTop" @click="dissolveGroup">
        <span>解散群聊</span>
      </div>
      <div class="codePopContentBom" @click="cancelGroup">
        <span>取消</span>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import header from "../../pages/comm/header"
import commlayout from "../../components/commlayout"
import commMembers from "../../components/commMembers"
import {Popup, Toast } from "mint-ui";
export default {
  data () {
    return {
      switchValue: '',
      popupVisible: false,
      imgContent: [
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"},
        {imgUrl: require('../../assets/Testdemo/head.png'),title:"zhangsan"}
      ],
      numPeople: '111',
      number: '1000',
      title: '',
      content: {
        imgUrl:  require('../../assets/Testdemo/test.png'),
        title: '群名称',
        remark: 'hello mninkfd',
        status: true
      }
    };
  },

  components: {
    tarHeader: header,
    commlayout,
    commMembers
  },

  computed: {},

  mounted() {
    this.content.title = this.$route.query.name
  },

  methods: {
    // 点金踢人事件
    GroupKickPeople(){
      this.$router.push({
        path: '/creatGroupChart',
        query: {
          kick: true
        }
      })
    },
    // 点击进入群成员页面
    goMembers(){
      this.$router.push({
        path: '/groupChartMember'
      })
    },
    // 点击解散
    dissolveGroup(){
      this.popupVisible = false
      Toast({
        message: '解散成功', //提示内容分
        duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
      })
      this.$router.push({
        path: '/chartHome/chartGroup'
      })
    },
    cancelGroup(){
      this.popupVisible = false
    },
    jiesanClick(){
      this.popupVisible = true
    },
    goBack(){
      this.$router.push({
        path: '/chartHome'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .groupDetailWrapper{
    background: #f6f7f8;
    height: 100%;
    .codePop{
      width: 100%;
      height: 238px;
      background: #f6f7f8;
      .codePopContentTop{
        background: white;
        height: 115px;
        line-height: 115px;
        margin-bottom: 8px;
        span{
          font-size: 36px;/*px*/
          color: #E55656;
          letter-spacing: 5px;
        }
      }
      .codePopContentBom{
        line-height: 115px;
        background: white;
        height: 115px;
        span{
          font-size: 36px;/*px*/
          color: #939393;
          letter-spacing: 5px;
        }
      }
    }
    .group_head{
      height: 300px;
      background: #6698FF;
      .head_icon{
        padding: 30px;
        text-align: left;
        .backIcon{
          color: white;
          font-size: 42px;/*px*/
        }
      }
    }
    .kickPeople{
      border-bottom: 1px solid #e2e2e1;/*no*/
      margin-top: 20px;
      padding: 0 30px;
      display: flex;
      justify-content:space-between;
      line-height: 100px;
      height: 100px;
      background: white;
      .left{
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #494949;
        letter-spacing: -0.67px;
        text-align: left;
      }
      .right{
        font-size: 40px;/*px*/
        color: #939393;
      }
    }
    .detailFooter{
      height: 100px;
      line-height: 100px;
      background: white;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      span{
        letter-spacing: 5px;
        font-size: 28px;/*px*/
        color: #E55656;
      }
    }
    .secret{
      padding: 0 50px 0 30px;
      display: flex;
      justify-content:space-between;
      line-height: 100px;
      height: 100px;
      background: white;
      .left{
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #494949;
        letter-spacing: -0.67px;
        text-align: left;
      }
      .right{
      }
    }
    .group_body{
      height: 480px;
      background: white;
      .group_body_foot{
        height: 380px;
      }
      .group_body_title{
        height: 100px;
        line-height: 100px;
        background: white;
        .left_div{
          padding: 0 30px;
          text-align: left;
          height: 100%;
          float: left;
          width: 65%;
          .left{
            font-family: PingFangSC-Medium;
            font-size: 36px;/*px*/
            font-weight: 550;
            color: #494949;
          }
          .middle{
            margin-left: 20px;
            font-size: 24px;/*px*/
            color: #939393;
          }
        }
        .right_div{
          padding: 0 30px;
          text-align: right;
          height: 100%;
          width: 35%;
          float: left;
          .right{
            font-family: PingFangSC-Regular;
            font-size: 28px;/*px*/
            color: #939393;
            letter-spacing: 0;
            text-align: left;
          }
          .rightIcon{
            display: inline-block;
            font-size: 40px;/*px*/
            transform: translateY(5px);
            color: #939393;
          }
        }
      }
    }
  }
</style>
