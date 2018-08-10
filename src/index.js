import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './mainAppComponents/App';
import registerServiceWorker from './registerServiceWorker';


let render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

if (module.hot) {
    module.hot.accept('./mainAppComponents/App', () => {
        setTimeout(render)
    })
}

render();

registerServiceWorker();
