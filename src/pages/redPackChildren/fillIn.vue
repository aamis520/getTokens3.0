<!--  -->
<template>
  <div class="fillIn" ref="fillIn">
    <div class="friendRequestBg" v-if="isSowBack">
      <img src="../../assets/empty.png" alt="背景图">
      <p>暂无记录</p>
    </div>
    <div>
      <div @click="goInDetail(item)" class="fillIn_inner" v-for="(item,index) in getBackData" :key="index">
        <div class="left">
          <img src="../../assets/redPaper/redIcon.png" alt="红包图标">
        </div>
        <div class="middle">
          <div class="middle_inner">
            <span class="middle_top">{{item.coin_name}}</span><br>
            <span class="middle_middle">{{item.user_name}}</span> <br>
            <span class="middle_bom">{{item.time}}</span>
          </div>
          <!-- <span class="middle_time">{{item.time}}</span> -->
        </div>
        <div class="right">
          <div class="right_inner">
            <span class="rightSpan">
              {{item.money_num | availableFilter}}
            </span>
          </div>
          <!-- <button>{{item.getTotal}}</button> -->
        </div>
        <div class="fillIn_time">
          <!-- <span>{{item.time}}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui";

export default {
  data () {
    return {
      isSowBack: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackData: [],
      content: [
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'},
        {pic: '',name: 'UPoints', get: 'hohn', getTotal: '+16.00'}
      ]
    }
  },
  watch: {
    // 监控路由变化
    // "$route": function(){
    //   var currentRoute = this.$router.currentRoute.path
    //   var strArr = currentRoute.split('/')
    //   if (strArr.includes('fillIn')) {
    //     console.log('1')
    //   } else if (strArr.includes('givePack')) {
    //     console.log('2')
    //   }
    // }
  },
  components: {},
  computed: {},
  created() {
    this.getRedPack()
  },
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,6)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    numParse:function(data){
      if (data > 0) {
        return '+' + Number(data).toFixed(2)
      }
    }
  },
  methods: {
    goInDetail(item){
      console.log(item)
      this.$router.push({
        path: '/getPack',
        query: {
          id: item.packet_id
        }
      })
    },
     // 收到红包接口
    getRedPack(){
      var _this = this
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
      api.remarkRedGet({}, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          Indicator.close()
          _this.getBackData = res.data
          if (_this.getBackData.length == 0){
            _this.isSowBack = true
          }
          _this.$nextTick(() => {
            _this._initScroll()
          })
        }else {
          Indicator.close()
          Toast({
            message: '获取收红包记录失败', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          })
        }
      })
      .catch(() =>{
        Indicator.close()
        Toast({
          message: '获取收红包记录失败', //提示内容分
          duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
        })
      })
    },

    // better-scroll初始化dom节点
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.fillIn, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 200 // 回弹时间
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  @mixin layMidle {
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    position:absolute;
  }
  @mixin border_bom{
    border-bottom: 1px solid #e2e2e1;/*no*/
  }
  .fillIn{
    margin-top: 20px;
    position: relative;
    background: white;
    height: 100%;
    overflow: hidden;
    .friendRequestBg{
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 317px;
      width: 389px;
      img{
        height: 100%;
        width: 100%;
      }
      p{
        letter-spacing: 3px;
        font-size: 32px;
        color: #adadad;
      }
    }
    .fillIn_inner{
      @include border_bom;
      margin: 0 40px;
      position: relative;
      height: 220px;
      .fillIn_time{
        margin-bottom: 15px;
        left: 17%;
        bottom: 0;
        position: absolute;
        span{
          color: #a7a7a4;
          font-size: 20px;/*px*/
        }
      }
      .left{
        float: left;
        height: 100%;
        width: 100px;
        position: relative;
        img{
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 80px;
          width: 80px;
        }
      }
      .middle{
        width: 300px;
        display: inline-block;
        height: 100%;
        text-align: left;
        position: relative;
        .middle_inner{
          @include layMidle;
        }
        .middle_top{
          font-family: PingFangSC-Medium;
          font-size: 32px;/*px*/
          color: #494949;
        }
        .middle_middle{
          display: inline-block;
          margin-top: 5px;
          font-family: PingFangSC-Regular;
          font-size: 28px;/*px*/
          color: #494949;
        }
        .middle_bom{
          font-family: PingFangSC-Regular;
          font-size: 20px;/*px*/
          color: #939393;
        }
      }
      .right{
        height: 100%;
        width: 200px;
        float: right;
        text-align: left;
        .right_inner{
          @include layMidle;
          .rightSpan{
            font-size: 42px;/*px*/
            color: #fdd401;
          }
        }
        // button{
        //   font-size: 28px;/*px*/
        //   color: white;
        //   position: absolute;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   height: 73px;
        //   width: 151px;
        //   background: #fdd401;
        //   border-radius: 10px;
        // }
      }
    }
  }
</style>
