import type { UseFetchOptions } from 'nuxt/app'

import type { FetchResponse } from 'ofetch'
import type { ResComm } from '~/types/common';

/**
 * 封装的useFetch函数，增加了统一的错误处理和基础配置
 */
export function useKksFetch<T>(
  url: string, 
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig()

  
  // 默认配置
  const defaults = {

    // 使用 runtimeConfig 中的 API 基础 URL
    baseURL: config.public.kksBaseUrl,
   
    // 其他配置保持不变
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },

    onResponse({ response }:{ response: FetchResponse<ResComm<T>> }) {
      const res = response._data as ResComm<T>
      
      // 检查响应状态码
      if (res.code !== 200) {
        // 处理错误情况 - 可以使用 nuxt/ui 的 toast 或其他方式
        const errorMsg = res.msg || '请求失败'
        // 这里可以添加通知提示
        // useToast().add({ title: errorMsg, color: 'red' })
        console.error(errorMsg)
        
        // 可以选择抛出错误
        // throw new Error(errorMsg)
      }
      
      // 修改响应数据，只返回 data 部分
      response._data = res.data as any
    },
    
    
    // 全局错误处理
    onResponseError(context: any) {
      const { response } = context
      const statusCode = response?.status || 500
      
      if (statusCode === 401) {
        // 处理未授权错误
        // 例如：navigateTo('/login')
      } else if (statusCode >= 500) {
        // 处理服务器错误
        console.error('服务器错误:', response?.statusText)
      }
      
      // 可以使用useToast或其他通知组件显示错误
      // const toast = useToast()
      // toast.error(`请求失败: ${response?.statusText || '未知错误'}`)
    },
    
    // 请求超时设置
    retry: 0, // 不重试
    timeout: 10000, // 10秒超时
    
    // 合并其他选项
    ...options
  }


  
  return useFetch(url, defaults as UseFetchOptions<T>)
}