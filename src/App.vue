<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: "App",
  data(){
    return {
      checkOnlineTimer: null,
      cordova: Vue.cordova
    }
  },
  mounted() {
    // IOS 橡皮筋效果
    this.clearInterValTimer()
    this.checkOnlineEveryFiveSeconds()
    console.log(this.cordova)
    console.log(Vue.cordova)

    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
  },
  methods: {
    checkOnlineEveryFiveSeconds(){
      this.clearInterValTimer()
      this.checkOnlineTimer = setInterval(()=> {
        this.checkOnline()
      },5000)
    },
    checkOnline(){
      if(navigator.onLine){
        return '1'
      }else{
        this.clearInterValTimer()
        this.$router.push('/netWorkError')
      }
    },
    clearInterValTimer(){
      clearInterval(this.checkOnlineTimer)
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.reStart{
  top: 30%;
  left: 50%;
  width: 60%;
  height: 200px;
  line-height: 200px;
  font-size: 28px;/*px*/
  border-radius: 25px;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 0.066667rem;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 3px #333;
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 99999;
}
</style>
