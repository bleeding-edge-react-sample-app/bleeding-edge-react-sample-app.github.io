import Reflux from 'reflux-core';
import {Feeds} from '../utils/actions';

const getInitialState = () => ({
  board: null,
  type: 'hot',
  threads: [],
  loading: false,
});

const HotThreadsStore = Reflux.createStore({
  init(){
    this.listenTo(Feeds.get.completed, 'onGetFeed');
    this.listenTo(Feeds.get, 'startedGet');
    this.state = getInitialState();
  },

  startedGet({board, type}){
    console.log({board, type})
    if (type !== 'hot') return;

    this.state = getInitialState();
    this.state.loading = true;
    this.state.board = board;
    this.trigger(this.getState());
  },

  getState(){
    return this.state;
  },

  onGetFeed({type, results, board}){
    if (type === 'hot') {
      this.state = {
        board, type, threads: results, loading: false,
      };
      this.trigger(this.getState());
    }
  }
});

export default HotThreadsStore;
