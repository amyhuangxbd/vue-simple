export default class WrapperInterceptor {
  constructor (headers) {
    this.headers = headers
    this.onResponseSuccess = (response) => {
      if (response.data) {
        return response
      } else if (response.data.data) {
        response.data = response.data.data
      }
    }
  }
}
