<!--  -->
<template>
  <div class="membersContainer">
    <div class="rowMember" v-for="(item,index) in content" :key="index">
      <img :src="item.imgUrl" alt="icon">
      <br>
      <span class="remarkSpan">{{item.title}}</span>
    </div>
    <div class="rowMember">
      <i @click="inviteFriend" class="iconfont memberIcon">&#xe629;</i>
      <br>
      <span class="remarkSpan">邀请好友</span>
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
      type: Array,
      default: [{}]
    },
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    // 点击邀请好友事件
    inviteFriend(){
      this.$router.push({
        path: '/creatGroupChart',
        query: {status: true,title: '好友'}
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .membersContainer{
    height: 100%;
    .rowMember{
      margin-top: 40px;
      float: left;
      width: 20%;
      text-align: center;
      img{
        width: 80px;
        height: 80px;
      }
      .memberIcon{
        font-size: 76px;
        color: #939393;
        height: 80px;
        width: 80px;
      }
      .remarkSpan{
        display: inline-block;
        margin-top: 10px;
        font-size: 28px;/*px*/
        color: #494949;
        letter-spacing: -0.67px;
        text-align: center;
      }
    }
  }
</style>
