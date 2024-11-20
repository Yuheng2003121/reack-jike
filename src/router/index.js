import {createBrowserRouter} from 'react-router-dom'
import Layout from '@/pages/layout'
import Login from '@/pages/login'


const router = createBrowserRouter([
  {
    //首页
    path: '/',
    element: <Layout></Layout>,
    //配置二级路由

  },

  //404路由
  // {
  //   path: '*',
  //   element: <NotFound></NotFound>
  // },

  {
    path: '/login',
    element: <Login></Login>
  },



])

export default router