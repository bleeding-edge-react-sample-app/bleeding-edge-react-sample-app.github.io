import React, {PropTypes} from 'react';
import {Feeds, State} from '../utils/actions';
import providesStore from '../utils/decorators/providesStore';
import HotThreadsStore from '../stores/HotThreadsStore';
import ThreadList from '../molecules/ThreadList';

export default
@providesStore(HotThreadsStore)
class HotThreadsWrapper extends React.Component {
  static propTypes = {
    store: providesStore.getPropType(HotThreadsStore),
    boardId: PropTypes.string.isRequired,
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.boardId !== this.props.boardId) {
      this.needsUpdate = true;
    }
  }

  componentDidMount(){
    this.doUpdate(this.props.boardId);
    // State.setEditing({
    //   type: 'comment',
    // });
  }

  componentDidUpdate(){
    if (this.needsUpdate) {
      this.needsUpdate = false;
      this.doUpdate(this.props.boardId);
    }
  }

  doUpdate(boardId){
    if (this.props.store.board !== boardId) {
      Feeds.get({type: 'hot', board: this.props.boardId});
    }
  }

  render(){
    var {board, threads, loading} = this.props.store;
    if (loading || board !== this.props.boardId) {
      return null;
    }

    return (
      <ThreadList threads={threads} />
    );
  }
}
