import { AxiosResponse, InternalAxiosRequestConfig } from './types'
import { ElMessage } from 'element-plus'
import qs from 'qs'
import { TRANSFORM_REQUEST_DATA } from '@/constants'
import { useUserStoreWithOut } from '@/store/modules/user'
import { objToFormData } from '@/utils'

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === 'post' &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  } else if (
    TRANSFORM_REQUEST_DATA &&
    config.method === 'post' &&
    config.headers['Content-Type'] === 'multipart/form-data'
  ) {
    config.data = objToFormData(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

const defaultResponseInterceptors = (response: AxiosResponse) => {
  if (response?.config?.responseType === 'blob') {
    // If the response is a file stream, return the response directly.
    return response
  }
  // Check the HTTP status code directly
  if (response.status === 200) {
    // If the HTTP status code is 200, assume success and return the response data.
    return response.data
  } else {
    // If the status code is not 200, show an error message.
    ElMessage.error(response?.statusText)
    if (response.status === 401) {
      // Handle logout for 401 Unauthorized.
      const userStore = useUserStoreWithOut()
      userStore.logout()
    }
    // For other errors, reject the promise with the status text or a default error message.
    return Promise.reject(response?.statusText || 'An error occurred')
  }
}

export { defaultResponseInterceptors, defaultRequestInterceptors }
