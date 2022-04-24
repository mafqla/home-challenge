// 导入路由
import React from 'react'
import {Outlet} from 'react-router-dom'
import {Layout} from 'antd';
import Bread from "@/components/Bread";
import Aside from "@/components/Aside";
import Header from "@/components/Header";


// 配置路由规则
export default function App() {
    return (
        <Layout id='app'>
            <Header />
            <div className='container'>
                <Aside />
                <div className='container_box'>
                    <Bread />
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 Author 符前霖</footer>
        </Layout>
    )
}