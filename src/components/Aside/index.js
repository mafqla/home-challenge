import React, {useEffect, useState} from 'react'
import {Menu} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom'
import {UserOutlined, DatabaseOutlined} from '@ant-design/icons';

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')

    // 一般加个空数组就是为了模仿componentDidMounted
    useEffect(() => {
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    }, [location.pathname])

    const handleClick = e => {
        navigate('/' + e.key)
        setDefaultKey(e.key)
    };
    return (
        <Menu
            onClick={handleClick}
            style={{width: 180}}
            selectedKeys={[defaultKey]}
            mode="inline"
            className='aside'
            theme="light"
        >
            <Menu.Item key="user-manage"><UserOutlined/> 用户管理</Menu.Item>
            <Menu.Item key="means"><DatabaseOutlined/> 修改资料</Menu.Item>
        </Menu>
    )
}