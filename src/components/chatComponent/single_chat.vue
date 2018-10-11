<template>
  <section class="chat">
    <tar-header :isSowBack='true' :title="title" :getMore="true"></tar-header>
    <!-- <div class="chatheader">
      <div class="seller_img" @click="$router.go(-1)">

      </div>
      <div class="seller_info">
        xxxx
      </div>
    </div> -->
    <div class="chatlist" ref="chatList_box">
      <!-- 这里有 系统信息 好友 我三种 类型的消息 -->
      <div class="box" ref="chatList">
        <div class="content" v-for="(item, index) in chatList" :key="index" v-show="userId != ''">
          <div class="system_msg" v-if="item.chatType == 0">
            <p class="tip_time">{{item.createTime | timeFilter}}</p>
            <p class="tip_info">{{item.chatContent}}</p>
          </div>
          <div v-else>
            <!-- 好友发的消息 -->
            <div class="seller_msg" v-if="item.sendUid != userId">
              <div class="user_img">
                <span v-if="item.receiveName">{{item.receiveName[0]}}</span>
                <span v-else>O</span>
              </div>
              <div class="user_msg">
                <span>{{item.chatContent}}</span>
              </div>
            </div>
            <!-- 我发的消息 -->
            <div class="buyer_msg" v-if="item.sendUid == userId">
              <div class="user_msg">
                <span>{{item.chatContent}}</span>
              </div>
              <div class="user_img">我</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatfoot">
      <div>
        <input class="sendMsg" v-model="msg" @keyup.enter="sendChatMsg" placeholder="" type="text">
      </div>
    </div>
  </section>
