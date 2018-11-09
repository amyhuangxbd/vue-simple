import jsonp from 'jsonp'

export const getShare = (params) => {
  if (params) {
    share(params)
  }
}
export const wxVerif = (force, debug) => {
  let _force = force
  let _debug = debug
  // let shareUrl = 'https://game.jdcf88.com/xnjdc/static/share1/'
  // let urlContent = encodeURIComponent(shareUrl)
  let urlContent = encodeURIComponent(window.location.href)
  let url = `https://ytxhjwx.jdcf88.com/H5_server/WxJS.aspx?method=GetJsApi&pid=1&url=${urlContent}&force=${_force}`
  jsonp(url, null, (err, res) => {
    if (err) {
      // window.location.reload()
      return false
    } else {
      let data = res.data
      window.wx.config({
        debug: _debug, // 如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'translateVoice', 'hideAllNonBaseMenuItem', 'stopRecord', 'playVoice'] // 必填
      })
      if (force === 1) {
        return
      }
      window.wx.error(function (res) {
        // 签名过期导致验证失败
        if (res.errMsg !== 'config:ok') { // 如果签名失效，不读缓存，强制获取新的签名
          console.log('签名失效')
          // window.location.reload()
          return false
        }
      })
    }
  })
}
export const share = (param) => {
  var _param = {
    title: param.title, // 分享标题
    link: param.link, // 分享链接
    imgUrl: param.imgUrl, // 分享图标
    desc: param.desc, // 分享描述,分享给朋友时用
    type: param.type, // 分享类型,music、video或link，不填默认为link,分享给朋友时用
    dataUrl: param.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空,分享给朋友时用
    calback: param.calback // 分享回调
  }
  window.wx.ready(function () {
    window.wx.hideMenuItems({
      menuList: [] // 要隐藏的菜单项，所有menu项见附录3
    })
    // 校验分享接口是否可用
    window.wx.checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'],
      success: function (res) {
        if ((res.checkResult.onMenuShareTimeline === false) || (res.checkResult.onMenuShareAppMessage === false)) {
          return false
        }
      },
      error: function (e) {
      }
    })
    // 分享到朋友圈
    // _param.link = window.location.protocol + '//' + window.location.host + window.location.pathname + '?departmentId=' + '1&appTagId=1&shareOpenId=' + localStorage.getItem('openId') + '#/login'
    window.wx.onMenuShareTimeline({
      title: _param.title,
      link: _param.link,
      imgUrl: _param.imgUrl,
      success: function () {
        // 用户确认分享后执行的回调函数
        _param.calback()
      },
      cancel: function (res) {
        // 用户取消分享后执行的回调函数
      }
    })
    // 分享给朋友
    window.wx.onMenuShareAppMessage({
      title: _param.title,
      desc: _param.desc,
      link: _param.link,
      imgUrl: _param.imgUrl,
      type: _param.type,
      dataUrl: _param.dataUrl,
      success: function (res) {
        // 用户确认分享后执行的回调函数
        _param.calback()
      },
      cancel: function (res) {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}
