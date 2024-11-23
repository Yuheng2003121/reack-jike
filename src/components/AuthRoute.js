//封装高阶组件

const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

//核心逻辑: 有token -> 正常跳转   无token->去登录组件
export function AuthRoute({children}){
  const token = getToken()
  if(token){
    return <>{children}</>
  }else{
    return <Navigate to={'/login'} replace></Navigate>
  }
}
