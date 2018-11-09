import {apiClient} from 'plugins/services/client'
import * as CONF from '@/config'
import Util from '@/util'
import qs from 'qs'

export default class Room {
  async getInvitedInfo (type, options) {
    const url = Util.urlFormat(CONF.apiUrl[type], options)
    try {
      const invitedInfo = (await apiClient.get(url)).data.data
      return invitedInfo
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async creatWithoutName (type, options) {
    const url = Util.urlFormat(CONF.apiUrl[type])
    try {
      const result = (await apiClient.post(url, qs.stringify(options)))
      return result.data
    } catch (e) {
      return []
    }
  }

  async creatWithOpenId (type, options) {
    const url = Util.urlFormat(CONF.apiUrl[type])
    try {
      const result = (await apiClient.post(url, qs.stringify(options)))
      return result.data
    } catch (e) {
      return []
    }
  }

  async getWechatUser (type, options) {
    const url = Util.urlFormat(CONF.apiUrl[type], options)
    try {
      if (options.code === 'test') {
        return {
          city: '浦东新区',
          country: '中国',
          headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK0kt9KiaztfWjM3yjDicUHIncvWSDmwuGrswS8P1js4KVe0Skiapx2fgAxsib2As8uwwwiayNj2iauibJ5Q/132',
          language: 'zh_CN',
          nickname: 'solo[remix]',
          openId: 'oz8CzwfUazyUE68IXOerwCWOtFjM',
          privilege: [],
          province: '上海',
          sex: 1,
          unionid: 'o9brdwyvlBhWbr0A-9KJUbfyCPKw'
        }
      }
      const invitedInfo = (await apiClient.get(url)).data.data
      return invitedInfo
    } catch (e) {
      console.log(e)
      return []
    }
  }

  sendPoint () {

  }

  scrollPoint () {

  }
}
