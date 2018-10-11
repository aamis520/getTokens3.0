<template>
  <div class="reister">
    <tar-header :backUrl="backUrl" :title="title"></tar-header>
      <div class="main">
        <div class="register_head">
          <span>
            忘记密码
          </span>
        </div>

        <div class="mobile">

          <input type="text" placeholder="手机号" v-model="mobile" />
        </div>
      <div class="code">
        <input type="text" placeholder="输入验证码" v-model="code" />
        <a href="javascript:void(0);" @click="SendCode">
          <countdown v-if="countingidentifyCode"
            :time="59000"
            :leadingZero="true"
            @countdownend="countidentifyCodeDownEnd" @countdownprogress="countdownprogress">
            <template slot-scope="props" >
              <span v-if="props.seconds > 0">{{ props.seconds }}s</span>
            </template>
          </countdown>
          <span v-else>{{SendBottonData.Title}}</span>
        </a>
      </div>

      <div class="btn" :class="{btn_put:IsPut}" href="javascript:void(0);" @click="findPassNext">下一步</div>
      <!-- <ErrorMessage :ErrorDescShow="ErrorDesc"></ErrorMessage> -->
      </div>

  </div>
</template>
<script>
import header from "../../pages/comm/header";
import { api } from "@/static/api";
// import { checkerror } from "@/static/common";
import { checkerror } from "@/static/common";
import ErrorMessage from "@/components/ErrorMessage";
import countdown from "@xkeshi/vue-countdown"; // 倒计时插件
export default {
  name: "findPassByMobile",
  props: {},
  data() {
    return {
      IsPut: false,
      // placeholderTel: '手机号',
      backUrl: "Home",
      title: "",
      mobile: "",
      code: "",
      SendBottonData: {
        Time: 60,
        Title: "发送验证码",
        IsSend: true,
        Interval: ""
      },
      CheckErrorData: {},
      countingidentifyCode: false,

      ErrorDesc:''
    };
  },
  components: {
    ErrorMessage,
    countdown,
    tarHeader: header
  },
  created() {},
  mounted() {},
  watch: {

    code() {
      this.CheckValue();
    },
    mobile() {
      this.CheckValue();
    }
  },
  methods: {



    findPassNext() {
      var _this = this;
      if (!_this.IsPut) {
        this.$router.push('./setPassByForget')
        return;
      }
      // _this.CheckErrorData = checkerror.Register(_this.mobile, _this.code);
      // if (_this.CheckErrorData.code != 1000) {
      //   // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
      //   return;
      // }
      var data = {
        mobile: _this.mobile,
        code: _this.code,
      };
      // 访问接口
      api.forgetPasswdFirst(data)
        .then(res => {
          // 如果注册成功
          if (res.error_code == 1000) {
            _this.$router.push({
              path: "/setPassByForget",
              query: {
                mobile: _this.mobile
              }
            })
          } else {
            this.$toast({
              message: res.error_desc,
              duration: 1000
            });
          }
        })
        .catch(err => {
          if (err.error_desc) {
            this.$toast({
              message: err.error_desc,
              duration: 1000
            });
          }
        });
      // self.err = CheckError.login(self.mobile,self.pwd,self.sliderStatus)
    },
    countidentifyCodeDownEnd() {
      this.SendBottonData.IsSend = true;
      this.SendBottonData.Title = "重新发送";
      this.countingidentifyCode = false;
    },
    countdownprogress(data) {
      if (data.seconds == 1) {
        this.countidentifyCodeDownEnd();
      }
    },
    SendCode() {
      if (this.countingidentifyCode) {
        return;
      }
      // 发送验证码
      var _this = this;


      // _this.CheckErrorData = checkerror.SendRegisterCode(_this.mobile, _this.country);
      // if (_this.CheckErrorData.code !== 1000) {
      //   _this.$toast({
      //     message: _this.CheckErrorData.desc,
      //     duration: 1000
      //   });
      //   // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
      //   return;
      // }
      var data = {
        mobile: _this.mobile,
      };

      // 访问接口
      _this.countingidentifyCode = true;
      api
        .getlogincode(data)
        .then(res => {
          if (res.error_code == 1000) {
            _this.countingidentifyCode = true;
            // _this.SendInterval();
            _this.SendBottonData.IsSend = false;

            return;
          } else {
            _this.countingidentifyCode = false;
            this.$toast({
              message: res.error_desc,
              duration: 1000
            });
            _this.SendBottonData.IsSend = false;
            // _this.ErrorDesc = res.error_desc+((new Date()).getTime());
          }
        })
        .catch(err => {
          _this.SendBottonData.IsSend = false;
          this.$toast({
            message: res.error_desc,
            duration: 1000
          });
          _this.countingidentifyCode = false;
        });
    },
    CheckValue() {
      //检查是否可以提交数据
      if ((this.mobile != "") & (this.code != "")) {
        this.IsPut = true;
      } else {
        this.IsPut = false;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.reister {
  height: 100%;
  width: 100%;
}
.main {
  /* background-repeat: no-repeat; */
  /* background-size: (100%, 100%); */
  /* background-image:url('../../assets/register.jpg'); */
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 100px;
}
.mobile,
.code {
  position: relative;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ececec; /*no*/
  overflow: hidden;
  margin-top: 50px;
  .mobileAreaCode{
    position: absolute;
    left: 30px;
    font-size: 27px;/*px*/
    line-height: 75px;
    // background: red;
  }
}
.mobile > input,
.code > input {
  width: 100%;
  float: left;
  height: 70px;
  line-height: 70px;
  background: none;
  border: none;
  font-size: 35px; /*px*/
  padding: 0 30px;
  color: #000000;
}
.selectCode > input{
  padding-left: 130px;
}
.code > input {
  width: 350px;
}
.code > a {
  width: 170px;
  float: right;
  line-height: 30px;
  height: 30px;
  font-size: 24px; /*px*/
  color: #ffae00 !important;
  margin-top: 20px;
  border-left: 1px solid #ececec; /*no*/
}
.btn {
  width: 100%;
  margin: 0 auto;
  // display: block;
  height: 90px;
  font-size: 30px; /*px*/
  line-height: 90px;
  color: white;
  margin-top: 110px;
  border-radius: 100px;
  background: #ececec; /* Safari 5.1 - 6.0 */
}
.btn_put {
  background: -webkit-linear-gradient(
    left,
    #ffae00,
    #fdee01
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #ffae00,
    #fdee01
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #ffae00,
    #fdee01
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #ffae00, #fdee01); /* 标准的语法 */
}
.register_head {
  margin-top: 40px;
  color: #231815;
  font-size: 54px; /*px*/
  text-align: left;
  height: 120px;
  // background: red;
}
// 后加上去的
.selectCotuny{
  text-align: left;
  position: relative;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  .selectCotuny_left{
    color: #000000;
    font-size: 26.67px;/*px*/
    line-height: 70px;
    // text-align: left;
  }
  // background: red;
}
.sanjiao {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  border-width: 0 16px 16px;
  border-style: solid;
  border-color: transparent transparent transparent;
}
.sanjiao i {
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  top: 6px;
  left: -10px;
}
.sanjiao i.down {
  border-width: 8px 8px 0;
  border-color: #000000 transparent transparent;
}
.sanjiao i.up {
  border-width: 0 8px 8px;
  border-color: transparent transparent #000000;
}
</style>
