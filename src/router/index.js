import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from "@/pages/Login";
import App from "@/App";
import Register from "@/pages/Register";
import Error from "@/pages/Error";
import UserManage from "@/pages/UserManage";
import Means from "@/pages/Means";

/**
 * History模式 -- BrowserRouter
 *  Hash模式 -- HasRouter
 */

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/user-manage' element={<UserManage/>}/>
                <Route path='/means' element={<Means/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
    </Router>
)

export default BaseRouter
