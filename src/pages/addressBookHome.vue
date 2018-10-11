<!--  -->
<template>
  <div class="chartHomeContainer">
    <tar-header :isSowBooks='false' :isSowBack='false' :isSowBackHome='true' :title="title" :addIcon="addIcon" @isShowAddClick="isShowAddClick($event)"></tar-header>
    <div class="search">
        <mt-search v-model="searchValue" cancel-text="取消" placeholder="搜索好友/社群"></mt-search>
    </div>
    <div class="new_friend">
        <img src="../assets/newFriend.png">
        <span></span><h5>新朋友</h5>
        
    </div>
    <div class="chart_head">
      <router-link :class="isBgClass? 'classYes':'classNo' "  :to="{ path: 'addressFriendBook' }">好友通讯录</router-link>
      <router-link :class="isBgClass? 'classNo':'classYes' "  :to="{ path: 'addressGroupBook' }">群通讯录</router-link>
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
    <div @click.self="closeShowAddClick($event)" class="addpoupDivContainer" v-if="isShowAddPoup">
      <div class="addpoupDiv">
        <div class="innerAdd" @click="addFriend(item)" v-for="(item,index) in addForm" :key="index" >
          <i class="iconfont addCommicon" v-if="index == 0">&#xe6b8;</i>
          <i class="iconfont addCommicon" v-if="index == 1">&#xe6b7;</i>
          <i class="iconfont addCommicon" v-if="index == 2">&#xe6b8;</i>
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../pages/comm/header"
import { Search } from 'mint-ui';
export default {
  data () {
    return {
      searchValue: '',
      bounceInName: 'bounceInLeft',
      bounceOutName: 'bounceOutRight',
      addForm:[
        {title: '添加好友'},
        {title: '添加群聊'},
        {title: '创建群聊'}
      ],
      isShowAddPoup: false,
      isBgClass: true,
      title: '通讯录',
      addIcon: true,
    };
  },
  watch:{
    $route(to,from){
      console.log(to)
      if(to.path == '/addressBook/addressFriendBook'){
        this.bounceInName =  'bounceInRight',
        this.bounceOutName =  'bounceOutLeft',
        this.isBgClass = true
      }else{
        this.bounceInName =  'bounceInLeft',
        this.bounceOutName =  'bounceOutRight',
        this.isBgClass = false
      }
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},

  mounted(){},

  methods: {
    // 点击添加好友
    addFriend(data){
      if(data.title == '添加好友'){
        this.$router.push({
          path: '/addFriend'
        })
      } else if(data.title == '添加群聊'){
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
    .search{
        width: 100%;
        height: 104px;
        background: #f2f2f2;
        .mint-searchbar{
            margin-top: 10px;
        }
    }
    .new_friend{
        width: 680px;
        height: 80px;
        margin: 20px 35px;
        background: #ffffff;
        position: relative;
        img{
            width: 80px;
            height: 80px;
            margin-right: 24px;
            float: left;
        }
        span{
            position: absolute;
            left:70px;
            top: -10px;
            display: block;
            width: 20px;
            height: 20px;
            background: #f00;
            border-radius: 100%;
        }
        h5{
            float: left;
            height: 80px;
            line-height: 80px;
            font-size: 32px;
            color: #494949;
        }
    }
    .chart_head{
      position: relative;
      border-top: 20px solid #f2f2f2;
      border-bottom: 1px solid #e7e7e7;
      line-height: 80px;/*px*/
      display: flex;
      justify-content: space-around;
      height: 100px;
      a{
        font-size: 28px;/*px*/
        height: 100%;
        color: #939393;
      }
      .classYes{
        color: #4A90E2;
        border-bottom: 3px solid #4A90E2;
      }
      .classNo{
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
