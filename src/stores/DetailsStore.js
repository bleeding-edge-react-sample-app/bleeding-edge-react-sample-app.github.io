import Reflux from 'reflux-core';
import {State, Details} from '../utils/actions';

const getInitialState = () => ({
  id: null,
  comments: [],
  loading: false,
});

const HotThreadsStore = Reflux.createStore({
  init(){
    this.listenTo(Details.get.completed, 'onGetDetails');
    this.listenTo(Details.get, 'startedGet');
    this.state = getInitialState();
  },

  startedGet({id}){
    this.state = getInitialState();
    this.state.loading = true;
    this.state.id = id;
    this.trigger(this.getState());
  },

  getState(){
    return this.state;
  },

  onGetDetails(comments){
    console.log('onget', arguments[0])
    this.state = {
      loading: false,
      comments: comments,
      id: this.getState().id,
    };
    this.trigger(this.getState());
  }
});

export default HotThreadsStore;
