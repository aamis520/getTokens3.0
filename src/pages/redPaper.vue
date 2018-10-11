<!--  -->
<template>
  <div class="redPaper">
    <tar-header :bgColor="bgColor" :spanColor="spanColor" :newiconredPaperBack="newiconredPaperBack" :title="title" :fileIcon="fileIcon"></tar-header>
    <div class="redPaper_container">
      <div class="selectBean" @click="openSheet()">
        <span class="commSpan" style="float:left;">请选择糖果币种</span>
        <span class="commSpan beanClassify" style="float:right;">{{beanClassify}}</span>
        <!-- <span class="commSpan beanClassify" style="float:right;"></span> -->
        <span class="sanjiao">
          <i :class="upOrDown ? 'up' : 'down'"></i>
        </span>
      </div>
      <div class="selectDom" ref="selectDom">
        <div class="selectDomSingle" @click="selectBeanClick(item)" v-for="(item,index) in actions" :key="index">
          <div class="selectDomSingle_left">
            <span>{{item.symbol}}</span>
            <!-- <span>{{item.coin_name}}</span> -->
          </div>
          <div class="selectDomSingle_right">
            <!-- <span>可用：{{item.asset_count}}</span> -->
            <span>可用：{{item.available}}</span>
          </div>
        </div>
      </div>
      <div class="redPaper_money">
        <img style="float:left;" src="../assets/redPaper/拼手气@2x.png.png" alt="拼手气">
        <span class="commSpan money_num" style="float:left">红包金额:</span>
        <input type="number" @focus="closeSteet" @keyup="num(form.balence)" class="inputMoney inputComm" placeholder="请输入红包金额" v-model="form.balence">
        <span style="float:right;" class="commSpan">{{beanClassify}}</span>
        <!-- <span style="float:right;" class="commSpan"></span> -->
      </div>
      <div class="redPaper_num">
        <span class="commSpan" style="float:left;">红包个数:</span>
        <input type="number" @focus="closeSteet" max="100" @keyup="maxCount(form.packet_count)"  class="inputNum inputComm" v-model="form.packet_count" placeholder="请输入红包个数">
        <span style="float:right;" class="commSpan">个</span>
      </div>
      <div class="redPaper_remark">
        <textarea placeholder="拼手气,领糖果!" @focus="closeSteet"  v-model="form.title" style="height:100%;width:100%;border:none;" name="" cols="30" rows="10"></textarea>
        <!-- <input type="text"> -->
      </div>
      <div class="redPaper_btn">
        <button @click="goInPacket">塞进红包</button>
      </div>
    </div>
    <div class="savePayMoney" v-if="isShowPayMoney">
      <div class="savePayMoney_inner">
        <div class="savePayMoney_inner_title">
          <span>请确认支付</span>
          <div class="savePayMoney_inner_close" @click="closeWinner">
            <img src="../assets/redPaper/弹窗关闭@2x.png.png" alt="关闭">
          </div>
        </div>
        <div class="savePayMoney_inner_content">
          <p class="classify">{{beanClassify}}</p>
          <p class="number">{{form.balence}}</p>
        </div>
        <div class="savePayMoney_inner_btn">
          <button @click="savePay">确认支付</button>
        </div>
      </div>
    </div>
    <div class="redIcon" v-show="isShowIcon">
      <div @click="closeRedIcon" class="redIcon_inner">
        <img src="../assets/redPaper/关闭@2x.png.png" alt="关闭icon">
      </div>
      <div class="redIcon_share">
        <button @click="shareClick">
          <span>分享</span>
          <img src="../assets/redPaper/分享@2x.png.png" alt="分享">
        </button>
      </div>
    </div>
    <!-- 微信分享弹窗 -->
    <div class="shareWeixin" v-show="isShowWeixin">
      <div class="shareWeixin_inner">
        <div class="shareWeixin_inner_top">
          <div class="picOne comm" @click="shareWeixin('friendChat')">
            <div class="innerWraper">
              <img src="../assets/redPaper/weixin.png" alt="weixin"> <br>
              <span class="shareTitle">朋友圈</span>
            </div>
          </div>
          <!-- 微信 -->
          <div class="picTwo comm" @click="shareWeixin('wechat')">
            <div class="innerWraper">
              <img src="../assets/redPaper/weixin@2x.png" alt="pengyouquan"><br>
              <span class="shareTitle">微信</span>
            </div>
          </div>
          <div class="picThe comm" @click="shareWeixin('qq')">
            <div class="innerWraper">
              <img src="../assets/redPaper/pp@2x.png" alt="qq"><br>
              <span class="shareTitle">QQ</span>
            </div>
          </div>
          <div class="picFor comm" @click="shareWeixin('qqZone')">
            <div class="innerWraper">
              <img src="../assets/redPaper/qqkongjian@2x.png" alt="qqZone"><br>
              <span class="shareTitle">QQ空间</span>
            </div>
          </div>
        </div>
        <div @click="closePoup" class="shareWeixin_inner_bom">
          <span>取消</span>
        </div>
      </div>
    </div>
    <!-- 下边是转点好友分享弹窗 -->
    <div class="saveShareHint" v-show="isShowSaveShare">
      <div class="saveShareHint_inner">
        <p class="title">提示</p>
        <p class="content">
          <span>你的好友都可以在首页看到哦</span>
        </p>
        <p @click="saveShare" class="save">
          <span>确定</span>
        </p>
      </div>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!-- 下边是分享弹窗 -->
    <mt-popup
      v-model="shareVisible"
      class="codePop"
      position="bottom">
      <div class="codePop_top">
        <div class="codePop_top_left comm">
          <img @click="shareInner" src="../assets/change/morenHeadPic.png" alt="转点">
          <span>转点好友</span>
        </div>
        <div class="codePop_top_right comm">
          <img @click="openShareDlsg" src="../assets/redPaper/dain.png" alt="微信">
          <span>更多</span>
        </div>
      </div>
      <div class="codePop_bottom" @click="popCancel">
        <span>取消</span>
      </div>
    </mt-popup>
    <!-- 下边是微信-qq 空间 朋友圈 分享弹窗 -->
    <mt-popup
      v-model="fourSharePoup"
      class="codePop"
      position="bottom">
      <div class="codePop_top">
        <div class="codePop_top_left comm">
          <img @click="shareInner" src="../assets/change/morenHeadPic.png" alt="转点">
          <span>转点好友</span>
        </div>
        <div class="codePop_top_right comm">
          <img @click="openShareDlsg" src="../assets/redPaper/dain.png" alt="微信">
          <span>更多</span>
        </div>
      </div>
      <div class="codePop_bottom" @click="popCancel">
        <span>取消</span>
      </div>
    </mt-popup>
    <div class="goBrowser" v-if="isShow">
      <div class="guide">
        <img src="../assets/download/browser.png" alt="icon">
        <p>点此分享</p>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Popup, Toast } from "mint-ui";
