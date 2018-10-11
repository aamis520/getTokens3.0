<!--  -->
<template>
  <div class="chartHomeContainer">
    <tar-header :isSowBooks='true' :isSowBack='false' :isSowBackHome='false' :title="title" :addIcon="addIcon" @isShowAddClick="isShowAddClick($event)"></tar-header>
    <div class="chart_head">
      <router-link :class="isBgClass? 'classYes':'classNo' "  :to="{ path: 'chartSingle' }">好友</router-link>
      <router-link :class="isBgClass? 'classNo':'classYes' "  :to="{ path: 'chartGroup' }">群</router-link>
    </div>
    <transition
      :duration="300"
      mode='out-in'
      name="bounce"
      :enter-active-class="bounceInName"
      :leave-active-class="bounceOutName"
    >
      <router-view></router-view>
    </transition>
    <!-- 下边是添加好友弹出框 -->
    <div @click.self="closeShowAddClick($event)" class="addpoupDivContainer" v-if="isShowAddPoup">
      <div class="sanjiao"></div>
      <div class="chatPoup">
        <div class="innerAdd" @click="addFriend(item)" v-for="(item,index) in addForm" :key="index" >
          <i class="iconfont addCommicon" v-if="index == 0">&#xe6b8;</i>
          <i class="iconfont addCommicon" v-if="index == 1">&#xe6b7;</i>
          <span class="commSpan">{{item.title}}</span>
        </div>
      </div>
      <!-- <div class="addpoupDiv" v-if="false">
        <div class="innerAdd" @click="addFriend(item)" v-for="(item,index) in addForm" :key="index" >
          <i class="iconfont addCommicon" v-if="index == 0">&#xe6b8;</i>
          <i class="iconfont addCommicon" v-if="index == 1">&#xe6b7;</i>
          <span>{{item.title}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header"
export default {
  data () {
    return {
      bounceInName: 'bounceInLeft',
      bounceOutName: 'bounceOutRight',
      addForm:[
        {title: '添加好友/群'},
        {title: '创建群聊'}
      ],
      isShowAddPoup: false,
      isBgClass: true,
      title: '聊点',
      addIcon: true,
    };
  },
  watch:{
    $route(to,from){
      if(to.path == '/chartHome/chartSingle'){
        this.bounceInName =  'bounceInRight',
        this.bounceOutName =  'bounceOutLeft',
        this.isBgClass = true
        return
      }
      if(to.path == '/chartHome/chartGroup'){
        this.bounceInName =  'bounceInLeft',
        this.bounceOutName =  'bounceOutRight',
        this.isBgClass = false
        return
      }
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},

  mounted(){
    if(this.$route.meta.title == '群聊'){
      this.bounceInName =  'bounceInLeft',
      this.bounceOutName =  'bounceOutRight',
      this.isBgClass = false
    }
  },

  methods: {
    // 点击添加好友
    addFriend(data){
      if(data.title == '添加好友/群'){
        this.$router.push({
          path: '/addFriend'
        })
      } else if(data.title == '创建群聊'){
        this.$router.push({
          path: '/creatGroupChart'
        })
      }
    },
    isShowAddClick(data){

      console.log(data)
      this.isShowAddPoup = data
    },
    closeShowAddClick(e){
      this.isShowAddPoup = false
    },
  }
}

</script>
<style lang='scss' scoped>
  .chartHomeContainer{
    position: relative;
    height: 100%;
    // background: goldenrod;
    .chart_head{
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 80px;/*px*/
      display: flex;
      justify-content: space-around;
      height: 80px;/*px*/
      a{
        font-size: 32px;/*px*/
        height: 100%;
      }
      .active{
        color:#6698FF !important;
      }
      .classYes{
        font-size: 28px;/*px*/
        color: #939393;
        width: 200px;
        border-bottom: 3px solid #6698FF;/*no*/
      }
      .classNo{
        font-size: 28px;/*px*/
        color: #939393;
        width: 200px;
        border-bottom: none;
      }
    }
    .addpoupDivContainer{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background: rgba(0,0,0,.3);
      .chatPoup{
        position: absolute;
        right: 20px;
        top: 120px;
        height: 220px;
        width: 280px;
        background: #5F646E;
        border-radius: 10px;
        .innerAdd{
          text-align: left;
          margin: 0 10px;
          line-height: 110px;
          font-size: 28px;/*px*/
          height: 110px;
          border-bottom: 1px solid gray;/*no*/
          .commSpan{
            margin-left: 20px;
            color: white;
            font-size: 28px;/*px*/
          }
          .addCommicon{
            color: white;
            float: left;
            margin-left:20px;
          }
        }
        .innerAdd:last-child{
          border-bottom: none;
        }
      }
      .sanjiao{
        position: absolute;
        right: 50px;
        top: 100px;
        width:20px;
        height:20px;
        overflow:hidden;
        border-width:10px;
        border-color:transparent transparent #5F646E transparent;
        border-style:dashed dashed solid dashed;
      }
      .addpoupDiv{
        position: absolute;
        top: 105px;
        right: 25px;
        border-radius:0 0 10px 10px;
        height: 250px;
        width: 200px;
        background: white;
        .innerAdd{
          margin: 0 10px;
          line-height: 80px;
          font-size: 20px;/*px*/
          height: 80px;
          border-bottom: 1px solid gray;
          .addCommicon{
            float: left;
            margin-left:20px;
          }
        }
      }
    }
  }

</style>
