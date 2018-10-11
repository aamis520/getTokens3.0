<template>
    <div class="footer">
       <router-link class="footer_nav" active-class="footer_nav_active" to="/chartHome">聊点</router-link>
			 <!-- <router-link class="footer_nav" active-class="footer_nav_active" to="/Advertisement">广告</router-link> -->
			 <router-link class="footer_nav" active-class="footer_nav_active" :to="dappRouter">发现</router-link>
			 <router-link class="footer_nav" active-class="footer_nav_active" to="/accountHome">账户</router-link>
		</div>
</template>
<script>
export default {
  name: "Foot",
  props: {},
  data() {
    return {
      dappRouter: process.env.NODE_ENV === 'development' ? '/newDapp' : '/newDapp'
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss'>
.footer {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 128px;
  padding-top: 20px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e5e5e5;/*no*/
  background: white;
}
.footer_nav {
  height: 128px;
  line-height: 150px;
  font-size: 20px;/*px*/
  color: #858383;
}
.footer_nav:nth-child(1) {
  background: url("~@/assets/homeThree/聊点默认.png") no-repeat center 8px;
  background-size: 40px 40px;
}
.footer_nav:nth-child(2) {
  background: url("~@/assets/homeThree/发现默认.png") no-repeat center 8px;
  background-size: 48px 36px;
}
.footer_nav:nth-child(3) {
  background: url("~@/assets/homeThree/账户当前.png") no-repeat center 8px;
  background-size: 36px 42px;
}
.footer_nav_active {
  color: #6698FF;
}
.footer_nav_active:nth-child(1) {
  background: url("~@/assets/homeThree/聊点当前.png") no-repeat center 8px;
  background-size: 40px 40px;
}
.footer_nav_active:nth-child(2) {
  background: url("~@/assets/homeThree/发现当前.png") no-repeat center 8px;
  background-size: 48px 36px;
}
.footer_nav_active:nth-child(3) {
  background: url("~@/assets/homeThree/账户默认.png") no-repeat center 8px;
  background-size: 36px 42px;
}
</style>