import header from "../pages/comm/header";
import {api} from '@/static/api'
import wx from 'weixin-js-sdk';
import Vue from 'vue'
export default {
  data() {
    return {
      spanColor: '#494949',
      bgColor: '#F2F2F2',
      fourSharePoup: false, // 微信分享弹窗
      cordova: Vue.cordova,
      payStatus: true,
      isShow: false,
      getBackWeixinData: {},
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      // cointype，balence，packet_count，title
      form: {
        cointype: '',
        balence: '',
        packet_count: '',
        title: ''
      },
      selectbeanTotal: '',
      getShareInfo: '',
      isShowWeixin: false,
      isShowSaveShare: false,
      fileIcon: true,
      newiconredPaperBack: true,
      backUrl: '/consumer',
      shareVisible: false,
      isShowIcon: false,
      isShowPayMoney: false,
      upOrDown: false, // 点击选择的图片方向
      beanClassify: "",
      sheetVisible: false,
      title: "发红包",
      actions: [
        {
          name: "UTCT",
          method: this.gateIo
        },
        {
          name: "火币",
          method: this.gateIo
        },
        {
          name: "Fcoin",
          method: this.gateIo
        }
      ]
    };
  },
  components: {
    tarHeader: header
  },
  computed: {},
  mounted() {
    this.isDeepBar()
    this.checkBean()
  },
  watch:{
  },
  beforeRouteEnter(to,from,next){
    /*
    * 判断如果是微信内置浏览器话window.assign
    */
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin && to.path !== location.pathname) {
       if(process.env.NODE_ENV === 'development'){
          location.assign('http://vue.dev.zhuandian.net/redPaper')
        }else if(process.env.NODE_ENV === 'testing'){
          location.assign('http://vue.dev.zhuandian.net/redPaper')
        }else{
          location.assign('https://ft.zhuandian.net/redPaper')
          // location.assign('http://vue.dev.zhuandian.net/redPaper')
        }
    }else{
      next()
    }
  },
  methods: {
    // 点击弹窗关闭事件
    closePoup(){
      this.isShowWeixin = false
    },
    reloadNow(){
      let flag = localStorage.getItem('reloadTime')
      if(!flag){
        localStorage.setItem('reloadTime', 'anything')
        window.open(location.href)
      }
    },
    wxInit(res) {
      var _this = this
      let links = res.link
      let title = res.title
      let desc = res.vice_title
      let imgUrl = res.logo
      wx.config({
        debug: false,
        appId: res.wxShare.appId,
        timestamp: res.wxShare.timestamp,
        nonceStr: res.wxShare.nonceStr,
        signature: encodeURIComponent(res.wxShare.signature),
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      });
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title,
          desc: desc,
          link: links,
          imgUrl: imgUrl,
          success: function() {
            _this.isShow = false
          },
          cancel: function() {
            _this.isShow = false
          }
        });
        //微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.isShow = false
          },
          cancel: function() {
            _this.isShow = false
          }
        });

        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.isShow = false
          },
          cancel: function() {
            _this.isShow = false
          }
        });
        wx.onMenuShareWeibo({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.isShow = false
          },
          cancel: function() {
            _this.isShow = false
          }
        });
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            _this.isShow = false
          },
          cancel: function() {
            _this.isShow = false
          }
        });

      });
      wx.error(function(err) {
        // alert(JSON.stringify(err))
      });
    },
    num(e){
      if (!e) {
        this.form.balence = ''
        return
      }
      // 判断小数点的数量
      let arr = e.split('.')
      if(arr.length > 2){
        this.form.balence = ''
        this.$toast({
          message: '红包最小金额为0.01',
          duration: 1000
        })
        return
      }

      if (!/^\d*\.?\d{0,2}$/.test(e)) {
        let num = Number(e).toFixed(3)
        let numTwo = num.substring(0, num.lastIndexOf('.') + 3)
        if(numTwo < 0.01 || numTwo == '0.00'){
          this.$toast({
            message: '红包最小金额为0.01',
            duration: 1000
          })
          numTwo = ''
        }
        this.form.balence = numTwo
      }
    },
    maxCount(e){
      if(!e) return
      let arr = String(e).split('.')
      if(arr.length > 1){
        this.form.balence = ''
        this.$toast({
          message: '红包最大数量100个',
          duration: 1000
        })
        return
      }
      if(e < 0) {
        this.$toast({
          message: '红包最大数量100个',
          duration: 1000
        })
        this.form.packet_count = ''
        return
      }
      if(e > 100) {
        this.$toast({
          message: '红包最大数量100个',
          duration: 1000
        })
        this.form.packet_count = ''
        return
      }
    },
    // 点击选择币种事件
    selectBeanClick(item){

      console.log(item)
      this.form.cointype = item.symbol
      this.beanClassify = item.symbol
      this.selectbeanTotal = item.available
      this.upOrDown = !this.upOrDown
      this.$refs.selectDom.style.height = 0 + 'px'
    },
    closeSteet(){
      this.upOrDown = !this.upOrDown
      this.$refs.selectDom.style.height = 0 + 'px'
    },
    // 判断是否支持沉浸式的导航
    isDeepBar(){
      var immersed = 0;
      var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
      if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
          immersed=parseFloat(ms[2]);// 获取状态栏的高度
          plus.webview.currentWebview().setStyle( {statusbar:{background:'#000'},top:0,bottom: 0} );
          // plus.navigator.setStatusBarStyle('red')
      }
      console.log(immersed)
      // var t=document.getElementById('header')
      // t.style.background = immersed + 'px'
    },
    callAndroid(flag){
      var _this = this
      var msg = JSON.stringify(_this.getShareInfo)
      if (msg == '') {
          return false;
      }
      var isIos = _this.androidOrIosSys()
      // this.shareVisible = false
      // this.isShowWeixin = false
      let title = _this.getShareInfo.title
      let desc = _this.getShareInfo.vice_title
      let imgUrl = (_this.getShareInfo.logo)
      let url = (_this.getShareInfo.link)
      // if(this.cordova.deviceready){
        switch(flag) {
          case 'qq':
            let args = {}
            args.client = QQSDK.ClientType.QQ // QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            args.scene = QQSDK.Scene.QQ // QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            args.title = title
            args.description = desc
            args.image = decodeURIComponent(imgUrl)
            args.url = decodeURIComponent(url)
            QQSDK.shareNews( ()=> {
              _this.shareVisible = false
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
            argsZone.image = decodeURIComponent(imgUrl)
            argsZone.url = decodeURIComponent(url)
            console.log(argsZone)
            QQSDK.shareNews(function() {
              _this.shareVisible = false
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
                thumb: decodeURIComponent(imgUrl),
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: decodeURIComponent(url)
                }
              },
              scene: Wechat.Scene.SESSION // share to Timeline
            }, function() {
              _this.shareVisible = false
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
                thumb: decodeURIComponent(imgUrl),
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: decodeURIComponent(url)
                }
              },
              scene: Wechat.Scene.TIMELINE // share to Timeline
            }, function() {
              _this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功');
            }, function(reason) {
              console.log("Failed: " + reason);
            })
        }
      // }
      // if (isIos) {
      //   iosShare(msg)
      // }else {
      //   share.androidShare(msg)
      // }
      this.$router.push('/consumer')
    },
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
    },
    // 获取微信授权信息
    // getWeixinInfo(){
    //   var _this = this
    //   api.giveRedPack({})
    //   .then(res => {
    //     _this.getBackWeixinData = res.data
    //     console.log(res)
    //   })
    // },
    //================================
    // 点击分享外部好友事件
    shareWeixin(flag){
      // this.$router.push({
      //   path: '/weixinShare',
      //   query: {
      //     rec: this.getShareInfo.rec
      //   }
      // })
      var _this = this
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua)
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        var _this = this
        _this.isShow = true
        _this.shareVisible = false
        var obj = {}
        obj.rel = _this.getShareInfo.rec
        obj.url = ''

        obj.url = ''
        let str = '?rel=' + obj.rel
        if(process.env.NODE_ENV === 'development'){
          obj.url = location.href
        }else if(process.env.NODE_ENV === 'testing'){
          obj.url = 'http://vue.dev.zhuandian.net/redPaper'
          // window.open('http://vue.dev.zhuandian.net/redPaper')
          // winndow.reload = 'http://vue.dev.zhuandian.net/redPaper'
        }else{
          obj.url = 'https://ft.zhuandian.net/redPaper'
          // window.open('https://ft.zhuandian.net/redPaper')
          // window.reload = 'https://ft.zhuandian.net/redPaper'
        }
        api.weixinShare(obj)
        .then(res => {
          if (res.error_code == 1000){
            _this.wxInit(res.data)
          }

        })
        // _this.$router.push({
        //   path: '/weixinShare',
        //   query: {
        //     rec:_this.getShareInfo.rec
        //   }
        // })
      } else {
        document.addEventListener("deviceready", function() {
          appintance =  new(_this.callAndroid(flag))
        }, true);

      }
      // this.callAndroid()
      // this.shareVisible = false
      // this.isShowWeixin = true
    },
    openShareDlsg(){
      this.shareVisible = false
      this.isShowWeixin = true
    },
    saveShare(){
      // 调接口
      this.innerFriendShare()
    },
    shareInner(){
      this.shareVisible = false
      this.isShowSaveShare = true
    },
    popCancel(){
      this.shareVisible = false
    },
    shareClick(){
      this.isShowIcon = false
      this.shareVisible = true
    },
    closeRedIcon(){
      this.isShowIcon = false
    },
    // 点击确认支付
    savePay(){
      if(this.payStatus){
        this.getPort()
      } else {
        Toast({
          message: '支付中...',
          duration: 1000
        })
      }
    },
    closeWinner(){
      this.isShowPayMoney = false
    },
    // 币种接口
    checkBean(){
      api.selectBean({}, this.ApiConf)
      .then(res => {
        res.data.forEach(ele => {
          ele.name = ele.coin_name
          ele.method = this.gateIo
        });
        this.actions = res.data
        this.form.cointype = this.actions[0].symbol
      })
      .catch(() => {


      })
    },

    // 内部好友
    innerFriendShare(){
      var obj = {}
      obj.rel = this.getShareInfo.rec
      api.innerShare(obj, this.ApiConf)
      .then(res => {
        if (res.error_code == '1000'){

          this.shareVisible = false
          this.isShowSaveShare = false
          this.$router.push(
            {
              path:'/consumer'
            }
          )
        }
        else {
          Toast({
            message: res.error_desc,
            duration: 1000
            // iconClass: 'mint-toast-icon mintui mintui-success'
          })
        }
      })
      .catch(() => {

      })
    },
    // 支付接口
    getPort(){
      this.payStatus = false
      api.giveRedPack(this.form, this.ApiConf)
      .then(res => {
        if (res.error_code == '1000') {
          this.getShareInfo = res.data // 保存接口返回信息
          this.payStatus = true
          // var ua = navigator.userAgent.toLowerCase();
          // console.log(ua)
          // var isWeixin = ua.indexOf('micromessenger') != -1;
          // if (isWeixin) {
          //   this.wxInit(res.data)
          // }
          this.shareVisible = true
          this.isShowPayMoney = false
        } else {
          Toast({
            message: res.error_desc,
            duration: 2000
          })
        }
      })
      .catch(() => {

      })
    },
    // 点击塞进红包事件
    goInPacket(){
      this.closeSteet()
      if (!this.beanClassify) {
         Toast(
          {
            message: '请选择币种', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          }
        )
        if (this.form.balence){
          this.form.balence = ''
        }
        if (this.form.packet_count){
          this.form.packet_count = ''
        }
        return
      }
      if (!this.form.balence) {
        Toast(
          {
            message: '请输入红包金额', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          }
        )
        return
      }
      if (Number(this.form.balence) > Number(this.selectbeanTotal)) {
         Toast(
          {
            message: '余额不足,请重新输入', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          }
        )
        this.form.balence = ''
        return
      }
      if (!this.form.packet_count){
        Toast(
          {
            message: '请输入红包数量', //提示内容分
            duration: 1000 //持续时间（毫秒），若为 -1 则不会自动关闭
          }
        )
        return
      }
      this.isShowPayMoney = true
    },
    gateIo(data){
      console.log(data)
      this.upOrDown = false
      this.beanClassify = data.name
      this.form.cointype = data.symbol
    },
    openSheet() {
      this.upOrDown = !this.upOrDown
      if (this.upOrDown) {
        // this.$refs.selectDom.style.height = 230 + 'px'
        this.$refs.selectDom.style.height = this.actions.length * 55 + 'px'
      } else  {
        this.$refs.selectDom.style.height = 0 + 'px'
      }
    }
    // ==========？

  }
};
</script>
<style lang="scss" scoped>
.redPaper {
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
  .codePop{
    width: 100%;
    .codePop_top{
      display: flex;
      height: 200px;
      background: #ededed;
      .comm{
        // width: 50%;
        // height: 50%;
        // float: left;
        position: relative;
        flex: 1;
        .shareTitle{
          position: absolute;
          bottom: 20px;
          font-size: 18px;/*px*/
          color: #808080;
          // display: inline-block;
          // margin-top: 20px;
        }
        span{
          display: inline-block;
          font-size: 26px;/*px*/
          color: #808080;
          display: block;
          position: absolute;
          bottom: 0;
          margin-bottom: 10px;
          transform: translateX(-50%);
          left: 50%;
        }
        // float: left;
        img{
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          // left: 0;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          height: 111px;
          width: 111px;
        }
      }
    }
    .codePop_bottom{
      line-height: 100px;
      height: 100px;
      background: white;
      text-align: center;
      span{
        letter-spacing: 10px;
        font-size: 30px;/*px*/
        color: #4d4d4d;
      }
    }
  }
}
.redPaper_container {
  background-size: cover;
  background-repeat: no-repeat;
  // background-size: cover;
  background-image: url('../assets/redPaper/红包背景@2x.png.png');
  // background: #f2f2f2;
  padding: 65px 38px 0;
  height: calc(100% - 95px);
  /* border: 1px solid red; */
  .selectDom{
    box-shadow: 0px 2px 2px gray;;
    padding: 0 46px;
    overflow: hidden;
    position: absolute;
    height: 0;
    transition: height .5s;
    -moz-transition: height .5s;	/* Firefox 4 */
    -webkit-transition: height .5s;	/* Safari 和 Chrome */
    -o-transition: height .5s;
    border-radius: 0 0 20px 20px;
    top: 265px;
    left: 38px;
    right: 38px;
    // width: 100px;
    z-index: 999;
    background: white;
    .selectDomSingle{
      height: 108px;
      display: flex;
      // background: red;
      border-bottom: 1px solid #eee;
      .selectDomSingle_left{
        font-weight: 600;
        color:#242424;
        line-height: 108px;
        font-size: 30px;/*px*/
        text-align: left;
        flex: 1;
      }
      .selectDomSingle_right{
        margin-right: 20px;
        font-size: 24px;/*px*/
        line-height: 108px;
        color:#a1a1a1;
        text-align: right;
        flex: 1;
      }
    }
    // background: red;
  }
}
.redPaper_btn{
  margin-top: 70px;
  text-align: center;
  button{
    font-size: 30px;/*px*/
    color: white;
    border-radius: 15px;
    background: #ea5f29;
    height:95px;
    width: 100%;
  }
}
.redPaper_container .commSpan {
  // text-align: left;
  color: #242424;
  font-size: 30px; /*px*/
  font-weight: 600;
}
.beanClassify{
  margin-right:20px;
}
.redPaper_remark{
  border-radius: 15px;
  margin-top: 65px;
  background: white;
  line-height: 140px;
  height: 147.1px;
  textarea{
    border-radius:20px;
    color: #666;
    font-size: 26px;/*px*/
    border: none;
    padding: 30px;
    height: 100%;
    width: 100%;
  }
}
.redPaper_money,
.redPaper_num {
  background: white;
  position: relative;
  padding: 0 60px;
  border-radius: 15px;
  height: 112px;
  margin-top: 65px;
  line-height: 112px;
}
.redPaper_num{
  padding: 0 40px;
}
.selectBean{
  background: white;
  position: relative;
  padding: 0 40px;
  border-radius: 15px;
  height: 112px;
  line-height: 112px;
  margin-top: none;
}
.redPaper_money .money_num {
  display: inline-block;
  margin-left: 25px;
}
.redPaper_money img{
  height: 33px;
  width: 33px;
  border-radius: 5px;
  position: absolute;
  margin:0 40px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.inputNum {
  padding: 0 20px;
  border: none;
  width: calc(100% - 200px);
  font-size: 16px; /*no*/
  line-height: 60px;
  height: 60px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  top: 4px;
}
.inputMoney{
  padding: 0 20px;
  border: none;
  width: calc(100% - 250px);
  height: 60px;
  font-size: 16px; /*no*/
  line-height: 60px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  top: 4px;
}
.sanjiao {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  border-width: 0 16px 16px;
  border-style: solid;
  border-color: transparent transparent transparent;
}
.sanjiao i {
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  top: 6px;
  left: -10px;
}
.sanjiao i.down {
  border-width: 8px 8px 0;
  border-color: #000000 transparent transparent;
}
.sanjiao i.up {
  border-width: 0 8px 8px;
  border-color: transparent transparent #000000;
}
.redIcon{
  background: rgba(0,0,0,.9);
  background-size: (100%, 100%);
  background-position: (center,center);
  background-repeat: no-repeat;
  background-image:url('../assets/getPack/getRedPaper.png');
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .redIcon_share{
    // text-align: center;
    position: absolute;
    top: 1000px;
    left: 50%;
    transform: translateX(-220px);
    button{
      line-height: 70px;
      font-size: 26px;/*px*/
      letter-spacing: 10px;
      font-weight: bold;
      color: white;
      border-radius: 20px;
      width: 400px;
      height: 70px;
      background: #fdd401;
      img{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 30px;
        width: 30px;
      }
    }

  }
  .redIcon_inner{
    position: absolute;
    right: 120px;
    top: 320px;
    height: 50px;
    width: 50px;
    img{
      height: 100%;
      width: 100%;
    }
  }
}
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
.saveShareHint{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.3);
    .saveShareHint_inner{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius:20px;
      background: white;
      height: 329px;
      width: 638px;
      .title{
        margin-top: 50px;
        letter-spacing: 10px;
        font-weight: bold;
        font-size: 37px;/*px*/
        color: #1a1a1a;
      }
      .content{
        padding: 20px 0 65px 0;
        border-bottom: 1px solid #ccc;/*no*/
        font-weight: 600;
        letter-spacing: 3px;
        margin-top: 23px;
        font-size: 32px;/*px*/
        color: #1a1a1a;
      }
      .save{
        letter-spacing: 10px;
        text-align: center;
        margin-top: 20px;
        font-size: 33px;/*px*/
        color: #fdce07;
      }
      // margin: 0 auto
    }
  }
