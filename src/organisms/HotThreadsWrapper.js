import React, {PropTypes} from 'react';
import {Feeds} from '../utils/actions';
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
    this.doUpdate(nextProps.boardId);
  }

  componentDidMount(){
    this.doUpdate(this.props.boardId);
  }

  doUpdate(boardId){
    if (!this.props.store.loading && this.props.store.board !== boardId) {
      Feeds.get({type: 'hot', board: this.props.boardId});
    }
  }

  render(){
    var {threads, loading} = this.props.store;
    if (loading) {
      return null;
    }

    return (
      <ThreadList threads={threads} />
    );
  }
}
