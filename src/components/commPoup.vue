<!-- 公用的二次确认弹出框 -->
<template>
  <div class="commPoup">
    <div class="commPoupInner">
      <div class="commPoupInner_title">{{deleteContent.title}}</div>
      <div class="commPoupInner_remark">{{deleteContent.remark}}</div>
      <div class="commPoupInner_foot">
        <div class="left" @click="cancel">
          <span>取消</span>
        </div>
        <div class="right" @click="save">
          <span>确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    deleteContent: {
      type: Object,
      default: {}
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    cancel(){
      this.$emit('cancelOrDelete', false)
    },
    save(){
      this.$emit('cancelOrDelete', true)
    }
  }
}

</script>
<style lang='scss' scoped>
  .commPoup{
    position: absolute;
    top: 0;
    bottom:0;
    left:0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    .commPoupInner{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%);
      height: 340px;
      width: 540px;
      background: #FFFFFF;
      border-radius: 24px;
      .commPoupInner_title{
        height: 140px;
        line-height: 140px;
        font-family: PingFangSC-Regular;
        font-size: 34px;/*px*/
        color: #030303;
        text-align: center;
      }
      .commPoupInner_remark{
        font-family: PingFangSC-Regular;
        font-size: 30px;/*px*/
        color: #888888;
        letter-spacing: 0;
        text-align: center;
        line-height: 45px;
      }
      .commPoupInner_foot{
        position: absolute;
        display: flex;
        // justify-content: space-around;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #DFDFDF;/*no*/
        line-height: 120px;
        height: 120px;
        font-size: 34px;/*px*/
        .left{
          flex: 1;
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          color: #31313F;
        }
        .right{
          flex: 1;
          border-left: 1px solid #DFDFDF;/*no*/
          font-family: PingFangSC-Regular;
          font-size: 34px;/*px*/
          color: #E55656;
        }
      }
    }
  }
</style>
