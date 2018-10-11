<!--  -->
<template>
  <div class="singleWrapper">
      <commCharts :content="content" :isShowApply="isShowApply"></commCharts>
  </div>
</template>

<script>
import commCharts from "../../components/commCharts"
export default {
  data () {
    return {
      isShowApply: true,
      content: [
        {imgurl: require('../../assets/Testdemo/test.png'),title: '乔二蛋', detail: '二货'},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '桥东姐', detail: '您好'},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '范冰冰', detail: '你好吗'},
        {imgurl: require('../../assets/Testdemo/head.png'),title: '新朋友', detail: '奥特曼申请添加您为好友'}
      ]
    };
  },
  components: {
    commCharts
  },

  computed: {},

  mounted(){},

  methods: {
  }
}

</script>
<style lang='scss' scoped>
  .singleWrapper{
    width: 100%;
    // height: calc(100% - 275px);/*px*/
  }
</style>
