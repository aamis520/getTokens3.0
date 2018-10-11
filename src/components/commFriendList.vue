<template>
  <div class="singleWrapper">
      <mt-index-list>
        <mt-index-section index="A">
            <div class="userList" v-for="(item,index) in contentA" :key="index">
                <img :src="imgUrl">
                <span>{{item.name}}</span>
            </div>
        </mt-index-section>
        <mt-index-section index="B">
            <div class="userList" v-for="(item,index) in contentB" :key="index">
                <img :src="imgUrl">
                <span>{{item.name}}</span>
            </div>
        </mt-index-section>
        <mt-index-section index="Z">
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
            </div>
        </mt-index-section>
        </mt-index-list>
  </div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui'
export default {
  data () {
    return {
      contentA: [
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'aello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'aello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'aello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'aello'}
      ],
      contentB: [
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'bello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'bello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'bello'},
        {imgUrl: require('../../assets/Testdemo/head.png'), name:'bello'}
      ],
      isShowApply: true
    };
  },
  components: {

  },

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .singleWrapper{
    width: 100%;
    height: calc(100% - 400px);
    overflow: hidden;
    .userList{
        width: 715px;
        height: 120px;
        padding: 20px 0;
        margin-left: 35px;
        border-bottom: 1px solid #eaeaea;/*no*/
        img{
            width: 80px;
            height: 80px;
            float: left;
        }
        span{
            display: block;
            height: 80px;
            line-height: 80px;
            margin-left: 35px;
            font-size: 28px;/*px*/
            color: #494949;
            float: left;
        }
    }
  }
</style>
