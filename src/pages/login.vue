<template>
  <div id="main">
    <div class="form">
      <div class="tr">
        <span>国家/地区</span>
        <span class="td-china">中国（+86）</span>
      </div>
      <div class="tr">
        <span>手机号码</span>
        <input type="tel" name="" placeholder="填写手机号码" v-model="telephone">
      </div>
    </div>
    <button class="btn-login" @click="login">免密码登录</button>
    <div class="loading" v-if="showLoading">
      <img src="../assets/images/loading.gif">
    </div>
    <div class="error" v-if="showErr">
      <span>请输入您的电话号码</span>
    </div>
  </div>
</template>

<script>
import * as CONF from '@/config'

export default {
  name: 'login',
  data: () => ({
    showErr: false,
    showLoading: false,
    telephone: ''
  }),
  props: {
    openId: {
      type: String
    }
  },
  watch: {
    openId (str) {
    }
  },
  components: {},
  methods: {
    async creatWithOpenId (params) {
      const memberRelation = await this.$services.Room.creatWithOpenId('CREATE_WITH_OPENID', {
        departmentId: CONF.baseInfo.departmentId,
        mobile: params.mobile,
        corpId: CONF.baseInfo.corpId,
        shareOpenId: CONF.baseInfo.shareOpenId,
        userOpenId: this.openId,
        tagId: CONF.baseInfo.tagId,
        periodNo: CONF.baseInfo.periodNo
      })
      return memberRelation
    },
    async login () {
      window._hmt.push(['_trackEvent', '免密码登录', '点击'])
      if (this.telephone.trim() === '' || !/^1[0-9]{10}$/.test(this.telephone.trim())) {
        this.showErr = true
        setTimeout(() => {
          this.showErr = false
        }, 1500)
        return
      }
      const response = await this.creatWithOpenId({
        mobile: this.telephone.trim()
      })

      if (response.code === '60104') {
        this.$router.push({
          name: 'wechat', params: { exist: true }
        })
        return
      }

      this.$router.push({
        name: 'wechat'
      })
    }
  },
  async created () {
  },
  async mounted () {
    window._hmt.push(['_trackEvent', '好友登录页面', '访问'])
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(239,239,244,1);
  display: flex;
  flex-direction: column;
}
.form {
  margin-top: .3rem;
  background-color: #fff;
  width: 7.5rem;
  height: 1.78rem;
}
.form .tr {
  height: .88rem;
  width: 7.2rem;
  margin-left: .3rem;
  font-size:.34rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(0,0,0,1);
  line-height:.48rem;
  text-align: left;
  line-height: .88rem;
}
.form .tr:first-child {
  border-bottom: 1px solid #e5e5e5;

}
.form .tr .td-china {
  margin-left: .22rem;
}
.form .tr input {
  margin-left: .4rem;
  width: 4rem;
  font-size: .34rem;
  border: none;
}
.btn-login {
  width:6.70rem;
  height:.94rem;
  margin: 0 auto;
  margin-top: 1.47rem;
  background:rgba(26,173,25,1);
  border-radius:.1rem;
  border:2px solid rgba(5,5,5,0.08);
  text-align: center;
  font-size:.36rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:.5rem;
}
.error {
  position: absolute;
  margin-top: 2.2rem;
  margin-left: 1rem;
  padding: .06rem;
  width: 5.5rem;
  font-size: .32rem;
  color: #fff;
  background-color: rgba(0,0,0,.7);
  border-radius: .2rem;
}

</style>
