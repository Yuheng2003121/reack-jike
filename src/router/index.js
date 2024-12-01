import {createBrowserRouter} from 'react-router-dom'
import AppLayout from '@/pages/layout'
import Login from '@/pages/login'
import { AuthRoute } from '@/components/AuthRoute'
import Home from '@/pages/home'
import Article from '@/pages/article'
import Publish from '@/pages/publish'

const router = createBrowserRouter([
  {
    //首页layout
    path: '/',
    element: <AuthRoute><AppLayout></AppLayout></AuthRoute>,
    //配置二级路由
    children: [
      {
        // path: 'home',
        index: true,
        element: <Home></Home>
      },
      {
        path: 'article',
        element: <Article></Article>
      },
      {
        path: 'publish',
        element: <Publish></Publish>
      },
    ]
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