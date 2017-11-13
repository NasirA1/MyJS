import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import reducers from './reducers';
import { createStore } from 'redux';

const store = createStore(reducers);


const render = () => ReactDOM.render( 
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();

render();
store.subscribe(render);