</template>
<script>
import header from "../../pages/comm/header"
// import { api } from '@/static/apiJava'
// import { dateFtt } from '@/static/common'
import BScroll from 'better-scroll'
export default {
  props: {
    from: {
      type: String,
      default: 'order'
    },
    // 控制聊天框是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    orderId: {
      type: String,
      default: ''
    },
    // 包含当前订单的信息 读取聊天记录和发送聊天信息都需要订单ID *
    orderInfo: {
      type: Object,
    },
    // 卖家信息 头像名称 *
    sellerInfo: {
      type: Object,
    },
    // 买家信息 头像名称 *
    buyerInfo: {
      type: Object,
    },
    // 系统发送的消息  *
    sysInfo: {
      type: Object,
    },
    // 用于判断是否新增了系统消息，如果发生变化，则从sysInfo里面读取数据，添加到聊天框中 *
    sysNum: {
      type: Number,
      default: 0
    }
  },
  filters: {
    // timeFilter(val){
    //   return dateFtt(val)
    // }
  },
  data () {
    return {
      title: '小妖精',
      chatList: [{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      },{
        type: 1,
        chatContent: '',
        sendUid: '1',
        receiveName: 'zzz'
      }],
      userName: '',
      userId: '1',
      msg: '',
      lastMsgTime: 0,  // 最后一条消息的ID
      searchChatRecordTimer: null,
    }
  },
  components: {
    tarHeader: header
  },
  created () {
  },
  watch: {
    // 监听是否有系统消息
  },
  mounted () {
    let wrapper = document.querySelector('.chatlist')
    let scroll = new BScroll(wrapper)
    let _this = this
    console.log(_this.$refs.chatList_box.clientHeight)
    scroll.scrollTo(_this.$refs.chatList.offsetLeft, -_this.$refs.chatList.offsetHeight + _this.$refs.chatList_box.clientHeight -200)
    // _this.$refs.chatList_box.scrollTo(_this.$refs.chatList.offsetLeft,  _this.$refs.chatList.offsetHeight)
    // 读取聊天记录
    // this.getChatRecord()
    // this.serchChatRecordEveryFiveSecods()
  },
  methods: {
    // 0.5秒查询一次聊天未读信息
    serchChatRecordEveryFiveSecods(){
      this.searchChatRecordTimer = null
      const searchChatRecordTimer = setInterval(() => {
        this.getNoReadMsg()
      },1000)
      this.$once('hook:beforeDestroy', () => {
          clearInterval(searchChatRecordTimer);
      })
    },
    getChatRecord() {
      // 读取聊天记录
      let data = {}
      // console.log(this.orderId)
      data.orderId = this.orderId
      data.userId = JSON.parse(localStorage.getItem('userInfo')).id
      api.getAllChatRecordByOrderId(data).then(res => {
       if(res.data){
         if(res.data.length){
           this.chatList = res.data

           this.lastMsgTime = this.chatList[this.chatList.length -1].createTime
           let _this = this
           _this.$nextTick(()=> {
             setTimeout(() => {
             _this.$refs.chatList_box.scrollTo(_this.$refs.chatList.offsetLeft,  _this.$refs.chatList.offsetHeight)
             },500)
           })
         }
       }
      })
    },
    sendChatMsg () {
      // console.log(this.msg)
      // 发送消息
      if(this.msg == '') return
      let data = {}
      data.chatContent = this.msg
      data.orderId = this.orderId
      data.sendUid = JSON.parse(localStorage.getItem('userInfo')).id
      data.chatType = '1'
      this.msg = ''
      api.addChat(data).then(res => {
        // console.log(this.$refs.chatList.offsetHeight)
        if(res.statusCode == 200){
          // this.getNoReadMsg()

        }
      })

    },
    getNoReadMsg () {
      // 读取未读消息
      this.searchChatRecordTimer = null
      let data = {}
      data.orderId = this.orderId
      data.userId = JSON.parse(localStorage.getItem('userInfo')).id
      if(this.chatList.length){
        this.lastMsgTime = this.chatList[this.chatList.length -1].createTime
      }
      data.createTime = this.lastMsgTime
      api.getUreadChatRecord(data).then(res => {
        if(res.statusCode == 200){
          if(res.data){
            if(res.data.length){
              let newData = res.data
              let ifSysHave = false
              newData.forEach(item => {
                this.chatList.push(item)
                if(item.chatType == '0'){
                  ifSysHave = true
                }
              })
              let _this = this
              if(ifSysHave){
                _this.$emit('orderInfoChange')
              }
              this.$nextTick(()=> {
                _this.$refs.chatList_box.scrollTo(_this.$refs.chatList.offsetLeft,  _this.$refs.chatList.offsetHeight - 60)
              })
            }

          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chat{
  width: 100%;
  height: 100%;
  background: #fff;
  // border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 2px #fff;
  position: relative;
}
.chatheader{
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-bottom: 4px solid #ddd;
  margin-bottom: 40px;
  z-index: 2;
  .seller_img{
    width: 80px;
    height: 80px;
    font-size: 40px;
    line-height: 80px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    background: #008000;
    border-radius: 80px;
    margin: 60px 60px 40px 60px;
  }
  .seller_info{
    flex: 1;
    align-items: center;
    .seller_name{
      font-size: 40px;
      line-height: 68px;
      font-weight: bold;
      color: #333;
    }
    .seller_list{
      font-size: 28px;
      line-height: 40px;
      color: #999;
    }
  }
}
.chatlist{
  width: 100%;
  height: 100%;
  padding-top: 220px;
  padding-bottom: 100px;
  box-sizing: border-box;
  overflow: scroll;
  z-index: 1;
  overflow-scrolling: touch;
  @-moz-document url-prefix() {
    .box{
      padding-bottom: 100px;
    }
  }
  .content {
    .system_msg{
      padding: 40px 60px;
    }
    .system_msg{
      text-align: center;
      .tip_time{
        font-size: 24px;
        color: #999;
        line-height: 36px;

      }
      .tip_info{
        font-size: 28px;
        color: #666;
        line-height: 40px;
      }
    }
    .seller_msg, .buyer_msg{
      display: flex;
      align-items: center;
      margin: 0 60px;
      margin-bottom: 40px;
      .user_img{
        width: 80px;
        height: 80px;
        background: #008000;
        border-radius: 80px;
        margin-right: 30px;
      }
      .user_msg{
        flex: 1;
        span{
          display: inline-block;
          padding: 20px 40px;
          background: #ccc;
          border-radius: 12px;
          text-align: left;
          max-width: 460px;
          word-break: break-word;
        }
      }
    }
    .seller_msg{
      text-align: left;
      .user_img {
        font-size: 40px;
        line-height: 80px;
        font-weight: bold;
        text-align: center;
        color: #fff;
      }

    }
    .buyer_msg{
      .user_img{
        margin-right: 0;
        margin-left: 30px;
        font-size: 40px;
        line-height: 80px;
        font-weight: bold;
        text-align: center;
        color: #fff;
      }
      text-align: right;
    }

  }
}
.chatfoot{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  div{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 4px solid #ccc;
    .sendMsg{
      outline: none;
      -webkit-appearance: none;
      border-radius: 0;
      border: none;
      background: none;
      height: 100px;
      line-height: 100px;
      width: 100%;
      padding: 0 20px;
      font-size: 32px;
      color: #333;
    }
  }

}
</style>
