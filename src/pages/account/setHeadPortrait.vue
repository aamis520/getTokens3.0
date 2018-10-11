<!--  -->
<template>
  <div class="portraitContainer">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="portraitContainer_body">
      <div class="inner_head">
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bom"></div>
      </div>
      <div class="inner_bom">
        <div class="selectPhone">
          <span>从手机相册选择</span>
        </div>
        <div class="payPic">
          <span>拍照</span>
        </div>
        <div class="line"></div>
        <div class="cancel">
          <span>取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../../pages/comm/header";
export default {
  data () {
    return {
      title: '修改头像'
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
.portraitContainer{
  height: 100%;
  .portraitContainer_body{
    position: relative;
    height: calc(100% - 95px);
    .inner_head{
      position: relative;
      height: calc(100% - 352px);
      background: rgba(0,0,0,0.5);
      .top{
        height: 50px;
        background: #6698FF;
      }
      .middle{
        background: rgba(0,0,0,0.3);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 300px;
        width: 300px;
      }
      .bom{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: #6698FF;
      }
    }
    .inner_bom{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 352px;
      .selectPhone{
        height: 110px;
        background: white;
        line-height: 110px;
        border-bottom: 1px solid #EAEAEA;/*no*/
        span{
          font-family: PingFangSC-Regular;
          font-size: 36px;/*px*/
          color: #494949;
        }
      }
      .payPic{
        height: 110px;
        background: white;
        line-height: 110px;
        span{
          font-family: PingFangSC-Regular;
          font-size: 36px;/*px*/
          color: #494949;
        }
      }
      .cancel{
        height: 110px;
        background: white;
        line-height: 110px;
        span{
          font-family: PingFangSC-Regular;
          font-size: 36px;/*px*/
          color: #939393;
        }
      }
      .line{
        height: 23px;
        background: #F2F2F2;
      }
    }
  }
}
</style>
