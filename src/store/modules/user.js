//和用户相关的状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: 'user-slice',
  //数据状态
  initialState:{
    token: localStorage.getItem('token-key') || '' 
  },

  //同步方法
  reducers:{
    setToken(state, action){
      state.token = action.payload

      //在localstoreage完成token持久化
      localStorage.setItem('token-key', action.payload)
    }
  }
})

//结构同步方法
const {setToken} =userStore.actions

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

export { setToken, fetchLogin }
export default userStore