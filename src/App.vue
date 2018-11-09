<template>
  <div id="app">
    <keep-alive>
      <router-view :memberRelation='memberRelation' :openId="openId"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import * as CONF from '@/config'
import {getShare, wxVerif} from './util/share'

export default {
  name: 'App',
  data: () => ({
    memberRelation: [],
    shareUrl: '',
    openId: ''
  }),
  methods: {
    async getWxUser () {
      const WXUserInfo = await this.$services.Room.getWechatUser('GET_WX_USER', {
        code: CONF.baseInfo.code
      })
      return WXUserInfo
    },
    async getWechatUser () { // 废弃
      const wechatUser = await this.$wechat.getUserInfo()
      if (!wechatUser || !wechatUser.openId) { // code无效刷新页面
        return wechatUser
      }
      return false
    },
    async getInvitedInfo (params) {
      const memberRelation = await this.$services.Room.getInvitedInfo('GET_INVITED_INFO', {
        corpId: CONF.baseInfo.corpId,
        shareOpenId: params.openId,
        isValid: 1,
        tagId: CONF.baseInfo.tagId,
        periodNo: CONF.baseInfo.periodNo
      })
      return memberRelation
    },
    shareWechat () {
      // 分享
      const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?departmentId=' + CONF.baseInfo.departmentId + '&tagId=' + CONF.baseInfo.tagId + '&periodNo=' + CONF.baseInfo.periodNo + '&shareOpenId=' + this.openId + '#/login'
      this.shareUrl = url
      wxVerif(0, false)
      getShare({
        title: `胡俍老师金玉俍言`,
        desc: `价值599元胡俍老师报告会入场券和热点研报等你来拿，快来参与吧~`,
        link: this.shareUrl,
        imgUrl: 'https://wechat.jdcf88.com/qiyehao/lx/sharelogo.png',
        type: '',
        dataUrl: '',
        calback: function () {
        }
      })
    },
    checkExpire (key) {
      var authTime = localStorage.getItem('authTime')
      var expire = 1000 * 60 * 60 * 24 * 7
      var time = new Date().getTime()
      if (time > (authTime + expire)) {
        localStorage.removeItem('authTime')
        localStorage.removeItem(key)
      }
    },
    async getMember () {
      if (this.openId) {
        // 判断有几个用户加入
        this.memberRelation = await this.getInvitedInfo({
          openId: this.openId
        })
        // 本地存储
        localStorage.setItem(CONF.baseInfo.openIdKey, this.openId)
        var time = new Date().getTime()
        localStorage.setItem('authTime', time)
        // 定义分享样式
        this.shareWechat()
      }
    }
  },
  async created () {
    const openIdKey = CONF.baseInfo.openIdKey
    this.checkExpire(openIdKey)
    this.openId = localStorage.getItem(openIdKey) ? localStorage.getItem(openIdKey) : ''
    if (CONF.baseInfo.code) { // 用户授权后 回调函数带有 code
      if (this.openId) { // 用户之前授权过
        this.getMember()
      } else {
        const wechatUser = await this.getWxUser() // 获取用户的 openId
        if (wechatUser && wechatUser.openId) {
          this.openId = wechatUser.openId
          this.getMember()
        } else {
          // 没有拿到用户的 openId
        }
      }
    } else {
      if (this.openId) { // 用户之前授权过
        this.getMember()
      } else {
        // 用户没有授权过
        const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?departmentId=' + CONF.baseInfo.departmentId + '&tagId=' + CONF.baseInfo.tagId + '&periodNo=' + CONF.baseInfo.periodNo + '&shareOpenId=' + CONF.baseInfo.shareOpenId + window.location.hash
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${CONF.baseInfo.appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        return false
      }
    }
  },
  mounted () {
    // 添加进入页面埋点
    window._hmt.push(['_trackEvent', 'website', '访问'])
  }
}
</script>

<style>
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
    width: 7.5rem;
    height: 100%;
    font-size: .28rem;
  }
</style>
