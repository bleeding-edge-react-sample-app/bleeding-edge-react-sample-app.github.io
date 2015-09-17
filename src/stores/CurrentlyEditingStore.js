import Reflux from 'reflux-core';
import {State} from '../utils/actions';

const CurrentlyEditingStore = Reflux.createStore({
  init(){
    this.listenTo(State.setEditing, 'onSetEditing');
    this.listenTo(State.clearEditing, 'onClearEditing');
    this.state = null;
  },

  getState(){
    return this.state;
  },

  onSetEditing({text, id, type}){
    this.state = {
      text: text || '',
      id: id || Date.now(),
      type: type,
    };
    this.trigger(this.getState());
  },

  onClearEditing(){
    this.state = null
    this.trigger(this.getState());
  },
});

export default CurrentlyEditingStore;