.savePayMoney{
  background: rgba(0,0,0,.3);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .savePayMoney_inner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 557px;
    width: 610px;
    background: white;
    border-radius: 20px;
    .savePayMoney_inner_btn{
      text-align: center;
      button{
        background: #fdd401;
        font-weight: bold;
        border-radius: 10px;
        color: white;
        font-size: 33px;
        width: 534px;
        height: 90px;
      }
    }
    .savePayMoney_inner_content{
      margin: 0 30px;
      // border-bottom: 2px  solid #eee;/*no*/
      height: 200px;
      .classify{
        font-weight: bold;
        margin-top: 100px;
        color: #000000;
        font-size: 30px;/*px*/
      }
      .number{
        margin-top:20px;
        font-weight: bold;
        font-size: 72px;/*px*/
        color: #000000;
      }
    }
    .savePayMoney_inner_title{
      position: relative;
      border-bottom: 2px  solid #eee;
      position: relative;
      font-size: 35px;/*px*/
      font-weight: 600;
      color: #000000;
      height: 108px;
      line-height: 108px;
      text-align: center;
    }
    .savePayMoney_inner_close{
      position: absolute;
      // float: right;
      // margin-right: 20px;
      width: 30px;
      height: 30px;
      top: 0px;
      right: 40px;
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
