<template>
  <div id="main">
    <div class="inner-content">
      <span class="wrap-invite">你成功邀请了{{memberRelation.length}}人</span>
      <div class="wrap-img">
        <div v-for="(item, index) in memberRelation" v-bind:key="index" class="img-content">
          <img :src="item.headImage">
        </div>
        <div v-for="(item) in notInviteList" v-bind:key="item" class="img-content">
        </div>
      </div>
      <button v-if="memberRelation.length < 3" class="btn-share" @click="clickShare"></button>
      <button v-else class="btn-get" @click="getTicket"></button>
    </div>
    <div class="mask" v-if="showMask" @click="hideMask($event)">
      <div class="mask-content">
        <img src="../assets/images/arrow.png">
        <img src="../assets/images/share-txt.png">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  data: () => ({
    inviteList: [],
    notInviteList: [],
    link: 'http://test-live.jdcf88.com/edumobilelive/static/img/btn-list-teacher.376a51d.png',
    showMask: false
  }),
  props: {
    memberRelation: {
      type: Array
    }
  },
  watch: {
    memberRelation (arr) {
      let len = 3 - arr.length
      this.notInviteList = new Array(len)
    }
  },
  components: {},
  methods: {
    clickShare () {
      this.showMask = true
      window.scrollTo(0, 0)
      window._hmt.push(['_trackEvent', '分享', '点击'])
    },
    getTicket () {
      this.$router.push({
        name: 'ticket'
      })
      window.scrollTo(0, 0)
    },
    hideMask (event) {
      if (event.target.tagName === 'IMG') {
        return
      }
      this.showMask = false
    }
  },
  async created () {
    this.inviteList = this.memberRelation
    let len = 3 - this.inviteList.length
    this.notInviteList = new Array(len)
  },
  async mounted () {
  }
}
</script>
<style scoped>
  #main{width: 100%;
    height: 23.53rem;
    position: relative;
    background: url("../assets/images/bg_01.jpg") top left no-repeat;
    background-size: 7.5rem 23.53rem;
    background-color: rgba(254,212,138,1);
    display: flex;
    flex-direction: column;}
  .inner-content {
    margin: 0 auto;
    margin-top: 6.9rem;
    width: 6.27rem;
  }
  .wrap-invite {
    text-align: center;
    color: #4d4d4d;
    font-size: 0.36rem;
    line-height: 0.36rem;
  }
  .wrap-img {
    margin-top: 0.32rem;
  }
  .img-content {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.69rem;
    background-color: #e6e6e6;
  }
  .img-content:last-child {
    margin-right: 0;
  }
  .wrap-img img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  button {
    margin-top: 0.18rem;
    width: 6.27rem;
    height: 1.51rem;
    background: url("../assets/images/button.png") top left no-repeat;
    background-size: 6.27rem 1.51rem;
    outline: none;
    border: none;
    cursor: pointer;
  }
  button.btn-share {
    background: url("../assets/images/button.png") top left no-repeat;
    background-size: 6.27rem 1.51rem;
  }
  button.btn-get {
    background: url("../assets/images/btn-get-ticket.png") top left no-repeat;
    background-size: 6.27rem 1.51rem;
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
</style>
