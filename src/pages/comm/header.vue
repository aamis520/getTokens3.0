<!--  -->
<template>
  <div class="commHead" :style="{ background: bgColor}">
    <img @click="goBooks" v-if="isSowBooks" class="headerBackIcon" src="../../assets/groupIcon.png">
    <img @click="back" v-if="isSowBack" class="headerBackIcon" src="../../assets/goBack.png">
    <img @click="backHome" v-if="isSowBackHome" class="headerBackIcon" src="../../assets/goBack.png">
    <span class="title" :style="{color: spanColor}">{{title}}</span>
    <!-- <i class="iconfont headerFileIcon"  v-if="fileIcon" >&#xe63e;</i> -->
    <img @click="goRedPackRemark" class="headerFileIcon" v-if="fileIcon" src="../../assets/redPaper/file.png" alt="文件">
    <img @click="addAssets" class="headerFileIcon" v-if="addAsset" src="../../assets/wallet/add.png" alt="添加资产">
    <i @click="addIconFriendOrGroup" v-if="addIcon" class="addicon iconfont">&#xe649;</i>
    <i v-if="getMore" @click="goToGroupDetail" class="addicon iconfont">&#xe60e;</i>
    <i v-if="newiconredPaperBack" @click="redPapergoback()" class="iconfont redPaperBack">&#xe60f;</i>
    <span @click="saveSetGroupName('true')" v-if="showSaveSpan" class="rightSpan">完成</span>
  </div>
</template>

<script>
export default {
  props: {
    spanColor: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: '#6698FF'
    },
    title: {
      type: String,
      default: ''
    },
    isSowBooks: {
      type: Boolean,
      default: false
    },
    newiconredPaperBack: {
      type: Boolean,
      default: false
    },
    isSowBack: {
      type: Boolean,
      default: false
    },
    showSaveSpan: {
      type: Boolean,
      default: false
    },
    isSowBackHome: {
      type: Boolean,
      default: false
    },
    backUrl:{
      type: String,
      default: ''
    },
    fileIcon:{
      type: Boolean,
      default: false
    },
    addAsset: {
      type: Boolean,
      default: false
    },
    addIcon: {
      type: Boolean,
      default: false
    },
    getMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    redPapergoback(){
      this.$router.go(-1)
    },
    // 点击完成群聊名称设置
    saveSetGroupName(data){
      var titleName = this.$route.query.title
      var kickStatus = this.$route.query.kick
      if(titleName == '好友'){
        this.$emit('addGroupFriend')
      } else if(kickStatus){
        this.$emit('deleteGroup')
      } else {
        this.$emit("saveGroupName", data)
      }
    },
    goToGroupDetail(){
      this.$router.push({
        path: '/groupDetail'
      })
    },
    // 点击添加好友或加入群
    addIconFriendOrGroup(){
      this.$emit("isShowAddClick", true)
    },
    goRedPackRemark() {
      this.$router.push({
        path: '/redRemark'
      })
    },
    goBooks() {
      this.$router.push({
        path: '/addressBook/addressFriendBook'
      })
    },
    back(){
      if(this.backUrl){
        this.$router.push({
          path: this.backUrl
        })
      }else{
        this.$router.go(-1)
      }
    },
    backHome() {
      this.$router.push({
        path: "/chartHome/chartSingle"
      });
    },
    addAssets() {
      this.$router.push({
        path: "/assetsClassify"
      });
    },
  }
}

</script>
<style rel="stylesheet/scss" scoped>
  .commHead{
    position: relative;
    font-weight: bold;
    line-height: 95px;
    height: 95px;
    font-family:'微软雅黑';
    width:100%;
    text-align: center;
    font-size: 34px;/*px*/
    color: #fff;
  }

  .rightSpan{
    display: inline-block;
    position: absolute;
    right: 30px;
    color: white;
    line-height: 95px;
    font-size: 26px;/*px*/
  }
  .addicon{
    float: right;
    margin-right: 40px;
  }
  .redPaperBack{
    position: absolute;
    left: 38px;
    color: #494949;
    font-size: 45px;/*px*/
  }
  .title{
    line-height: 95px;
  }
  .headerBackIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
    height: 35px;
    width: 35px;
  }
  .headerFileIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    height: 39px;
    width: 32px;
  }
</style>
