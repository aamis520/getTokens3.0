<!--  -->
<template>
  <div class="adverDetail">
    <tar-header :title="title"></tar-header>
    <div class="outer_body" ref="outer_body">
      <div>
        <div class="adver_contain">
          <div class="adver_contain_pic">
            <div class="adver_contain_pic_head">
              <img :src="getBackData.imgUrl" alt="图片">
            </div>
            <div class="adver_contain_pic_foot">
              <div class="pic_foot_left">
                <img :src="getBackData.ad_auther_avatar" alt="avater">
              </div>
              <div class="pic_foot_middle">
                <div class="spanContain">
                  <span class="pic_foot_middle_top">{{getBackData.ad_auther}}</span> <br>
                  <span class="pic_foot_middle_bom">{{getBackData.ad_name}}</span>
                </div>
              </div>
              <div class="pic_foot_right">
                <button @click="goInShare">我要挖宝</button>
              </div>
            </div>
          </div>
        </div>
        <div class="adver_body">
          <div v-html="getBackData.ad_info">
          </div>
        </div>
        <div class="adver_foot">
          <p>
            <button @click="goInShare">我要挖宝</button>
          </p>
          <p class="adver_foot_share">
            <span>分享此广告即可获得{{getBackData.ballcoin_name}}</span>
          </p>
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
// window.share = function() {
//   // alert('test')
//   var obj = {}
//   // obj.id = window.location.href.split('?')[1].split('=')[1]
//   obj.id = '22'
//   api.getAdverSucc(obj, window.config)
//     .then(res => {

//     })
//     .catch(() => {

