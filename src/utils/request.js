/* 基于axios封装的请求模块 */
import axios from 'axios'

/* 创建了一个axios实例 */

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/' //请求的基础路径

})


/* 到处请求方法 */
export default request

// 谁要使用谁就加载request模块