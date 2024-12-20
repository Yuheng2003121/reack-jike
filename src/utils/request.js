//axios封装处理
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";



//1.根域名配置
//2.超时时间
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

//3.请求拦截器 / 相应拦截器
// 添加请求拦截器: 在请求发送之前, 添加一些自定义的设置[参数的处理]
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么: 注入token
  //1.获取token  
  const token = getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  //2.注入token, 按照后端的格式要求做token拼接
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器: 在相应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  //监控401 token失效 -> 清除本地token 跳转登录
  if(error.response.status === 401){
    removeToken()
    router.navigate('/login').then(() => { window.location.reload() })
   
  }
  return Promise.reject(error);
});


export {request}