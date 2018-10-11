<!--  -->
<template>
  <div class="groupWrapper">
    <commCharts :content="content" :isShowApply="isShowApply"></commCharts>
    <!-- <slide-chart></slide-chart> -->
  </div>
</template>

<script>
import commCharts from "../../components/commCharts"
import slideChart from '@/components/chartListCanDelete'
export default {
  data () {
    return {
      isShowApply: false,
      content: [
        {imgurl:require('../../assets/index_9.png'),title: '社会链', detail: '快来加入我们吧'},
        {imgurl: require('../../assets/index_9.png'),title: '币知道', detail: '北京张大妈'},
        {imgurl: require('../../assets/index_9.png'),title: '群通知', detail: '每逢佳节'}
      ]
    };
  },

  components: {
    commCharts,
    slideChart
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .singleWrapper{
    width: 100%;
    // height: calc(100% - 275px);/*px*/
  }
</style>
