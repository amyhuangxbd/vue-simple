<template>
  <div id="main">
    <img src="../assets/images/WechatIMG.jpeg">
    <div class="mask" v-if="mask">手机已存在，你已关注过企业微信</div>
  </div>
</template>

<script>

export default {
  name: 'success',
  data: () => ({
    mask: false
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
  },
  async created () {
    if (this.$route.params && this.$route.params.exist) { // 手机已存在
      this.mask = true
      console.info(true)
      let that = this
      window.setTimeout(() => {
        that.mask = false
      }, 1500)
    }
  },
  async mounted () {
    document.getElementById('app').classList.add('page-bg')
    window._hmt.push(['_trackEvent', '领取成功页面', '访问'])
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
  background: url("../assets/images/bg_03.jpg") top left no-repeat;
  background-size: 7.5rem 12.07rem;
  background-color: rgba(40,34,96,1);
  display: flex;
  flex-direction: column;
}
img {
  margin: auto;
  margin-top: 7.30rem;
  width: 3.8rem;
  height: 3.8rem;
  border: .08rem solid rgba(238, 205, 115, 1);
  border-radius: .04rem;
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
