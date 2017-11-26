import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import Store from './store';


const store = Store();

const render = () => ReactDOM.render(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();

render();