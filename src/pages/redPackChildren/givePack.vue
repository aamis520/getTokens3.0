<!--  -->
<template>
  <div class="fillIn" ref="fillIn">
    <div class="friendRequestBg" v-if="isSowBack">
      <img src="../../assets/empty.png" alt="背景图">
      <p>暂无记录</p>
    </div>
    <div>
      <div class="fillIn_inner" v-for="(item,index) in getBackData" :key="index">
        <div class="left" @click="goinDetail(item)">
          <img src="../../assets/redPaper/redIcon.png" alt="红包图标">
        </div>
        <div class="middle" @click="goinDetail(item)">
          <span class="middle_top">{{item.coin_name}}</span><br>
          <span class="middle_bottom">已领取：{{item.remainder | availableFilter}}/{{item.money}}</span>
        </div>
        <div class="right">
          <!-- <span></span> -->
          <!-- <button class="right_btn" @click="remarkShare(item)">{{item.isOrShare}}</button> -->
          <button  :class="{'class-a': item.status !== '1', 'class-b': item.status == '1'}" @click="remarkShare(item)">{{item.isOrShare}}</button>
        </div>
        <div class="fillIn_time">
          <span>{{item.add_time}}</span>
        </div>
      </div>
    </div>
    <div class="goBrowser" v-if="isShow">
      <div class="guide">
        <img src="../../assets/download/browser.png" alt="icon">
        <p>点此分享</p>
      </div>
    </div>
    <!-- 微信分享弹窗 -->
    <div class="shareWeixin" v-show="isShowWeixin">
      <div class="shareWeixin_inner">
        <div class="shareWeixin_inner_top">
          <div class="picOne comm" @click="shareWeixin('friendChat')">
            <div class="innerWraper">
              <img src="../../assets/redPaper/weixin.png" alt="weixin"> <br>
              <span class="shareTitle">朋友圈</span>
            </div>
          </div>
          <!-- 微信 -->
          <div class="picTwo comm" @click="shareWeixin('wechat')">
            <div class="innerWraper">
              <img src="../../assets/redPaper/weixin@2x.png" alt="pengyouquan"><br>
              <span class="shareTitle">微信</span>
            </div>
          </div>
          <div class="picThe comm" @click="shareWeixin('qq')">
            <div class="innerWraper">
              <img src="../../assets/redPaper/pp@2x.png" alt="qq"><br>
              <span class="shareTitle">QQ</span>
            </div>
          </div>
          <div class="picFor comm" @click="shareWeixin('qqZone')">
            <div class="innerWraper">
              <img src="../../assets/redPaper/qqkongjian@2x.png" alt="qqZone"><br>
              <span class="shareTitle">QQ空间</span>
            </div>
          </div>
        </div>
        <div @click="closePoup" class="shareWeixin_inner_bom">
          <span>取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui"
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      getweixindata: '',
      isShowWeixin: false,
      isShow: false,
      getWeixinShareInfo: '',
      isSowBack: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackData: [],
      content: [
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '去分享'},
        {pic: '',name: 'UPoints', get: '0/100', isOrShare: '已过期'}
      ]
    }
  },

  components: {},

  computed: {},
  filters: {
    availableFilter(val){
      let arr = String(val).split('.')
      let str = ''
      if(arr.length > 1){
        str  = arr[1].slice(0,5)
      }
      console.log(str)
      if(str){
        return arr[0] + '.' + str
      }else{
        return arr[0]
      }
    },
    moneyParse: function (data) {
      return data.toFixed(2)
    }
  },

  created() {
    this.giveRedPack()
  },
  beforeRouteEnter(to,from,next){
    /*
    * 判断如果是微信内置浏览器话window.assign
    */
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin && to.path !== location.pathname) {
       if(process.env.NODE_ENV === 'development'){
          location.assign('http://vue.dev.zhuandian.net/redMemark/givePack')
        }else if(process.env.NODE_ENV === 'testing'){
          location.assign('http://vue.dev.zhuandian.net/redMemark/givePack')
        }else{
          location.assign('https://ft.zhuandian.net/redMemark/givePack')
          // location.assign('http://vue.dev.zhuandian.net/redMemark/givePack')
        }
    }else{
      next()
    }
  },
  methods: {
    closePoup(){
      this.isShowWeixin = false
    },
    // 点击分分享-配置 分享api
    shareWeixin(flag){
      var _this = this
      document.addEventListener("deviceready", function() {
        appintance =  new(_this.callAndroid(flag))
      }, true);
    },
     // 调用cordova打包api
    callAndroid(flag){
      var _this = this
      var msg = JSON.stringify(_this.getweixindata)
      if (msg == '') {
          return false;
      }
      var isIos = _this.androidOrIosSys()
      let title = _this.getweixindata.title
      let desc = _this.getweixindata.vice_title
      let imgUrl = decodeURIComponent(_this.getweixindata.logo)
      let url = decodeURIComponent(_this.getweixindata.link)
        switch(flag) {
          case 'qq':
            let args = {}
            args.client = QQSDK.ClientType.QQ // QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            args.scene = QQSDK.Scene.QQ // QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            args.title = title
            args.description = desc
            args.image = imgUrl
            args.url = url
            QQSDK.shareNews( ()=> {
              // _this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功')
            }, (reason)=> {
              console.log(reason)
            }, args)
            break
          case 'qqZone': // qq空间
            let argsZone = {}
            argsZone.client = QQSDK.ClientType.QQ // QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            argsZone.scene = QQSDK.Scene.QQZone // QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            argsZone.title = title
            argsZone.description = desc
            argsZone.image = imgUrl
            argsZone.url = url
            console.log(argsZone)
            QQSDK.shareNews(function() {
              // _this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功');
            }, function(failReason) {
              console.log(failReason);
            }, argsZone);
            break
          case 'wechat': // 微信
            Wechat.share({
              message: {
                title: title,
                description: desc,
                thumb: imgUrl,
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: url
                }
              },
              scene: Wechat.Scene.SESSION // share to Timeline
            }, function() {
              // _this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功');
            }, function(reason) {
              console.log("Failed: " + reason);
            })
            break
          case 'friendChat': // 微信朋友圈
            Wechat.share({
              message: {
                title: title,
                description: desc,
                thumb: imgUrl,
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: url
                }
              },
              scene: Wechat.Scene.TIMELINE // share to Timeline
            }, function() {
              // _this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功');
            }, function(reason) {
              console.log("Failed: " + reason);
            })
        }
    },
    wxInit(res) {
      var _this = this
      // console.log(this)
      // debugger
      let links = res.link
      let title = res.title
      let desc = res.vice_title
      let imgUrl = res.logo
      wx.config({
        debug: false,
        appId: this.getWeixinShareInfo.appId,
        timestamp: this.getWeixinShareInfo.timestamp,
        nonceStr: this.getWeixinShareInfo.nonceStr,
        signature: encodeURIComponent(this.getWeixinShareInfo.signature),
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      });
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title,
          desc: desc,
          link: links,
          imgUrl: imgUrl,
          success: function() {
            this.$emit("isShowShare", false); // 父组件传值--自定义事件
            Toast({
              message: "成功分享到朋友圈"
            });
          },
          cancel: function() {
            Toast({
              message: "分享失败,您取消了分享!"
            });
          }
        });
        //微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          },
          cancel: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          }
        });
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          },
          cancel: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          }
        });
        wx.onMenuShareWeibo({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          },
          cancel: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          }
        });
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          },
          cancel: function() {
            _this.$emit("isShowShare", false); // 父组件传值--自定义事件
          }
        });

      });
      wx.error(function(err) {
        // alert(JSON.stringify(err))
      });
    },
    goinDetail(item){
      this.$router.push({
        path: '/getPack',
        query: {
          id: item.share.rec
        }
      })
    },
    /*
    * 点击分享按钮的，如果==‘去分享’，判断是否在微信浏览器中，is--右上角提示分享， no--调用原生的方法
     */
    remarkShare(item){
      console.log(item)
      if (item.status == '3' || item .status == '2' || item.status == '4') {
        return
      }
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if(isWeixin) {
        // this.isShow = true
        this.wxInit(item.share)
        this.$emit("isShowShare", true); // 父组件传值--自定义事件
      } else {
        this.isShowWeixin = true
        this.getweixindata = item.share
        // console.log(item.share)
        // this.callAndroid(item.share)
      }
      // console.log(item.share)
    },
    // 发出红包接口
    giveRedPack(){
      Indicator.open({
        text: '正在努力加载...',
        spinnerType: 'fading-circle'
      })
      var _this = this
      api.remarkRedGive({}, _this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          Indicator.close()
          res.data.packet.forEach(ele => {
            ele.money = Number(ele.money)
            ele.remainder = Number(ele.money) - Number(ele.balance)
            if(ele.status == '1') {
              ele.isOrShare = '去分享'
            } else if (ele.status == '2') {
              ele.isOrShare = '已退款'
            } else if (ele.status == '3'){
              ele.isOrShare = '已过期'
            } else if (ele.status == '4') {
               ele.isOrShare = '已领完'
            }
          })
          _this.getBackData = res.data.packet
          _this.getWeixinShareInfo = res.data.wxShare // 保存微信配置信息
          if (_this.getBackData.length == 0) {
            _this.isSowBack = true
          }
          _this.$nextTick(() => {
            _this._initScroll()
          })
          // this.wxInit(res.data.)
        } else {
          Indicator.close()
          Toast({
            message: '获取发红包记录失败', //提示内容分
            duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
            iconClass: 'mint-toast-icon mintui mintui-field-error'  //icon 图标的类名
          })
        }
      })
      .catch(() =>{

      })
    },
    // better-scroll初始化dom节点
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.fillIn, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 200 // 回弹时间
        // snap: {
        //   loop: true,
        //   speed: 600,
        // }
      })
    },
    // callAndroid(data){
    //   var msg = JSON.stringify(data)
    //   if (msg == '') {
    //       return false;
    //   }
    //   var isIos = this.androidOrIosSys()
    //   if (isIos) {
    //     iosShare(msg);
    //   }else {
    //       share.androidShare(msg)
    //   }
    // },
    androidOrIosSys(){
      var browser = {
        versions : function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {// 移动终端浏览器版本信息
                trident : u.indexOf('Trident') > -1, // IE内核
                presto : u.indexOf('Presto') > -1, // opera内核
                webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                mobile : !!u.match(/AppleWebKit.*Mobile.*/)
                || !!u.match(/AppleWebKit/), // 是否为移动终端
                ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad : u.indexOf('iPad') > -1, // 是否iPad
                webApp : u.indexOf('Safari') == -1
                // 是否web应该程序，没有头部与底部
            };
        }(),
        language : (navigator.browserLanguage || navigator.language)
            .toLowerCase()
      }
      if (browser.versions.ios || browser.versions.iPhone
          || browser.versions.iPad) {
          return 1;
      } else if (browser.versions.android) {
          return 0;
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .fillIn{
    position: relative;
    background: white;
    height: 100%;
    overflow: hidden;
    .shareWeixin{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.3);
      .shareWeixin_inner{
        position: absolute;
        // left: 50%;
        // left: 0;
        // right: 0;
        bottom: 0px;
        // transform: translate(-50%, -50%);
        // border-radius:20px 20px 0 0 ;
        background: #f1f1f1;
        width: 100%;
        height: 345px;
        .shareWeixin_inner_top{
          display: flex;
          height: 225px;
          width: 100%;
          // background: red;
          .comm{
            position: relative;
            text-align: center;
            padding: 0 10px;
            flex: 1;
            .innerWraper{
              position: absolute;
              transform: translate(-50%,-50%);
              top: 50%;
              left: 50%;
              span{
                display: inline-block;
                margin-top: 10px;
                color:#808080;
                font-size: 26px;
              }
            }
            img{
              height: 121px;
              width: 121px;
            }
          }
        }
        .shareWeixin_inner_bom{
          height: calc(100% - 225px);
          width: 100%;
          background: white;
          span{
            letter-spacing: 5px;
            color:#575757;
            font-size: 28px;/*px*/
            line-height: 120px;
          }
        }

      }
    }
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
      margin: 0 40px;
      position: relative;
      height: 300px;
      display: flex;
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
        text-align: left;
        flex: 1;
        img{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          // border-radius: 50
          height: 80px;
          width: 80px;
        }
      }
      .middle{
        text-align: left;
        border-bottom: 1px solid #e2e2e1;/*no*/
        flex: 1;
        .middle_top{
          transform: translateY(-50%);
          position:absolute;
          top: calc(50% - 20px);
          font-size: 37px;
          font-weight: 500;
          color: #000;
        }
        .middle_bottom{
          transform: translateY(-50%);
          position:absolute;
          top: calc(50% + 30px);
          font-size: 30px;
          font-weight: 500;
          color: #000;
        }
      }
      .right{
        border-bottom: 1px solid #e2e2e1;/*no*/
        flex: 4;
        button{
          font-size: 28px;/*px*/
          color: white;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 70px;
          width: 151px;
          border-radius: 10px;
        }
        .class-a{
          background: #b5b9bc;
        }
        .class-b{
          background: #fdd401;
        }
      }
    }
  }
</style>
