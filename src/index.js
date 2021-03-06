// import 'fontsource-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
