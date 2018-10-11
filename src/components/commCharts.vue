<!--
  3.0聊天公用的组件
  -->
<template>
  <div class="chartsCommContainer">
    <div @click="applyMessageClick" class="chartsComm_apply" v-if="isShowApply">
      <img src="../assets/Testdemo/head.png" alt="icon">
      <div class="applyRightSpan">
        <span class="applyTopSpan">应用消息</span> <br>
        <span class="applyBomSpan">简述</span>
      </div>
      <!-- <i class="iconfont applyIcon">&#xe6cf;</i> -->
    </div>
     <div class="chartsComm_container" v-for="(item,index) in content" :key="index" @click="goToSingle(item)">
      <div class="chartsComm_container_left">
        <img :src = "item.imgurl" alt="icon">
      </div>
      <div class="chartsComm_container_rigth">
        <div class="right_inner">
          <span class="market">{{item.title}}</span><br>
          <span class="apply">{{item.detail}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    content: {
      type: Array,
      default: [{}]
    },
    isShowApply: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    // 点击应用消息事件
    applyMessageClick(){
      this.$router.push({
        path: '/newApplyMessage'
      })
    },
    goToSingle(item) {
      if(item.title == "新朋友"){
        this.$router.push({
          path: '/FriendRequest'
        })
      } else {
        this.$router.push({
          path: '/single'
        })
      }
    }
  }
};
</script>
<style lang='scss' scoped>
// top文字公用样式
@mixin topspan {
  color: #494949;
  margin-bottom: 10px;
  font-size: 28px; /*px*/
}
@mixin bomspan {
  color: #939393;
  font-size: 24px; /*px*/
}
@mixin borderBg{
  border-bottom: 1px solid #e7e7e7;/*no*/
}
.chartsCommContainer{
  // height: 100%;
  .chartsComm_apply{
    @include borderBg;
    position: relative;
    margin: 0 30px;
    height: 150px;
    .applyRightSpan{
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      left: 150px;
      text-align: left;
      .applyTopSpan{
        @include topspan;
      }
      .applyBomSpan{
        @include bomspan;
      }
    }
    img{
      float: left;
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
      width: 80px;
    }
  }
  .chartsComm_container {
    margin: 0 20px;/*px*/
    @include borderBg;
    height: 150px;
    .chartsComm_container_left {
      float: left;
      position: relative;
      width: 158px;
      height: 100%;
      text-align: center;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 80px;
        width: 80px;
      }
    }
    .chartsComm_container_rigth {
      float: right;
      position: relative;
      width: calc(100% - 158px);
      text-align: left;
      height: 100%;
      .right_inner {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .market {
        font-family: PingFangSC-Medium;
        @include topspan;
      }
      .apply {
        @include bomspan;
      }
    }
  }
}
</style>
