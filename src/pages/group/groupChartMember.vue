<!--  -->
<template>
  <div class="groupChartMember">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <comm-Members :content="members"></comm-Members>
  </div>
</template>

<script>
import commMembers from "../../components/commMembers"
import header from "../../pages/comm/header"
export default {
  data () {
    return {
      title:'群聊成员',
      members:[
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'},
        {imgUrl: require('../../assets/Testdemo/head.png'),title: 'hello'}
      ]
    };
  },

  components: {
    tarHeader: header,
    commMembers
  },

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
