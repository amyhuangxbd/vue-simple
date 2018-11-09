import axios from 'axios'
import axiosRetry from 'axios-retry'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default function (options) {
  const client = axios.create(options)
  axiosRetry(client, {
    retryCondition (error) {
      return error.code === 'ECONNABORTED' // Retry timed out requests
    }
  })
  return client
}
