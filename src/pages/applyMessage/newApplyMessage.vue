<!--  -->
<template>
  <div class="applyMessageContainer">
    <tar-header :isSowBack='true' :title="title" @isShowAddClick="isShowAddClick($event)"></tar-header>
    <div class="contentWrapper">
      <div class="innerList" v-for="(item,index) in listArray" :key="index">
        <div class="innerListTop">
          <div class="innerListTopLeft">
            <img :src="item.imgurl" alt="icon">
          </div>
          <div class="innerListTopRight">
            <span class="top">{{item.title}}</span><br>
            <span class="bom">{{item.detail}}</span>
          </div>
        </div>
        <div class="innerListBom"></div>
        <div class="midLine"></div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../../pages/comm/header"
export default {
  data () {
    return {
      title: '应用消息',
      listArray: [
        {imgurl: require('../../assets/Testdemo/head.png'),title: 'ZD_EOS',detail:'查看数字货币实时行情的应用'},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '广告挖矿',detail:'查看数字货币实时行情的应用'},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '市场行情',detail:'查看数字货币实时行情的应用'}
      ]
    }
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' scoped>
@mixin topspan{
  font-family: PingFangSC-Regular;
  font-size: 28px;/*px*/
  color: #494949;
}
@mixin bomspan{
  font-family: PingFangSC-Regular;
  font-size: 24px;/*px*/
  color: #939393;
}
.applyMessageContainer{
  height: 100%;
  .contentWrapper{
    height: calc(100% - 95px);
    // background: goldenrod;
    .innerList{
      // height: 400px;
      margin-top: 10px;
      .innerListBom{
        margin:0 36px;
        height: 340px;
        border-radius: 8px;
        margin-bottom: 40px;
        border: 1px solid red;/*no*/
      }
      .midLine{
        height: 20px;
        background: #F2F2F2;
      }
      .innerListTop{
        padding:0 36px;
        position: relative;
        height: 100px;
        .innerListTopLeft{
          height: 100%;
          float: left;
          img{
            margin-top: 10px;
            height: 80px;
            width: 80px;
          }
        }
        .innerListTopRight{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 120px;
          text-align: left;
          float: left;
          font-size: 25px;/*px*/
          .top{
            @include topspan;
            display: inline-block;
            margin-bottom: 10px;
          }
          .bom{
            @include bomspan;
          }
        }
      }
    }
  }
}
</style>
