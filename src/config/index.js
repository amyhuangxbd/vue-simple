const base = {
  development: {
    // DOMAIN: `http://192.168.3.132:8030/minilive-outer-server',
    DOMAIN: '//test-corp.jdcf88.com',
    STATISTICS: '//test-statistics.jdcf88.com',
    REPORTDOMAIN: '//test-minilive-seminar.xiniu99.com',
    WECHAT: '//test-wxmgr.jdcf88.com',
    USER: '//test-user.jdcf88.com',
    TJORDER: '//test-tj-order.jdcf88.com',
    ZHULI: '//test-wechat.jdcf88.com',
    APPID: 'wx57c8ece0ce33a643'

  },
  production: {
    DOMAIN: '//corp.jdcf88.com',
    STATISTICS: '//statistics.jdcf88.com',
    REPORTDOMAIN: '//minilive-seminar.xiniu99.com',
    WECHAT: '//wxmgr.jdcf88.com',
    USER: '//user.jdcf88.com',
    TJORDER: '//tj-order.jdcf88.com',
    ZHULI: '//wechat.jdcf88.com',
    APPID: 'wx57c8ece0ce33a643'
  }
}

const config = {
  baseInfo: {},
  apiUrl: {}
}

const env = process.env.NODE_ENV || 'production'
config.env = env
console.log(env)

const DOMAIN = base[env].DOMAIN

const getQueryStr = function (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

const getDevice = function (whpf) {
  let device = /Android/i.test(navigator.userAgent) ? 'Android' : /iPhone/i.test(navigator.userAgent) ? 'iPhone' : ''
  let platform = /microMessenger/i.test(navigator.userAgent) ? 'wx' : /Mobile/i.test(navigator.userAgent) ? 'm' : 'pc'
  if (whpf === 'platform') return platform
  if (whpf === 'device') return device
  return platform + device
}

let deviceId = localStorage.getItem('deviceId') ? localStorage.getItem('deviceId') : ''

if (!deviceId) {
  deviceId = Math.random().toString(16).substring(2) + Date.parse(new Date())
  localStorage.setItem('deviceId', deviceId)
}

const channel = getDevice()
config.baseInfo.corpId = 'wwae25b5c25c315203'
config.baseInfo.unionid = ''
config.baseInfo.openIdKey = base[env].APPID + 'openId'

config.baseInfo.departmentId = getQueryStr('departmentId') ? getQueryStr('departmentId') : ''
config.baseInfo.shareOpenId = getQueryStr('shareOpenId') ? getQueryStr('shareOpenId') : ''
config.baseInfo.appTagId = getQueryStr('appTagId') ? getQueryStr('appTagId') : ''
config.baseInfo.tagId = getQueryStr('tagId') ? getQueryStr('tagId') : ''
config.baseInfo.periodNo = getQueryStr('periodNo') ? getQueryStr('periodNo') : ''
config.baseInfo.cc = getQueryStr('cc') ? getQueryStr('cc') : ''
config.baseInfo.code = getQueryStr('code') ? getQueryStr('code') : ''
config.baseInfo.deviceId = deviceId
config.baseInfo.serverId = 3000
config.baseInfo.officialId = 3
config.baseInfo.isAndroid = navigator.userAgent.indexOf('Android') > -1
config.baseInfo.appId = base[env].APPID

config.getQueryStr = getQueryStr
config.getDevice = getDevice

// 获取用户信息
config.apiUrl.GET_WX_USER = `${DOMAIN}/api/1/openWx/getOpenId?code=${config.baseInfo.code}`
// token拿roomNO
config.apiUrl.GET_ROOMNO = `${DOMAIN}/api/v1/room/${channel}/{{companyId}}/getRoomsByRoomToken.json?roomToken={{roomToken}}`
// 分享到几个用户
config.apiUrl.GET_INVITED_INFO = `${DOMAIN}/api/1/getMember/getMemberRelation?corpId={{corpId}}&shareOpenId={{shareOpenId}}&isValid=1&tagId={{tagId}}&periodNo={{periodNo}}`
// 加入企业微信
config.apiUrl.CREATE_WITHOUT_NAME = `${DOMAIN}/api/1/createMember/createWithOutName`
// 通过分享加入企业微信
config.apiUrl.CREATE_WITH_OPENID = `${DOMAIN}/api/1/createMember/createWithOutNameWithOpenId`

module.exports = config
