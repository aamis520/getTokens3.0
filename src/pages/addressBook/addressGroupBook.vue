<template>
  <div class="singleWrapper">
      <mt-index-list>
        <mt-index-section index="A">
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>a组name</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>aname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>aname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>aname</span>
            </div>
        </mt-index-section>
        <mt-index-section index="B">
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
            </div>
            <div class="userList">
                <img src="../../assets/index_2.png">
                <span>bname</span>
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
        width: 715px;
        height: 120px;
        padding: 20px 0;
        margin-left: 35px;
        border-bottom: 1px solid #eaeaea;
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
            font-size: 28px;
            color: #494949;
            float: left;
        }
    }
  }
</style>
