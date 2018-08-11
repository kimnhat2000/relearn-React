import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './mainAppComponents/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from  './playground/cardComponent/redux/store/store';

const store = configureStore();

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

let render = () => {
    ReactDOM.render(app, document.getElementById('root'))
}

if (module.hot) {
    module.hot.accept('./mainAppComponents/App', () => {
        setTimeout(render)
    })
}

render();

registerServiceWorker();
