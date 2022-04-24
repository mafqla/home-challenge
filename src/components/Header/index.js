import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import defaultAvatar from '@/assets/defaultAvatar.jpg'

function Header(props) {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("游客")

    /**
     * 模拟componentDidMount
     * React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。
     */
    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if (username1) {
            setUsername(username1)
        }
        if (avatar1) {
            setAvatar( avatar1)
        }
    }, [props.mykey])

    // 退出登录
    const logout = () => {
        message.success('退出成功，即将返回登录页')
        localStorage.clear();   // 清除localStorage中的数据
        setTimeout(() => navigate('/login'), 1000)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header>
            <h3>title</h3>
            <div className="right">
                <Dropdown overlay={menu}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img src={avatar} className="avatar" alt="" />
                        <span>{username}</span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        mykey: state.mykey
    }
}

export default connect(mapStateToProps)(Header)