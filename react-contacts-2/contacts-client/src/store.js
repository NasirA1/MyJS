import { createStore, applyMiddleware, compose } from 'redux';
import { saveStore, persistStore } from 'simple-redux-persist';
import rootReducer from './reducers';

  
function configureStore(initialState = {}) {
 const enhancers = [applyMiddleware(saveStore)];
 const store = { ...createStore(rootReducer, initialState, compose(...enhancers)) };
 return store;
}

export default () => persistStore(configureStore());