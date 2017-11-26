import { combineReducers } from 'redux';

const DEFAULT_USER ={
  firstName: '',
  token: '',
  isLoggedIn: false
};


const userReducer = ( state = {user: DEFAULT_USER}, action ) => {
  switch (action.type) {
    case 'USER_LOGIN':
      Object.assign(state, {
        user: {
          firstName: action.firstName,
          token: action.token,
          isLoggedIn: true
        }
      });
      return state;
    case 'USER_LOGOUT':
      Object.assign( state, { user: DEFAULT_USER } );
      return state;
    default:
      return state;
  }
}


const appReducer = combineReducers({
  userReducer
});
 
const rootReducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'RETRIEVE_STATE': {
      newState = { ...action.payload }
      break
    }
    default: {
      newState = state
      break
    }
  }
  return appReducer(newState, action)
}
 

export default rootReducer;
