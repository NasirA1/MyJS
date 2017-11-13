const DEFAULT_USER ={
  firstName: '',
  token: '',
  isLoggedIn: false
};

export default ( state = {user: DEFAULT_USER}, action ) => {
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
      return state
  }
}
