import {Form, Input, Button, Card, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import './index.scss'
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {login} from "@/request/api";

const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const {username, password} = values
        login({username, password}).then(res => {
            if (res.status === 0) {
                message.success(res.message);
                // 存储数据
                localStorage.setItem('nickname', res.nickname)
                localStorage.setItem('token', res['token'])
                localStorage.setItem('username', res.username)
                // 跳到首页
                setTimeout(() => {
                    navigate('/')
                },1500)
            } else {
                message.error(res.message);
            }
        })
    };
    return (<div className="login">
            <Card className="login-container">
                <h1>登录</h1>
                <Form validateTrigger={['onBlur', 'onChange']}
                      initialValues={{remember: true}}
                      onFinish={onFinish}
                >
                    <Form.Item name="username"
                               rules={[{required: true, message: 'Please input your Username!'}]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            min: 6, message: '密码不能少于6个字符', validateTrigger: 'onBlur'
                        }, {
                            max: 11, message: '密码不能大于11个字符', validateTrigger: 'onBlur'
                        }, {required: true, message: 'Please input your Password!'}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                            maxLength={11}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">还没注册?现在注册</Link>
                        <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>)
}

export default Login