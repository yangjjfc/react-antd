import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'; // 路由设置
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routers';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

const history = createHistory();
export const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>{Routes}</div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
