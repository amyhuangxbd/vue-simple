import { apiClient } from './client'
import install from './install'
import WrapperInterceptor from './interceptors/WrapperInterceptor'
import ErrorInterceptor from './interceptors/ErrorInterceptor'

import {room} from '@/actions'

export default class Services {
  constructor () {
    this.ErrorInterceptor = new ErrorInterceptor()
    apiClient.interceptors.response.use(this.ErrorInterceptor.onResponseSuccess, this.ErrorInterceptor.onResponseFail)

    this.wrapperInterceptor = new WrapperInterceptor()
    apiClient.interceptors.response.use(this.wrapperInterceptor.onResponseSuccess)

    this.Room = room
  }
}

Services.install = install
