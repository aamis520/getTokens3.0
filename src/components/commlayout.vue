<!--
聊点页面中-每个列表中左右浮动的公用组件
 -->
<template>
  <div class="commLayOut">
    <div class="commLayOutLeft">
      <img :src="content.imgUrl" alt="icon">
    </div>
    <div class="commLayOutRight">
      <span class="top">{{content.title}}</span>
      <!-- 下边的编辑图标只有是群主的时候才显示 -->
      <i @click="editGroupName" v-if="content.status" class="iconfont editIcon">&#xe62c;</i>
      <br>
      <span class="bom">{{content.remark}}</span>
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
    content: {
      type: Object,
      default: {}
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    // 点击编辑群名称
    editGroupName(){
      this.$router.push({
        path: '/editGroupName'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .commLayOut{
    position: relative;
    height: 108px;
    width: calc(100% - 76px);
    margin: 0 auto;
    .commLayOutLeft{
      float: left;
      img{
        height: 108px;
        width: 108px;
        border-radius: 50%;
      }
    }
    .commLayOutRight{
      font-size: 32px;/*px*/
      color: #FCFCFC;
      position: absolute;
      top: 50%;
      left: 150px;
      transform: translateY(-50%);
      color: white;
      text-align: left;
      .editIcon{
        margin-left:20px;
      }
      .top{
        font-family: PingFangSC-Medium;
        font-size: 36px;/*px*/
        color: #FFFFFF;
        display: inline-block;
        margin-bottom: 10px;
      }
      .bom{
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #FFFFFF;
      }
    }
  }
</style>
