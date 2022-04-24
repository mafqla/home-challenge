import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css'
import './index.scss';
import './assets/base.scss'
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>,
    </React.StrictMode>
);


