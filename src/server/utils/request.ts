import axios from 'axios'
import { url, host } from './config'
axios.defaults.baseURL = url
/**
 * 检查响应状态
 * @param response 
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    throw error
}
/**
 * 请求方法
 * @param reqUrl 请求链接
 * @param options 请求配置
 */
export async function request(reqUrl: string, options: object = { method: 'GET' }) {
    const response = await axios(reqUrl, options).then(checkStatus)
    return response
}
