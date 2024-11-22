//组合redux子模块 + 导出实例

import { configureStore } from "@reduxjs/toolkit";
import userStore from "./modules/user";

export default configureStore({
  reducer:{
    user: userStore.reducer
  }
})

