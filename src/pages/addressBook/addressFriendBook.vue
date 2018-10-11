<template>
  <div class="singleWrapper">
      <mt-index-list>
        <mt-index-section index="A">
            <div class="userList">
                <img class="avtor" src="../../assets/index_2.png">
                <span class="name">aname</span>
                <span class="num">算力123</span>
                <img class="hand" src="../../assets/handYes.png">
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
    height: calc(100% - 400px);/*px*/
    overflow: hidden;
    .userList{
        width: 680px;
        height: 120px;
        padding: 20px 0;
        margin: 0 35px;
        border-bottom: 1px solid #eaeaea;
        .avtor{
            width: 80px;
            height: 80px;
            float: left;
        }
        span{
            display: block;
            height: 80px;
            line-height: 80px;
            margin-left: 35px;
            font-size: 28px;
            color: #494949;
            text-align: left;
            float: left;
        }
        .name{
            width: 278px;
        }
        .num{
            width: 150px;
        }
        .hand{
            width: 42px;
            height: 40px;
            margin: 20px 30px;
            float: left;
        }
    }
  }
</style>
