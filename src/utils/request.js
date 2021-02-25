/* 基于axios封装的请求模块 */
import axios from 'axios'

/* 创建了一个axios实例 */


/* 引入json-bigint处理大数字问题 */
import JSONbig from 'json-bigint'



// axios.defaults.transformResponse = [function(data) {
//     // console.log(data) //这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好

//     try {
//         //作用1：把json字符串转为js对象
//         //作用2：把里面的大数字做安全处理
//         return JSONbig.parse(data)
//     } catch (err) {
//         return data;
//     }
//     //return data;
// }]
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/', //请求的基础路径
    // baseURL: 'http://ttapi.research.itcast.cn/'


})

/* 创建一个拦截器 */

request.interceptors.request.use(

    config => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            config.headers.Authorization = 'Bearer ' + user.token
        }
        return config
    }
)


/* 到处请求方法 */
export default request

// 谁要使用谁就加载request模块