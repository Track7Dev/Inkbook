import { SHOW_USERS, ADD_USER, REMOVE_USER, LOGIN, LOGOUT } from '../actions';
import { combineReducers } from 'redux';

const usersReducer =  (users =[], action) => {
  switch (action.type) {
      case SHOW_USERS:
      const arr = action.payload.data;
      if (arr === undefined) return users.concat();
      return arr;

      case ADD_USER:
      if (action.payload.data === undefined){ alert('Username already exists'); console.log("User Not Added"); return users; }
      let updatedUser = users.concat();
      updatedUser.push(action.payload.data);
      console.log('Added User');
      return [];

      case REMOVE_USER:
      const userCount = users.length;
      const removedUser = users.filter((user) => {
        return user.username !== action.payload;
      });
      if (removedUser.length === userCount) { console.error('User Not Found'); return users; }
      console.log(`Removed ${action.payload}`);
      return removedUser;

      case LOGIN:
      console.log(action.payload);
      if(action.payload.data.success === 'true'){
        console.log(`Logged in User: ${action.payload.data.username}`);
        localStorage.setItem('username', action.payload.data.username);
        localStorage.setItem('password', action.payload.data.password);
        localStorage.setItem('admin', action.payload.data.admin);;
      } else if(action.payload.data.success === 'false') {
        console.error('User Does Not Exist')
      }
      return users.concat();
      case LOGOUT:
      return [];


    default:
    return users;
  }
};

const rootReducer = combineReducers({
  usersR: usersReducer
});
export default rootReducer;