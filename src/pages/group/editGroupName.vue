<!--  -->
<template>
  <div class="editgRoupName">
    <tar-header @saveGroupName="saveGroupName" :showSaveSpan="true" :isSowBack='true' :isSowBackHome='false' :title="title"></tar-header>
    <div class="editgRoupName_body">
      <input placeholder="请出入群聊名称" v-model="nameValue" type="text">
      <img @click="clearInputName" v-if="isShowImg" src="../../assets/group/删除输入内容.png" alt="img">
      <!-- <mt-search placeholder="请出入群聊名称" v-model="nameValue"></mt-search> -->
    </div>
  </div>
</template>

<script>
import { Search } from 'mint-ui';
import header from "../../pages/comm/header"
import { Toast } from "mint-ui";
export default {
  data () {
    return {
      isShowImg: false,
      nameValue:'',
      title: '编辑群聊名称'
    };
  },
  watch: {
    'nameValue': function(){
      if (this.nameValue) {
        this.isShowImg = true
      } else {
        this.isShowImg = false
      }
    }
  },
  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {},

  methods: {
    // 点击清除input
    clearInputName(){
      this.nameValue = ''
    },
    saveGroupName(data){
     if(!this.nameValue){
        Toast({
          message: '请输入群聊名称', //提示内容分
          duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
        })
      } else {
        this.$router.push({
          path: '/groupDetail',
          query: {
            name: this.nameValue
          }
        })
        console.log(this.nameValue)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .editgRoupName{
    height: 100%;
    background: #f6f7f8;
    .editgRoupName_body{
      position: relative;
      // padding-top: 30px;
      height: calc(100% - 95px);
      img{
        position: absolute;
        top:60px;
        right: 30px;
        width: 32px;
        height: 32px;
      }
      input{
        color: #494949;
        font-size: 36px;/*px*/
        background: #FCFCFC;
        border: 1px solid #EAEAEA;/*no*/
        border-left: none;
        border-right: none;
        margin-top: 24px;
        padding: 0 36px;
        width: 100%;
        line-height: 104px;
        height:104px;
      }
      ::-webkit-input-placeholder {
        font-size: 36px;/*px*/
        color: #CCCCCC;
      }
      :-moz-placeholder {
        font-size: 36px;/*px*/
        color: #CCCCCC;
      }
      ::-moz-placeholder {
        font-size: 36px;/*px*/
        color: #CCCCCC;
      }
      :-ms-input-placeholder {
        font-size: 36px;/*px*/
        color: #CCCCCC;
      }
    }
  }
</style>
