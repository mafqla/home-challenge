import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from "@/pages/Login";
import App from "@/App";
import Home from "@/pages/Home";
import Register from "@/pages/Register";

/**
 * History模式 -- BrowserRouter
 *  Hash模式 -- HasRouter
 */

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/home' element={<Home/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </Router>
)

export default BaseRouter
