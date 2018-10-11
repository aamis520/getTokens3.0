<template>
  <div class="netWork">
    <div class="netBgBox">
      <p class="img">
        <img src="@/assets/netWork.png" alt="">
      </p>
      <p class="desc">网络连接异常</p>
      <p class="btn">
        <button @click="reTry">重新加载</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      checkOnlineTimer: null
    }
  },
  created(){
    this.clearInterValTimer()
    this.checkOnlineEveryFiveSeconds()
  },
  beforeDestroy(){
    this.checkOnlineTimer = null
  },
  methods:{
    checkOnlineEveryFiveSeconds(){
      this.clearInterValTimer()
      this.checkOnlineTimer = setInterval(()=> {
        this.reConect()
      },2000)
    },
    reConect(){
      let flag = this.checkOnline()
      if(flag == '1'){
        this.clearInterValTimer()
        this.$router.go(-1)
      }
    },
    reTry(){
      let flag = this.checkOnline()
      if(flag == '1'){
        this.clearInterValTimer()
        this.$router.go(-1)
      }else{
        this.$toast({
          message: '网络连接失败，请检查网络后重试',
          duration: 1000
        })
      }
    },
    checkOnline(){
      if(navigator.onLine){
        return '1'
      }else{
        return '0'
      }
    },
    clearInterValTimer(){
      clearInterval(this.checkOnlineTimer)
    }
  }
}
</script>
<style lang="scss" scoped>
.netWork{
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .netBgBox{
    position: relative;
    top: 25%;
    text-align: center;
    .img{
      max-width: 376px;
      margin: 30px auto;
      img{
        display: block;
        width: 100%;
      }
    }
    .desc{
      font-size: 36px;/*px*/
      line-break: 1;
      color: #666;
    }
    .btn{
      margin: 70px auto;
      button{
        width: 220px;
        height: 90px;
        border-radius: 90px;
        border: 1px solid #ff9c00;/*px*/
        background: transparent;
        text-align: center;
        line-height: 90px;
        font-size: 30px;
        color: #ff9c00;
      }
    }

  }
}
</style>


