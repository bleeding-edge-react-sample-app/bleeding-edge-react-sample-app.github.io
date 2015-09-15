import Reflux from 'reflux-core';
import {Users} from '../utils/actions';

const UserStore = Reflux.createStore({
  init(){
    this.listenTo(Users.get.completed, 'onUserGet');
    this.users = {};
  },

  getState(){
    return this.users;
  },

  onUserGet(user){
    this.users[user.name] = user;
    this.trigger(this.getState());
  }
});

export default UserStore;
