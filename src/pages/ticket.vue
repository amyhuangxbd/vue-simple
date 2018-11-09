<template>
  <div id="main">
    <div class="input-box">
      <div class="input">
        <input type="tel" maxlength="11" v-model="telephone">
      </div>
    </div>
    <div class="btn" @click="getTickets">
      <div class="hand-point"></div>
      <div class="hand"></div>
    </div>
    <div class="loading" v-if="showLoading">
      <img src="../assets/images/loading.gif">
    </div>
    <div class="error" v-if="showErr">
      <span>请输入您的电话号码</span>
    </div>
    <div class="mask" v-if="mask">手机已存在，你已关注过企业微信</div>
  </div>
</template>

<script>
import * as CONF from '@/config'

export default {
  name: 'ticket',
  data: () => ({
    showErr: false,
    showLoading: false,
    telephone: '',
    mask: false
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
    async createWithoutName (params) {
      const memberRelation = await this.$services.Room.creatWithoutName('CREATE_WITHOUT_NAME', {
        departmentId: CONF.baseInfo.departmentId,
        mobile: params.mobile,
        corpId: CONF.baseInfo.corpId,
        openId: this.openId,
        tagId: CONF.baseInfo.tagId,
        periodNo: CONF.baseInfo.periodNo
      })
      return memberRelation
    },
    async getTickets () {
      if (this.telephone.trim() === '' || !/^1[0-9]{10}$/.test(this.telephone.trim())) {
        this.showErr = true
        setTimeout(() => {
          this.showErr = false
        }, 1500)
        return
      }
      window._hmt.push(['_trackEvent', '点击领取入场券', '点击'])
      const response = await this.createWithoutName({
        mobile: this.telephone.trim()
      })
      if (response.code === '60104') {
        this.$router.push({
          name: 'success', params: { exist: true }
        })
        return
      }
      this.$router.push({
        name: 'success'
      })
    }
  },
  async created () {
  },
  async mounted () {
    document.getElementById('app').classList.add('page-bg')
    window._hmt.push(['_trackEvent', '领取入场券页面', '访问'])
  },
  beforeDestroy () {
    document.getElementById('app').classList.remove('page-bg')
  }
}
</script>
<style>
  .page-bg {
    background-color: rgba(40,34,96,1);
  }
</style>
<style scoped>
#main{
  width: 100%;
  height: 12.07rem;
  position: relative;
  background: url("../assets/images/bg_02.jpg") top left no-repeat;
  background-size: 7.5rem 12.07rem;
  background-color: rgba(40,34,96,1);
  display: flex;
  flex-direction: column;
}
.input-box {
  position: relative;
  margin: 0 auto;
  margin-top: 5.5rem;
  width: 7.5rem;
  height: .93rem;
  text-align: center;
}

.input {
    position: relative;
    width: 6.29rem;
    height: .89rem;
    margin: 0 auto;
    background: url("../assets/images/input_telephone.png") 100% no-repeat;
    background-size: 6.29rem .89rem;
    font-size: .36rem;
}

.input input {
    position: absolute;
    left: 2.12rem;
    width: 3.3rem;
    height: .8rem;
    padding: 0 .2rem;
    color: #333;
    line-height: .8rem;
    font-size: .36rem;
    border: none;
}

.btn {
    position: relative;
    margin: 0 auto;
    margin-top: .17rem;
    width: 3.75rem;
    height: .77rem;
    background: url(../assets/images/btn-ticket.png) 100% no-repeat;
    background-size: 3.75rem .77rem;
    cursor: pointer;
}

.hand-point {
    position: absolute;
    top: .25rem;
    right: -.05rem;
    width: .55rem;
    height: .45rem;
    background: url(../assets/images/hand-point.png) 50% no-repeat;
    background-size: .55rem .45rem;
    animation: big-small2 1.5s infinite linear;
    animation-delay: .75s;
}

.hand {
    position: absolute;
    top: .4rem;
    right: -.45rem;
    width: .77rem;
    height: .77rem;
    background: url(../assets/images/hand.png) 50% no-repeat;
    background-size: .77rem .77rem;
    animation: big-small 1.5s infinite linear;
}

@keyframes big-small {
    0% {
        transform: scale(1)
    }

    50% {
        transform: scale(.8)
    }

    to {
        transform: scale(1)
    }
}

@keyframes big-small2 {
    0% {
        transform: scale(1.2)
    }

    50% {
        transform: scale(.5)
    }

    to {
        transform: scale(1.2)
    }
}
.loading {
  position: absolute;
  top: 4rem;
  left: 3.5rem;
}
.loading img {
  width: .64rem;
  height: .64rem;
}
.error {
  position: absolute;
  top: 3.7rem;
  left: 2rem;
}
.error span {
  display: inline-block;
  margin: 0 auto;
  padding: 0 .3rem;
  background: rgba(0,0,0,.8);
  border-radius: 5px;
  min-width: 3rem;
  height: .6rem;
  font-size: .28rem;
  text-align: center;
  height: .6rem;
  line-height: .6rem;
  font-size: .2rem;
  color: #fff
}
.mask {
  position: absolute;
  margin-top: 4.2rem;
  margin-left: 1rem;
  padding: .06rem;
  width: 5.5rem;
  font-size: .32rem;
  color: #000;
  background-color: #fff;
  border-radius: .16rem;
}
</style>
