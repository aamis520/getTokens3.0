<!--  -->
<template>
  <div class="redRemark">
    <tar-header :backUrl="backUrl" :title="title"></tar-header>
    <div class="redRemark_container">
      <div class="redRemark_tabbar">
        <div class="redRemark_tabbar_left" @click="goToFillIn">
          <!-- <div> -->
            <span :class="classA ? 'class-b' : 'class-a'">我收到的</span>
          <!-- </div> -->
        </div>
        <div @click="goInGivePack" class="redRemark_tabbar_right">
          <!-- <div> -->
            <span :class="classA ? 'class-a' : 'class-b'">
              我发出的
            </span>
          <!-- </div> -->
        </div>
      </div>
      <div class="redRemark_content">
        <router-view @isShowShare = 'isShowShare'></router-view>
      </div>
    </div>
    <div class="goBrowser" v-if="isShow">
      <div class="guide">
        <img src="../assets/download/browser.png" alt="icon">
        <p>点此分享</p>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header";
export default {
  data () {
    return {
      isShow: false,
      classA: false,
      backUrl: '/redPaper',
      title: '红包记录'
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
    var currentRoute = this.$router.currentRoute.path
    var strArr = currentRoute.split('/')
    if (strArr.includes('fillIn')) {
      this.classA = false
    } else if (strArr.includes('givePack')) {
      this.classA = true
    }
  },

  methods: {
    isShowShare(data){
      this.isShow = data
    },
    goToFillIn(){
      this.classA = false
      this.$router.push({
        path: '/redMemark/fillIn'
      })
    },
    goInGivePack(){
      this.classA = true
      this.$router.push({
        path: '/redMemark/givePack'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.redRemark{
  background: #FCFCFC;
  height: 100%;
  .goBrowser{
    text-align: right;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    opacity: .5;
    .guide{
      margin-top: 50px;
      height: 200px;
      padding-right: 50px;
      img{
        height: 150px;
        width: 150px;
      }
      p{
        margin-top: 15px;
        padding-right: 28px;
        font-size: 30px;/*px*/
        color: white;
      }
    }
  }
  .redRemark_container{
    height: calc(100% - 100px);
    overflow: hidden;
    // border: 1px solid red;
    .redRemark_content{
      height: calc(100% - 100px);
      // margin: 0 20px;
      // border: 1px solid red;
    }

    .redRemark_tabbar{
      opacity: 1;
      background:white;
      border-bottom: 1px solid white;/*no*/
      height: 100px;
      display: flex;
      font-size: 30px;/*px*/
      // color: black !important;
      .router-link-active{ //.router-link-active 指定
        color: #fdd401;
        padding-bottom: 25px;
        border-bottom: 4px solid #fdd401;/*no*/
      }
      .redRemark_tabbar_left, .redRemark_tabbar_right{
        font-size: 30px;/*px*/
        line-height: 100px;
        text-align: center;
        flex: 1;
      }
      .class-a{
        transition: .2;
        display: inline-block;
        height: 100%;
        width: 200px;
        color: #6698FF;
        border-bottom: 2px solid #6698FF;/*no*/
      }
      .class-b{
        transition: .2;
        color: #939393;
        display: inline-block;
        height: 100px;
        border-bottom:none;
      }
    }
  }
}
</style>
