//和用户相关的状态管理
import { removeToken, request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken} from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user";

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
    },

    clearAll(state, action){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }

  }
})

//结构同步方法
const { setToken, setUserInfo, clearAll } =userStore.actions

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // const res = await request({
    //   method:'post',
    //   url:'/authorizations',
    //   data: loginForm
    // })
    
    const res = await loginAPI(loginForm)
    console.log(res);
    
    dispatch(setToken(res.data.token))

  }
}

//异步方法 获取个人信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const res = await request({
    //   method: 'get',
    //   url: '/user/profile'
    // })
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}



export { setToken, fetchLogin, fetchUserInfo, clearAll }
export default userStore