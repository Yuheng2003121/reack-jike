//和用户相关的状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken} from "@/utils";

const userStore = createSlice({
  name: 'user-slice',
  //数据状态
  initialState:{
    // token: localStorage.getItem('token-key') || '' 
    token: getToken() || '' ,
    userInfo: {}
  },

  //同步方法
  reducers:{
    setToken(state, action){
      state.token = action.payload

      //在localstoreage完成token持久化
      // localStorage.setItem('token-key', action.payload)
      _setToken(action.payload)
    },

    setUserInfo(state, action){
      state.userInfo = action.payload
    }
  }
})

//结构同步方法
const { setToken, setUserInfo } =userStore.actions

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request({
      method:'post',
      url:'/authorizations',
      data: loginForm
    })
    dispatch(setToken(res.data.data.token))

  }
}

//异步方法 获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user/profile'
    })
    dispatch(setUserInfo(res.data.data))
  }
}



export { setToken, fetchLogin, fetchUserInfo }
export default userStore