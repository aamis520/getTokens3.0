<!--  -->
<template>
  <div class="proupContainer">
    <mt-popup
      v-model="popupVisible"
      class="codePop"
      position="bottom">
      <div class="codePopContent">
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  props:{
    popupVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
  .proupContainer{
    .codePop{
      width: 100%;
      height: 200px;
      background: white;
    }
    .codePopContent{
    }
  }
</style>
