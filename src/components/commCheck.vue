<!--  -->
<template>
  <div class="commCheckContainer">
    <div @click="divClickChange(item)" class="singleCheck" v-for="(item,index) in content" :key="index">
      <span style="display:absolute;right:0;">
        <input @change="checkChange(item)" type="checkbox" v-model="item.checkoutValue" class="Checkbox" :id="index">
        <label :for="index"></label>
      </span>
      <img :src="item.imgurl" alt="icon">
      <span class="nameSpan">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arrList: new Set()
    };
  },
  props: {
    content: {
      type: Array,
      default: [{}]
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    divClickChange(item){
      console.log(item)
      item.checkoutValue = !item.checkoutValue
      if(item.checkoutValue) {
        this.arrList.add(item.title)
      } else {
        this.arrList.delete(item.title)
      }
      console.log(this.arrList.size)
      this.$emit("memBerNum", this.arrList.size)
    },
    checkChange(item){
      if(item.checkoutValue) {
        this.arrList.add(item.title)
      } else {
        this.arrList.delete(item.title)
      }
      var data = this.arrList.size
      this.$emit("memBerNum", data)
    }
  }
}

</script>
<style lang='scss' scoped>
.commCheckContainer{
  // height: 500px;
  padding: 0 30px;
  .singleCheck{
    height: 130px;
    position: relative;
    text-align: left;
    border-bottom: 1px solid #EAEAEA;/*no*/
    img{
      position: absolute;
      top: 25px;
      // transform: translateY(40px);
      margin-left: 80px;
      height: 80px;
      width: 80px;
    }
    .nameSpan{
      margin-left: 200px;
      line-height: 120px;
    }
  }
}
span {
    position: relative;
}
.Checkbox {
    // text-align: left;
    position: absolute;
    right: 0;
    visibility: hidden;
}
.Checkbox+label {
    position:absolute;
    top: -10px;
    width: 45px;
    height: 45px;
    border: 1px solid #A6A6A6;/*no*/
    border-radius: 50%;
    background-color:white;
}
.Checkbox:checked+label{
  background: #26a2ff;
}
.Checkbox:checked+label:after {
    content: "";
    position: absolute;
    left:6px;
    top:6px;
    width: 30px;
    height: 20px;
    border: 2px solid white;/*no*/
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-45deg);
    -ms-transform: rotate(-50deg);
    -moz-transform: rotate(-50deg);
    -webkit-transform: rotate(-50deg);
}
</style>
