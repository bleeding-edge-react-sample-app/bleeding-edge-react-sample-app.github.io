
import Reflux from 'reflux-core';
import {Users} from '../utils/actions';

const UserCommentsStore = Reflux.createStore({
  init(){
    this.listenTo(Users.getComments.completed, 'onGetComments');
    this.state = {
      user: null,
      comments: [],
    };
  },

  getState(){
    return this.state;
  },

  onGetComments({comments, user}){
    this.state = {
      user, comments,
    };
    this.trigger(this.getState());
  }
});

export default UserCommentsStore;
