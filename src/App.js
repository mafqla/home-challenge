// 导入路由
import React from 'react'
import {Outlet} from 'react-router-dom'

// 配置路由规则
function App() {
    return (
        <div className="App">
            {{/*子路由的占位符*/}}
            <Outlet/>
        </div>
    )
}

export default App