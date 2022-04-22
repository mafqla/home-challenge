import {Form, Input, Button, Card} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './index.scss'

const Login = () => {
    // 点击登录按钮时触发 参数values即是表单输入数据
    const onFinish = values => {
        console.log(values)
    }
    return (
        <div className="login">
            <Card className="login-container">
                <h1>登录</h1>
                <Form validateTrigger={['onBlur', 'onChange']}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}>
                    <Form.Item name="username"
                               rules={[{required: true, message: 'Please input your Username!'}]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                min:6,
                                message: '密码不能少于6个字符',validateTrigger: 'onBlur'
                            }, {
                                max:11,
                                message: '密码不能大于11个字符',validateTrigger: 'onBlur'
                            },
                            {required: true, message: 'Please input your Password!'}
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                            maxLength={11}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
                            登录
                        </Button>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        Or <a href="#">现在注册!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login