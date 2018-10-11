<!--  -->
<template>
  <div class="beanKnow">
    <tar-header :title="title"></tar-header>
    <div class="test">
      <img class="img" src="../assets/Dapp/WechatIMG24.jpg" alt="icon">
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header"

export default {
  data () {
    return {
      content: [],
      title: '',
      type: '',
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    setTimeout(() => {
      this.$router.go(-1)
    }, 1000);
  },
  methods: {


    _initScroll:function () {
      if(!this.$refs.beanKnow_container){
        return
      }
      this.meunScroll = new BScroll(this.$refs.beanKnow_container, {
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        },
        pullUpLoad: {
          threshod: 50,
          stop: 0
        },
        click: true,
        scrollY:true,
        momentum: true,
        bounceTime: 400
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.commHead{
  background: #eb6857!important;
}
.test{
  width: 100%;
  .img{
    display:block;
    width: 100%;
  }
}
</style>
