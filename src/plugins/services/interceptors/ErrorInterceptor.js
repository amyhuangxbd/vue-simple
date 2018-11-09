export default class ErrorInterceptor {
  constructor () {
    this.onResponseSuccess = (response) => {
      // if (response.data.code !== 1) {
      //   return Promise.reject(new Error(response.data.message || response.data.msg))
      // } else {
      //   return response
      // }
      if (response.data.code !== '0' && response.data.code !== '60104') {
        return Promise.reject(new Error(response.data.msg ? response.data.msg : response.data.message))
      } else {
        return response
      }
    }

    this.onResponseFail = (error) => {
      // const {code, message} = error.response.data
      // if (code) {
      //   return Promise.reject(new Error(message))
      // }
      if (error.response && error.response.data) {
        const {code, message} = error.response.data
        if (code) {
          return Promise.reject(new Error(message))
        }
      } else {
        return Promise.reject(new Error('网络异常'))
      }
    }
  }
}
