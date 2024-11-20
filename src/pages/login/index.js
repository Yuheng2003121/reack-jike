import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import styles from './login.module.css';  // 使用 CSS 模块
const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
