//用户相关的所有请求

const { request } = require("@/utils");

//1.登录请求:
export function loginAPI(loginForm){
  return request({
    method: 'post',
    url: '/authorizations',
    data: loginForm
  })
}


//2.获取用户信息
export function getProfileAPI() {
  return request({
    method: 'get',
    url: '/user/profile'
  })
}