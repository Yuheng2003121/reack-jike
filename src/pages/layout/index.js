import React, { useEffect, useState } from 'react';
import {  Layout, Menu, theme, Popconfirm } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '@/store/modules/user';
const { Header, Content, Sider } = Layout;


const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  //触发个人信息异步渲染
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(()=>{
    dispatch(fetchUserInfo())
  }, [dispatch])


  //点击左侧选项跳转到二级路由
  const navigate = useNavigate()
  function onMenueClick(item){
    const path = item.key
    navigate(path)
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{user.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']} //默认高亮,根据item的key匹配
            items={items}
            onClick={onMenueClick}
            style={{ height: '100%', borderRight: 0 }}>
          </Menu>
        </Sider>
        <Content className='layout-content' style={{ padding: 20 }}>
          {/* 渲染二级路由 */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;

