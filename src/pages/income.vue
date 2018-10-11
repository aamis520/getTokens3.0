<!--  -->
<template>
  <div class="income">
    <tar-header :title="title" :isSowBack="true"></tar-header>
    <scroller class="income_container"
      :on-refresh="refresh"
      :on-infinite="infinite"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949"
      ref="income">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g>
      </svg>
      <div class="income_remark" v-for="(item,index) in getBackdata" :key="index">
        <div class="income_remark_left">
          <div class="left_inner">
            <span class="income_remark_left_top">{{item.asset_log_desc}}</span><br>
            <span class="income_remark_left_bottom">上链成功</span>
          </div>
        </div>
        <div class="income_remark_right">
          <div class="right_inner">
            <span class="income_remark_right_top">{{item.asset_log_money}} {{item.coin_id}}</span><br>
            <span class="income_remark_right_bottom">{{item.asset_log_addtime}}</span>
          </div>
        </div>
      </div>
      <svg class="spinner" style="fill: #4b8bf4;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g>
      </svg>
    </scroller>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import header from "../pages/comm/header";
import { api } from "@/static/api";
export default {
  data() {
    return {
      initClear: false,
      endEmpty: false, // 是否刷新到底部
      items: [],
      form: {
        page: 1
      },
      isSowBack: true,
      upPullStatus: false,
      // upPullStatus: true,
      // downPullStatus: false,
      ApiConf: { headers: { "X-token": this.$store.getters.Token } },
      getBackdata: [],
      title: "收支记录",
      content: [
        {
          classify: "日程领取",
          orSuccess: "上链成功",
          upPencent: "+0.056UTCT",
          date: "6.27-13-14"
        }
      ]
    };
  },
  components: {
    tarHeader: header
  },
  filters: {
    // numParse:function(data){
    //   if (data > 0) {
    //     return '+' + Number(data).toFixed(2)
    //   }
    // }
  },
  computed: {},

  mounted() {
    this.form.page = 1;
    this.getPort()
  },
  methods: {
    refresh(done) {
      console.log(done)
      var _this = this
      // _this.endEmpty = false
      setTimeout(() => {
        _this.form.page = 1;
        _this.getPort()
        done()
      }, 1500)
    },

    infinite(done) {
      if(this.getBackdata.length > 0){
        setTimeout(() => {
          this.form.page= Number(this.form.page) + 1
          setTimeout(() => {
            this.getPort(done)
          })
        }, 1500)
      } else {
      // 1.5秒后关闭loading旋转
        setTimeout(() => {
          done(true)
        }, 1500)
      }
    },
    // 收支记录接口
    getPort(done) {
      var _this = this;
      api.incomeRemark(this.form, this.ApiConf)
        .then(res => {
          /**
           * 先进行error_code 是否成功进行判断
           * 在对 上拉 还是下拉的动作进行判断
           * 1.如果是上拉的话  page重置为'1',. 直接进行数据更新
           * 2.如果下拉的话，分两种情况--有数据 还是没有数据
           *    如果有数据的话  原数据数组直接push，page++,为空的话，提示：加载完毕page--
           */

          if (res.error_code == "1000") {
            Indicator.close();
            if (this.form.page == 1 && res.data.length == 0) {
              return
            }
            /**
             * 结果进行遍历，如果是支出的话，加’-‘号，如果是收入的话，加上“+” 号
             */
            res.data.forEach(ele => {
              if (ele.asset_log_type == "1") {
                ele.asset_log_money = "+" + ele.asset_log_money;
              } else if (ele.asset_log_type == "2") {
                ele.asset_log_money = "-" + ele.asset_log_money;
              }
              /**
               * 返回数据根据金额进行小数点后边位数截取
               * 如果是UTC的话 截取8位 否则的话 保留6位
               */
              let arr = String(ele.asset_log_money).split(".");
              if (ele.coin_name == "BTC") {
                var str = "";
                if (arr.length > 1) {
                  str = arr[1].slice(0, 8);
                }
                if (str) {
                  ele.asset_log_money = arr[0] + "." + str;
                } else {
                  ele.asset_log_money = arr[0];
                }
              } else {
                var str = "";
                if (arr.length > 1) {
                  str = arr[1].slice(0, 6);
                }
                if (str) {
                  ele.asset_log_money = arr[0] + "." + str;
                } else {
                  ele.asset_log_money = arr[0];
                }
              }
            });
            if (_this.form.page == 1) {
              _this.getBackdata = res.data;
            } else if(_this.form.page >= 2) {
              if (res.data.length > 0){
                res.data.forEach(ele => {
                  _this.getBackdata.push(ele)
                  if(done){done()}
                });
              } else if(res.data.length == 0){
                this.endEmpty = true
              }
            }
            // ========
          } else {
            Indicator.close();
            Toast({
              message: res.error_desc, //提示内容分
              duration: 2000 //持续时间（毫秒），若为 -1 则不会自动关闭
            });
          }
        })
        .catch(() => {
          Indicator.close();
          Toast({
            message: "获取收入记录失败", //提示内容分
            duration: 2000 //持续时间（毫秒），若为 -1 则不会自动关闭
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
// 地
.income {
  height: 100%;
}
.income_container {
  position: relative;
  /* border:1px solid red; */
  padding: 0px 38px;
  height: calc(100% - 95px);
  overflow: hidden;
}
.income_remark {
  display: flex;
  justify-content: space-around;
  height: 150px;
  border-bottom: 1px solid #e2e2e1; /*no*/
}
.income_remark_left {
  position: relative;
  width: 100%;
  text-align: left;
  .left_inner{
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
.income_remark_right {
  position: relative;
  text-align: left;
  width: 100%;
  .right_inner{
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.income_remark_left_top {
  font-size: 27px; /*px*/
  color: #000;
  font-weight: 600;
}
.income_remark_left_bottom {
  display: inline-block;
  margin-top: 12px;
  font-size: 20px; /*px*/
  color: #cecdcd;
}
.income_remark_right_top {
  font-size: 32px; /*px*/
  color: #fdd401;
}
.income_remark_right_bottom {
  display: inline-block;
  margin-top: 20px;
  font-size: 12px; /*px*/
  color: #d6d5d5;
}
.friendRequestBg {
  background: red;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 317px;
  width: 389px;
}
.friendRequestBg img {
  height: 100%;
  width: 100%;
}
.friendRequestBg p {
  letter-spacing: 3px;
  font-size: 32px;
  color: #adadad;
}
</style>
