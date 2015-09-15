import Reflux from 'reflux-core';
import {State} from '../utils/actions';

const CurrentBoardStore = Reflux.createStore({
  init(){
    this.listenTo(State.changeBoard, 'onChangeBoard');
    this.board = null;
  },

  getState(){
    return this.board;
  },

  onChangeBoard(board){
    if (board !== this.board) {
      this.board = board;
      this.trigger(this.getState());
    }
  }
});

export default CurrentBoardStore;
