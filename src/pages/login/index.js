import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import styles from './login.module.css';  // 使用 CSS 模块
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    //触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    //1.跳转到首页
    navigate('/')
    //2.提示用户登陆成功
    message.success('登陆成功')
  };
  return (
    <div className={styles['login-container']}>
      <Form 
        validateTrigger="onChange"
        className={styles['ant-form']}
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: 'please enter correct phone number'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="phone" />
        </Form.Item>

        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input your code!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="code" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
    </div>
    
  );
};
export default Login;
