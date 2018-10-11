<!--  -->
<template>
  <div class="aboutWeContainer">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="aboutWeContainer_body">
      <div class="imgWrapper">
        <img src="../../assets/setting/logo.png" alt="icon">
      </div>
      <div class="remark">
        <span>
          转点，致力于打造真实、高效、透明的区块链生态系统，给大家提供充分的交流空间，发现更多乐趣。
        </span>
      </div>
      <div class="foot">
        <span>商业合作请发送邮件至：media@zhuandian.net</span>
      </div>
    </div>
    关于我们
  </div>
</template>

<script>
import header from "../../pages/comm/header";
export default {
  data () {
    return {
      title: '关于我们'
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .aboutWeContainer{
    height: 100%;
    .aboutWeContainer_body{
      position: relative;
      height: calc(100% - 95px);
      .imgWrapper{
        padding-top: 150px;
        img{
          height: 174px;
          width: 174px;
        }
      }
      .remark{
        display: inline-block;
        margin-top: 100px;
        font-size: 28px;/*px*/
        letter-spacing: 3px;
        color: #939393;
        text-align: left;
        padding: 0 80px;
      }
      .foot{
        font-family: PingFangSC-Regular;
        opacity: 0.88;
        text-align: center;
        padding: 0 100px;
        position: absolute;
        bottom: 200px;
        width: 100%;
        font-size: 24px;/*px*/
        color: #939393;
      }
    }
  }
</style>