//     })
// }
import BScroll from 'better-scroll'
import header from "../../pages/comm/header";
import {api} from '@/static/api';
import wx from 'weixin-js-sdk';
// import store from '@/store/store'
export default {
  data () {
    return {
      appintance: '',
      isShowWeixin: false,
      isShow: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      shareData: '',
      getBackData: '',
      title: '广告详情'
    }
  },
  components: {
    tarHeader: header
  },
  computed: {},
  mounted() {
    this.getPort()
  },
  beforeRouteEnter(to,from,next){
    // var str = store.state.adverDeatilId
    // console.log(str)
    // console.log(this)
    /*
    * 判断如果是微信内置浏览器话window.assign
    */
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin && to.path !== location.pathname) {
       if(process.env.NODE_ENV === 'development'){
          location.assign('http://vue.dev.zhuandian.net/adverDetail/' + to.params.id )
        }else if(process.env.NODE_ENV === 'testing'){
          location.assign('http://vue.dev.zhuandian.net/adverDetail/' + to.params.id)
        }else if(process.env.NODE_ENV === 'production'){
          location.assign('https://ft.zhuandian.net/adverDetail/' + to.params.id)
          // location.assign('http://vue.dev.zhuandian.net/adverDetail/' + to.params.id)
        }
    }else{
      next()
    }
  },
  methods: {
    // 点击分分享-配置 分享api
    shareWeixin(flag){
      var _this = this
      _this.callAndroid(flag)
      // setTimeout(function(){
      //   document.addEventListener("deviceready", function() {
      //     appintance =  new(_this.callAndroid(flag))
      //   }, true)
      // },500)
    },
    // 调用cordova打包api
    callAndroid(flag){
      var _this = this
      var msg = JSON.stringify(_this.getBackData)
      if (msg == '') {
          return false;
      }
      var isIos = _this.androidOrIosSys()
      // this.shareVisible = false
      // this.isShowWeixin = false

      // if(this.cordova.deviceready){
      let title = _this.getBackData.adver_in.title
      let desc = _this.getBackData.adver_in.vice_title
      let imgUrl = (_this.getBackData.adver_in.logo)
      let url = (_this.getBackData.adver_in.link)
      if (flag == 'qq') {

      }
        switch(flag) {
          case 'qq':
            let args = {}
            args.client = QQSDK.ClientType.QQ // QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            args.scene = QQSDK.Scene.QQ // QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            args.title = title
            args.description = desc
            args.image = decodeURIComponent(imgUrl)
            args.url = decodeURIComponent(url)
            console.log(args)
            QQSDK.shareNews( ()=> {
              // this.shareVisible = false
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
              // this.shareVisible = false
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
              // this.shareVisible = false
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
              // this.shareVisible = false
              _this.isShowWeixin = false
              console.log('分享成功');
            }, function(reason) {
              console.log("Failed: " + reason);
            })
        }
        // _this.$router.push('/Advertisement')
    },
    // 点击弹窗关闭事件
    closePoup(){
      this.isShowWeixin = false
    },
    wxInit(res) {
      var _this = this
      let links = res.adver_in.link
      let title = res.adver_in.title
      let desc = res.adver_in.vice_title
      let imgUrl = res.adver_in.logo
      wx.config({
        debug: false,
        appId: res.wxShare.appId,
        timestamp: res.wxShare.timestamp,
        nonceStr: res.wxShare.nonceStr,
        signature: decodeURIComponent(res.wxShare.signature),
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
    _initScroll:function () {
      this.meunScroll = new BScroll(this.$refs.outer_body, {
        click: true,
        scrollY:true,
        momentum: true, // 开启滑动惯性
        bounceTime: 400 // 回弹时间
      })
    },
    // 我要挖宝-进行分享
    goInShare(flag){
      var _this = this
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if(isWeixin) {
        this.isShow = true
        // this.wxInit(this.getBackData)
      } else {
        // document.addEventListener("deviceready", function() {
        //   appintance =  new(_this.callAndroid(flag))
        // }, true);
        this.isShowWeixin = true
        // this.callAndroid(this.shareData)
      }
      // this.$router.push({
      //   path: '/adverShare',
      //   query: {
      //     id: this.$route.query.id
      //   }
      // })
    },
    getPort() {
      var _this = this
      // var url = location.pathname; //获取url中"?"符后的字串
      // var id = ''
      // if (url.indexOf("/") != -1) {
      //     // var str = url.substr()
      //     var strs = url.split("/")
      //     id = strs[strs.length-1]
      // }
      // console.log(id)
      var obj = {}
      obj.aid = _this.$route.params.id
      api.getAdvermentDetail(obj, _this.ApiConf)
      .then(res => {
        res.data.images.forEach(ele => {
          if (ele.images_type == '1') {
            res.data.imgUrl = ele.image_url
          }
        })
        _this.getBackData = res.data
        _this.wxInit(_this.getBackData)
        _this.shareData = res.data.adver_in
        setTimeout(function() {
          _this.$nextTick(() => {
            _this._initScroll()
          })
        },1000)
        document.addEventListener("deviceready", function() {
          _this.appintance =  new(_this.callAndroid())
        }, true)
      })
      .catch(() => {

      })
    },
    // 安卓ios进行交互==============
    //  callAndroid(data){
    //   var msg = JSON.stringify(data)
    //   if (msg == '') {
    //       return false;
    //   }
    //   var isIos = this.androidOrIosSys()
    //   if (isIos) {
    //       iosShare(msg)
    //   }else {
    //     main.mainShare(msg)
    //     // share.androidShare(msg)
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
  .adverDetail{
    height: 100%;
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
    .outer_body{
      height: calc(100% - 95px);
      overflow: hidden;
    }
  }
  .footer{
    display: none;
  }
  .adver_foot{
    margin-top: 50px;
    width: 100%;
    /* position: fixed; */
    /* bottom: 100px; */
  }
  .adver_contain_pic{
    position: relative;
    /* background: gray; */
    width: 100%;
    height:774px;
    /* border-bottom: 1px solid red; */
  }
  .adver_body{
    // overflow: scroll;
    padding: 20px;
    /* margin-top: 20px; */
    text-align: left;
    line-height: 50px;
    letter-spacing:3px;
    /deep/ img{
      max-width: 100% !important;
    }
  }
  .adver_body span{
    display: inline-block;
    font-size: 31.64px;/*px*/
    color:#7b7b7f;
  }
  .adver_contain_pic_head{
    // height: calc(100% - 156px);
    height: 100%;
    border-radius: 20px 20px 0 0;
    width: 100%;
    /* border:1px solid red; */
  }
  .adver_contain_pic_head img{
    // border-radius: 20px 20px 0 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .adver_contain_pic_foot{
    // background: #1c2235;
    /* background: green; */
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    height:156px;
  }
  .pic_foot_left{
    position: relative;
    flex: 1;
  }
  .pic_foot_left img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 100px;
    width: 100px;
    border-radius: 10px;
  }
  .pic_foot_middle{
    position: relative;
    flex: 3;
  }
  .pic_foot_middle .spanContain{
    text-align: left;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pic_foot_middle .pic_foot_middle_top{
    font-size: 30px;
    color: white;
    font-weight: bold;
  }
  .pic_foot_middle .pic_foot_middle_bom{
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
  .pic_foot_right{
    position: relative;
    margin-right: 20px;
    flex: 1;
  }
  .pic_foot_right button{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-right: 10px;
    font-weight: bold;
    border-radius: 40px;
    background: #fdd402;;
    height:62px;
    font-size: 26px;/*px*/
    text-align: center;
    color: white;
    width: 160px;
  }
  .adver_foot button{
    font-weight: bold;
    border-radius: 40px;
    background: #fdd402;;
    height:80px;
    font-size: 28px;/*px*/
    text-align: center;
    color: white;
    width: 210px;
  }
  .adver_foot_share{
    font-size: 24px;/*px*/
    color: #b3b3b3;
    margin-top:20px;
  }
</style>
