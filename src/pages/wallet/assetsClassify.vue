<!--  -->
<template>
  <div class="assetsClassify">
    <tar-header :isSowBack='true' :title="title"></tar-header>
    <div class="box">
        <div class="list" v-for="(item,index) in getBackBeanListData" :key="index">
          <div class="list-item">
            <p class="img">
              <img :src = "item.icon" alt="icon">
            </p>
            <div>
              <p class="coin">
                <span>{{item.currency}}</span>
              </p>
              <!-- <p class="price">行情价格:{{item.market_price}}</p> -->
            </div>
            <p class="switch">
              <mt-switch v-model="item.statusSelf" @change="change(item)"></mt-switch>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../../pages/comm/header";
import {api} from '@/static/api'
import { Toast, Indicator } from "mint-ui";
import { getBeanList, switchBean } from '@/static/apiJava'

export default {
  data() {
    return {
      getBackBeanListData: '', // java接口返回的币种列表
      status: false,
      getBackData: [],
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      title: "资产种类",
      data: [{}, {}, {}, {}, {}]
    };
  },

  components: {
    tarHeader: header
  },

  computed: {},

  mounted() {
   this.beanList()
  },

  methods: {
    beanList(){
      var _this = this
      var id = _this.$store.getters.UserId
      getBeanList(id)
      .then(res => {
        if (res.statusCode == 200) {
          res.data.forEach(ele => {
            if (String(ele.show) == '1') {
              ele.statusSelf = true
            } else if (String(ele.show) == '0'){
              ele.statusSelf = false
            }
          });
          _this.getBackBeanListData = res.data
        }
      })
    },
    // 开关调用接口
    getSwitchPort(data) {
      switchBean(data.userId, data.currency, data.show)
      .then(res => {
        console.log(res)
        this.beanList()
      })
      .catch(() => {

      })
    },
    // 切换按钮事件
    change(item) {
      console.log(item)
        //  "status":1, //TRUE/FALSE 是否查询用户关闭的资金
        // "asset":1, //开关余额的ID
      var params = {
        userId: this.$store.getters.UserId,
        currency: item.currency
      }
      if (item.show == '0') {
        params.show = '1'
      } else if(item.show == '1'){
        params.show = '0'
      }
      this.getSwitchPort(params)
    }
  }
};
</script>
<style lang='scss' scoped>
.assetsClassify{
  height: 100%;
  background: white;
}
.list {

  height: 160px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f4f4f4;/*no*/
  padding-bottom: 20px;
  .list-item {
    padding-top: 30px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    div {
      flex: 1;
      .coin {
        text-align: left;
        font-size: 30px;/*px*/
        color: black;
        font-weight: bold;
        letter-spacing: 0.29px;
      }
      .price {
        margin-top: 10px;
        text-align: left;
        font-size: 12px;/*no*/
        color: #9b9b9b;
        letter-spacing: 0.25px;
      }
    }
    .img {
      text-align: center;
      width: 90px;
      height: 90px;
      margin-right: 20px;
      position: relative;
      // margin: auto 10px;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 75px;
        width: 75px;
        display: block;
        // width: 100%;
      }
    }
    .switch {
      margin-top: 8px;
      padding-left: 50px;
    }
  }
}
.box {
  margin: 30px 30px;
}
</style>
