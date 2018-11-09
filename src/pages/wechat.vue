<template>
  <div id="main">
    <img class="wechatlogo" src="../assets/images/WechatIMG.jpeg">
    <img class="iwant" src="../assets/images/want.png" @click="clickShare">
    <div class="maskTel" v-if="mask">手机已存在，你已关注过企业微信</div>
    <div class="mask" v-if="showMask" @click="hideMask($event)">
      <div class="mask-content">
        <img src="../assets/images/arrow.png">
        <img src="../assets/images/share-txt.png">
      </div>
    </div>
    <div class="tips">投资有风险，入市需谨慎</div>
  </div>
</template>

<script>

export default {
  name: 'wechat',
  data: () => ({
    mask: false,
    showMask: false
  }),
  props: {
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  components: {},
  methods: {
    clickShare () {
      this.showMask = true
      window.scrollTo(0, 0)
      window._hmt.push(['_trackEvent', '分享', '点击'])
    },
    hideMask (event) {
      if (event.target.tagName === 'IMG') {
        return
      }
      this.showMask = false
    }
  },
  created () {
    if (this.$route.params && this.$route.params.exist) { // 手机已存在
      this.mask = true
      let that = this
      window.setTimeout(() => {
        that.mask = false
      }, 1500)
    }
  },
  mounted () {
    document.getElementById('app').classList.add('page-bg')
    window._hmt.push(['_trackEvent', '助力好友 拿福利页面', '访问'])
  },
  beforeDestroy () {
    document.getElementById('app').classList.remove('page-bg')
  }
}
</script>
<style>
  .page-bg {
    background-color: rgba(254,212,138,1);
  }
</style>
<style scoped>
#main{
  width: 100%;
  height: 10.96rem;
  position: relative;
  background: url("../assets/images/bg_04.jpg") top left no-repeat;
  background-size: 7.5rem 10.96rem;
  background-color: rgba(254,212,138,1);
  display: flex;
  flex-direction: column;
}
.wechatlogo {
  margin: 0 auto;
  margin-top: 6.18rem;
  margin-bottom: 0;
  width: 3rem;
  height: 3rem;
}
.iwant {
  position: absolute;
  top: 9.58rem;
  width: 1.52rem;
  height: .6rem;
  left: 5.61rem;
  background: url("../assets/images/want.png") top left no-repeat;
  background-size: 1.52rem .6rem;
  cursor: pointer;
}
.maskTel {
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
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 7.5rem;
  height: 23.53rem;
  background: rgba(0,0,0,.7);
}
.mask-content img {
  display: block;
}
.mask-content img:first-child {
  margin-left: 6.14rem;
  margin-top: 0.33rem;
  width: 0.67rem;
  height: .96rem;
}
.mask-content img:last-child {
  margin-left: 3.25rem;
  margin-top: 0.16rem;
  width: 3.85rem;
  height: 1.56rem;
}
.tips {
  margin-top: 1.3rem;
  font-size: .24rem;
  color: #e26e00;
}
</style>
