<!--  -->
<template>
  <div class="creatGroupContainer">
      <tar-header :backUrl="backUrl" :isSowBack='true' :title="title" :showSaveSpan="saveSpan" @addGroupFriend="addGroupFriend" @deleteGroup="deleteGroup"></tar-header>
      <div class="creatGroupSearch">
        <i class="iconfont searchIcon">&#xe625;</i>
        <img @click="clearSearch" v-if="searchValue" src="../../assets/group/删除输入内容.png" alt="icon">
        <input type="text" placeholder="搜索" v-model="searchValue">
        <!-- <mt-search class="creatGroupInput" v-model="searchValue"></mt-search> -->
      </div>
      <div class="friendTitle">
        <span>我的好友</span>
      </div>
      <div class="creatGroupCheck">
        <div class="groupCheckList">
          <comm-Check @memBerNum="memBerNum" :content="content"></comm-Check>
          <input type="checkbox">
        </div>
      </div>
      <!-- <div class="creatGroupFoot"> -->
        <!-- <span>立即创建</span> -->
      <!-- </div> -->
      <mt-button v-if="isShowStatus" @click="timeCreate" class="footBtn" type="default">
        <span>立即创建</span>
        <span v-if="Number(number) > 0">({{number}})</span>
      </mt-button>
      <!-- <comm-Poup :isShowPoup="isShowPoup"></comm-Poup> -->
      <comm-Poup v-if="isShowPoup" :deleteContent="deleteContent" @cancelOrDelete="cancelOrDelete"></comm-Poup>
  </div>
</template>

<script>
import header from "../../pages/comm/header"
import commCheck from "../../components/commCheck"
import commPoup from "../../components/commPoup"
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      deleteContent:{
        title: '提示',
        remark: '确定删除这些群成员么？'
      },
      isShowPoup: false,
      backUrl: '',
      searchValue: '',
      isShowStatus: true,
      saveSpan: false,
      number: 0,
      checkValuedemo: '',
      checkValue: [],
      title: '创建群聊',
      content: [
        {imgurl: require('../../assets/Testdemo/head.png'),title: '张三',checkoutValue: false},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '奥特曼',checkoutValue: false},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '范冰冰',checkoutValue: false},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '李四',checkoutValue: false}
        // {imgurl: require('../assets/newDapp/猜硬币52@2x.png'),title: '区块链预言家', detail: '业内趋势了解一下吗'}
      ],
      options: [
        {
          label: '你好',
          value: 'valueF',
        },
        {
          label: '张三',
          value: 'valueE',
        },
        {
          label: '李四',
          value: 'valueA'
        },
        {
          label: '范冰冰',
          value: 'valueB'
        }
      ]
    };
  },
  watch: {

  },
  components: {
    tarHeader: header,
    commCheck,
    commPoup
  },

  computed: {},

  mounted() {
    var status = this.$route.query.status
    var titleName = this.$route.query.title
    var kickStatus = this.$route.query.kick
    if(status){
      this.saveSpan = true
      this.isShowStatus = false
    }
    if(titleName){
      this.title = titleName
    }
    if(kickStatus){
      this.title = '群成员'
      this.saveSpan = true
      this.isShowStatus = false
      this.backUrl = '/groupDetail'
    }
  },

  methods: {
    // 自定义事件-弹窗“取消”“确定”
    cancelOrDelete(data){
      if(data){
        this.$router.push({
          path: '/groupDetail'
        })
        // 调用接口
      } else {
        this.isShowPoup = false
      }
    },
    deleteGroup(){
      if(Number(this.number) <= 0) {
       this.$toast({
         message: '请选择...',
         duration: 1000
       })
      } else if(Number(this.number) > 0){
        this.isShowPoup = true
      }
    },
    clearSearch(){
      this.searchValue = ''
    },
    // 自定义添加好友事件
    addGroupFriend(){
      console.log('add')
      if(Number(this.number) > 0){
        this.$router.push({
          path: '/groupDetail'
        })
      } else {
        this.$toast({
          message: '请选择好友',
          duration: 1000 ,
        })
      }
    },
    memBerNum(data){
      console.log(data)
      this.number = data
    },
    // 点击立即创建
    timeCreate(){
      if(Number(this.number) > 0){
        this.$router.push({
          path: '/single'
        })
      } else {
        this.$toast({
          message: '请添加好友...',
          duration: 1000 ,
        })
      }
    },
    checkoutChange(){
      console.log(this.checkValuedemo)
    }
  }
}

</script>
<style lang='scss' scoped>
  .creatGroupContainer{
    height: 100%;
    .mint-msgbox{
      width:540px !important;
      height: 340px !important;
      border-radius: 24px;
    }
    .friendTitle{
      padding: 0 30px;
      height: 80px;
      text-align: left;
      line-height: 80px;
      span{
        font-size: 24px;/*px*/
        color: #494949;
      }
    }
    .creatGroupSearch{
      position: relative;
      height: 108px;
      padding: 20px 36px;
      background: #f2f2f2;
      .searchIcon{
        color: #939393;
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50px;
      }
      img{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 50px;
      }
      input{
        font-size: 28px;/*px*/
        color: #494949;
        text-align: left;
        padding: 0 60px;
        outline: none;
        border: none;
        height: 68px;
        width: 100%;
      }
      input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 28px;
        color: #939393;
      }
      input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-size: 28px;
        color: #939393;
      }
      input::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-size: 28px;
        color: #939393;
      }
      input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 28px;
        color: #939393;
      }
      input.creatGroupInput{
        height: 80px;
      }
    }
    .creatGroupCheck{
      .groupCheckList{
        input{
          outline: none;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          appearance: none;
        }
      }
    }
    // .creatGroupFoot{
    //   width: calc(100%-40px);
    //   height: 100px;
    //   font-size: 25px;/*px*/
    //   color: white;
    //   letter-spacing: 5px;
    //   line-height: 100px;
    //   background: #f2f2f2;
    //   position: absolute;
    //   left: 20px;
    //   right: 20px;
    //   bottom: 20px;
    // }
    .footBtn{
      font-size: 28px;/*px*/
      color: #FCFCFC;
      width: calc(100%);
      height: 80px;
      letter-spacing: 5px;
      line-height: 80px;
      background: #ccc;
      position: absolute;
      border-radius: 8px;
      left: 8%;
      bottom: 20px;
      width: 84%;
    }
  }
</style>
